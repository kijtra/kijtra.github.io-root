---
title: "WikipediaのURLがツイートしにくい"
slug: "wikipedia-url-convert"
date: "2014-01-04T00:00:00+09:00"
description: "WikipediaのURLに日本語が含まれているとTwitterなんかでURL化してくれないのでツールつくった。"
tag: ["Others"]
---

WikipediaのURLに日本語が含まれているとTwitterなんかでURL化してくれないのでツールつくった。

<!--more-->

### 2015/10/02 追記

ほったらかしにしていたら停止してたので、改めて [Google App Engine](https://cloud.google.com/appengine/?hl=ja) で書きなおした。  

> **Short Wikipedia URL**  
> http://wk-url.appspot.com/  

Bookmarkletを使う方式を追加。  
手法としては前回と同じで、[MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page/ja)を使って、WikipediaのURLを単語ベースでなくページIDベースで取得するというもの。  

関係ないけど、作ってる時に[なが～い英単語](http://en.wikipedia.org/?curid=43019166)を見つけておもしろかった。

-----

あけましておめでとうございます。
正月に時間があったので、<a href="http://koding.com/" target="_blank" rel="nofollow">Koding</a>の使用感を掴むついでに作ってみました。

~~**WikipediaのURLを短く変換**~~ __（停止しました）__  
~~http://wi.kijtra.kd.io/~~

単機能なので特に説明は要らないと思います。
今年もよろしくお願いします。
