---
title: "PubSubHubbubにURLをプッシュするPHP関数"
slug: "push-pubsubhubbub-php"
date: "2013-12-11T00:00:00+09:00"
description: "Googleその他にURLをプッシュしてインデックスしてもらえる PubSubHubbubにガンガンにプッシュしようと思ってPHPの関数にしてみた。"
tag: ["PHP", "Google", "SEO"]
---


Googleその他にURLをプッシュしてインデックスしてもらえる PubSubHubbubにガンガンにプッシュしようと思ってPHPの関数にしてみた。

<!--more-->

**PubSubHubbub**ってご存知ですかね。
最近まで知らなかったんだけど、なんでもGoogleその他にURLをプッシュして爆速でインデックスしてもらえる可能性が高まるプロトコルそうですね。
ならばガンガンにプッシュしようぜと思ってPHPの関数にしてみた。

```php
<?php
function send_psh($url) {
	if(empty($url)){
		return false;
	}
	$hub = 'http://pubsubhubbub.appspot.com';
	//$hub='http://pubsubhubbub.superfeedr.com';
	if(is_array($url)) {
		$mh=curl_multi_init();
		$chs = array();
		foreach($url as $key => $val) {
			if (!preg_match('#^https?://#i', $val)) {
				continue;
			}
			$chs[$key] = curl_init();
			curl_setopt($chs[$key], CURLOPT_URL, $hub);
			curl_setopt($chs[$key], CURLOPT_POST, true);
			curl_setopt($chs[$key], CURLOPT_POSTFIELDS, "hub.mode=publish&hub.url=" . urlencode($val));
			curl_multi_add_handle($mh, $chs[$key]);
		}
		if(empty($chs)){
			return false;
		}
		$results = array();
		$running = NULL;
		do {
			curl_multi_exec($mh, $running);
		} while($running > 0);
		foreach($curly as $key => $ch) {
			if(empty($ch)){
				continue;
			}
			$results[$key] = (204 == curl_getinfo($ch, CURLINFO_HTTP_CODE));
			curl_multi_remove_handle($mh, $ch);
		}
		curl_multi_close($mh);
		return $results;
	} else {
		if (!preg_match('#^https?://#i', $url)) {
			return false;
		}
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $hub);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "hub.mode=publish&hub.url=" . urlencode($url));
		$res = curl_exec($ch);
		$result = (204 == curl_getinfo($ch, CURLINFO_HTTP_CODE));
		curl_close($ch);
		return $result;
	}
}
```

[Gistにあります](https://gist.github.com/kijtra/7783087)
使い方は、ひとつのURLをプッシュしたいだけなら以下のような感じ。

```php
<?php
send_psh('http://example.com/pubbb/');
?>
```

複数を一気にプッシュしたい場合は以下のように配列を渡す感じで。

```php
<?php
$urls=array(
	'http://example.com/pub/',
	'http://example.com/sub/',
	'http://example.com/hub/',
	'http://example.com/bub/',
);
send_psh($urls);
?>
```

[プッシュ先はいろいろとある](https://code.google.com/p/pubsubhubbub/wiki/Hubs)ようなんだけど、この関数ではGoogle公式のもの(pubsubhubbub.appspot.com)だけにしてます。
そもそもPubSubHubbubってなに？ってとこはあんまり深く勉強してないんだけど、以下のようなものを参考にした。


- pubsubhubbub  https://code.google.com/p/pubsubhubbub/
- Googleマット・カッツが推奨する“PubSubHubbub”でスクレイパーから身を守れ  http://www.suzukikenichi.com/blog/using-pubsubhubbub-to-protect-against-scrapers/
- pingより爆速！ブロガーはPubSubHubbubも使うと良いよ  http://shumaiblog.com/blog-pubsubhubbub-fat-ping/


あと、実験として当ブログに<a href="http://wordpress.org/plugins/pubsubhubbub/" target="_blank" rel="nofollow">PubSubHubbubのWordPressプラグイン</a>を入れて、どんだけ速くGoogleにインデックスされるのかウォッチしてみる。（上記の自作関数は使ってないw）


# 2013/12/15 追記

やっとGoogleにインデックスされた。
この記事を投稿して約4日。
これが早いのか遅いのかはわからんけども…
