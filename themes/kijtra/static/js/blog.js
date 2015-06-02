(function() {
    $('a[href^=http]').not('[href*="'+location.hostname+'"]').attr("target","_blank");
})();

(function($, w, d){
	var b = document.body,
	target,
	url = (function(){
		var i, l, attr, tags = d.getElementsByTagName("link");
		for (i = 0, l = tags.length; i < l; i ++) {
			attr = tags[i].getAttribute("rel");
			if (attr && "canonical" === attr.toLowerCase()) {
				return tags[i].getAttribute("href");
				break;
			}
		}
		return location.href.replace(/^(.*?)(\#.*)?$/, '$1');
	})(),
	title = (function(){
		var i, l, attr, prop, tags = d.getElementsByTagName("meta");
		for (i = 0, l = tags.length; i < l; i ++) {
			attr = tags[i].getAttribute("property");
			if (attr && attr.toLowerCase().indexOf(':title') != -1) {
				return tags[i].getAttribute("content");
				break;
			}
		}
		return d.title;
	})(),
	eurl = encodeURIComponent(url),
	callback = '__socialcounts_'+(new Date()).getTime(),
	shortNum = function(number){
		var number = Number(number),
		rounded = 0,
		abbr = '';
		if (number >= 1e12) {
			rounded = number / 1e12;
			abbr = 'T';
		} else if(number >= 1e9) {
			rounded = number / 1e9;
			abbr = 'B';
		} else if(number >= 1e6) {
			rounded = number / 1e6;
			abbr = 'M';
		} else if(number >= 1e3) {
			rounded = number / 1e3;
			abbr = 'K';
		} else {
			rounded = number;
		}
		return rounded.toFixed(1).replace(/\.0$/,'') + (abbr ? '<small>'+abbr+'</small>' : '');
	},
	datas = {
		"twitter": {
			"title": "Twitter",
			"url": "https://cdn.api.twitter.com/1/urls/count.json?url="+eurl,
			"link": "https://twitter.com/intent/tweet?original_referer="+encodeURIComponent(location.href)+"&text={{title}}&url={{url}}",
			"width": 550,
			"height": 450
		},
		"facebook": {
			"title": "Facebook",
			"url": "http://graph.facebook.com/?id="+url,
			"link": "https://www.facebook.com/dialog/share?app_id=458844870836571&display=popup&href={{url}}&redirect_uri="+encodeURIComponent(location.href),
			"width": 520,
			"height": 570
		},
		"googleplus": {
			"title": "Google+",
			"url": "https://query.yahooapis.com/v1/public/yql?q=SELECT%20content%20FROM%20data.headers%20WHERE%20url%3D'https%3A%2F%2Fplusone.google.com%2F_%2F%2B1%2Ffastbutton%3Fannotation%3Dinline%26url%3D"+eurl+"'&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env",
			"link": "https://plus.google.com/share?url={{url}}&referer="+encodeURIComponent(location.href),
			"width": 500,
			"height": 440
		},
		"hatena": {
			"title": "はてブ",
			"url": "http://api.b.st-hatena.com/entry.count?url="+url,
			"link": "http://b.hatena.ne.jp/add?mode=confirm&url={{url}}&title={{title}}",
			"width": 505,
			"height": 500
		},
		"pocket": {
			"title": "Pocket",
			"url": "https://query.yahooapis.com/v1/public/yql?q=SELECT%20content%20FROM%20data.headers%20WHERE%20url%3D'https%3A%2F%2Fwidgets.getpocket.com%2Fv1%2Fbutton%3Fcount%3Dvertical%26v%3D1%26url%3D"+eurl+"'&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env",
			"link": "https://getpocket.com/save?url={{url}}&title={{title}}",
			"width": 576,
			"height": 340
		},
		"buffer": {
			"title": "Buffer",
			"url": "https://api.bufferapp.com/1/links/shares.json?url="+url,
			"link": "",
			"width": 626,
			"height": 436
		}
	},
	timer = null,
	total = 0,
	added = 0,
	countDatas = {},
	addData = function(key, count){
		added++;
		if (!timer) {
			timer = setTimeout(function(){
				for(var key in datas){
					if (countDatas[key]) {
						target.append(countDatas[key]);
					}
				}
			},4000);
		}
		if (target && target.length) {
			var link = datas[key].link,
			title = datas[key].title,
			short = shortNum(count);
			countDatas[key] = $('<a href="#'+key+'" class="-'+key+'" title="'+title+'" target="_blank"><i class="icon-'+key+'"></i><b>'+short+'</b></a>')
				.on('click', function(e){
					e.preventDefault();
					openLink($(this).attr('href').replace('#', ''));
					return false;
				});
		}

		b.removeChild(d.getElementById('socialcounts-'+key));
		if (added == total) {
			delete w[callback];
			if (timer) {
				clearTimeout(timer);
			}

			for(var key in datas){
				if (countDatas[key]) {
					target.append(countDatas[key]);
				}
			}
		}
	},
	openLink = function(key){
		if (datas && datas[key]) {
			var d = datas[key],
			link = d.link.replace(/\{\{title\}\}/g, encodeURIComponent(title)).replace(/\{\{url\}\}/g, eurl);
			console.log(link);
			w.open(link, d.title, 'width='+d.width+',height='+d.height);
		}
	};

	w[callback] = {
		"twitter": function(res){
			if ('number' === typeof res.count) {
				addData('twitter', res.count);
			} else {
				addData('twitter', 0);
			}
		},
		"facebook": function(res){
			if ('number' === typeof res.shares) {
				addData('facebook', res.shares);
			} else {
				addData('facebook', 0);
			}
		},
		"googleplus": function(res){
			if (res && res.query && res.query.results) {
				var m;
				if (m = res.query.results.resources.content.match(/<span class="A8 RZa">\+(\d+)/)) {
					addData('googleplus', Number(m[1]));
					return;
				}
			}
			addData('googleplus', 0);
		},
		"hatena": function(res){
			if ('number' === typeof res) {
				addData('hatena', res);
			} else {
				addData('hatena', 0);
			}
		},
		"pocket": function(res){
			if (res && res.query && res.query.results) {
				var m;
				if (m = res.query.results.resources.content.match(/<em id="cnt">(\d+)<\/em>/)) {
					addData('pocket', Number(m[1]));
					return;
				}
			}
			addData('pocket', 0);
		},
		"buffer": function(res){
			if ('number' === typeof res.shares) {
				addData('buffer', res.shares);
			} else {
				addData('buffer', 0);
			}
		}
	},
	init = false;

	$.fn.socialCounts = function(conf){
		target = this.addClass('-socialcounts');
		if ("object" === typeof conf) {
			if (conf.url) {
				url = conf.url;
			}
			if (conf.title) {
				title = conf.title;
			}
		}
		if (!init) {
			init = (function(){
				for(var key in datas){
					var c = callback+'.'+key,
					u = datas[key].url+"&callback="+encodeURIComponent(c),
					s = d.createElement('script');
					s.src = u;
					s.async = "async";
					s.defer = "defer";
					s.id = 'socialcounts-'+key;
					b.appendChild(s);
					total++;
				}
				return true;
			})();
		}
		return this;
	};
})(jQuery, window, document);
$('.socialcounts').socialCounts();
