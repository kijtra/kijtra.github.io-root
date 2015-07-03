---
title: "「Redactor」用フォントサイズプラグイン"
slug: "redactor-font-size-plugin"
date: "2012-11-10T00:00:00+09:00"
description: "WYSIWYGエディタの「Redactor」専用「フォントサイズ」プラグイン。公式にはないので。"
tag: ["JavaScript"]
---

WYSIWYGエディタの「Redactor」専用「フォントサイズ」プラグイン。公式にはないので。

<!--more-->

jQueryのプラグインとして動くWYSIWYGエディタの「<a href="http://imperavi.com/redactor/" target="_blank">Redactor</a>」、個人的には最も使いやすいWYSIWYGエディタなんだけど、フォントサイズのボタンがないのが難だった。
Redactorの配布元であるimperaviの<a href="https://twitter.com/imperavi/statuses/225033339063635969" target="_blank">公式Twitterで、フォントサイズは「<strong>bad way</strong>」ということで付けてない（付ける予定もない）</a>らしい・・・。

それじゃ作るしかないということで、バージョン8.1.0からプラグイン機能が実装されたので作った。

```js
if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.fontsize = {
	init: function(){
		var doc = document;
		if ( !doc.getElementById( 'redactor-fontsize-style' ) ) {
			var head = doc.getElementsByTagName( 'head' )[0];
			var imgsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAASCAMAAACZ8IWSAAAAA3NCSVQICAjb4U/gAAAAgVBMVEX///////9VVVX///96enpVVVVVVVVVVVX///9VVVX////Hx8erq6tVVVXo6OhVVVVVVVX////e3t5aWlpVVVX////e3t5VVVX////U1NRVVVV6enpaWlpVVVWrq6uVlZVubm5aWlpVVVVycnJubm5mZmZaWlpVVVWrq6tmZmZVVVU4bmHEAAAAK3RSTlMAEREiIiIzRFVVZmZmZnd3iJmZmZmqqqq7u7vMzMzd3d3d3e7u7u7u////6dkbcAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACGSURBVBiVrc7JFoIwDAXQIA5YpyKiQalgHSjv/z+QwrKpx41vkUVuk5ToD0Gsac0oLGEFnDFGyOmDe8JgFlP2hlcW27bWlV9HJOWyVQ80ibw/69raoFdSdgXnR6CSct345zWaNISlyf0JjX4fwKHDc0HaAu95QBmzH1Ilcxn53s84577SVAdK6gqHkfp1SQAAAABJRU5ErkJggg==';
			var style = doc.createElement( 'style' );
			style.type = 'text/css';
			style.id = 'redactor-fontsize-style';
			style.innerHTML = '.redactor_btn_fontsize{background-image:url(' + imgsrc + ') !important;}';
			head.appendChild( style );
		}
		var dropdown = {
			nofontsize: {
				title: '指定なし',
				callback: this.fontSize
			},
			fontsize1: {
				title: '<font size="1">1 (8pt)</font>',
				callback: this.fontSize
			},
			fontsize2: {
				title: '<font size="2">2 (10pt)</font>',
				callback: this.fontSize
			},
			fontsize3: {
				title: '<font size="3">3 (12pt)</font>',
				callback: this.fontSize
			},
			fontsize4: {
				title: '<font size="4">4 (14pt)</font>',
				callback: this.fontSize
			},
			fontsize5: {
				title: '<font size="5">5 (18pt)</font>',
				callback: this.fontSize
			},
			fontsize6: {
				title: '<font size="6">6 (24pt)</font>',
				callback: this.fontSize
			},
			fontsize7: {
				title: '<font size="7">7 (36pt)</font>',
				callback: this.fontSize
			}
		};
		this.addBtnAfter('backcolor','fontsize','文字サイズ',function(){},dropdown);
	},
	fontSize: function( obj, event, key ) {
		if ( key.match( /^fontsize(\d+)$/ ) ) {
			obj.execCommand( 'fontSize', RegExp.$1 );
		} else if ( key == 'nofontsize' ) {
			obj.execCommand( 'removeFormat', key );
		}
	}
}
```
<a href="https://gist.github.com/4070324" target="_blank">一応Gistにも置いてある</a>。
ちなみに<a href="http://imperavi.com/redactor/" target="_blank">Redactor</a>はいつのまにか有料化されてて辛い・・・。
個人としてはフリーだった時のやつを使ってるけど、プラグイン機能とか諸々がない。
