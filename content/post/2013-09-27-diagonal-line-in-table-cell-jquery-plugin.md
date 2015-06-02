---
title: "テーブルのセルに斜めの線を引くjQueryプラグイン"
slug: "diagonal-line-in-table-cell-jquery-plugin"
date: "2013-09-27T00:00:00+09:00"
description: "テーブルのセルに斜めの線（分割線？打ち消し線？）をつけるやつをjQueryプラグインとして作ってみた。"
tag: ["JavaScript", "Snippet"]
---


テーブルのセルに斜めの線（分割線？打ち消し線？）をつけるやつをjQueryプラグインとして作ってみた。

<!--more-->

テーブルのセルに斜めの線を引いたりしたいことないですかね。
必要に迫られてググりまくった情報をもとにjQueryプラグインとして作ってみました。

言葉では難しいんだけど、要するにこういうことでして。
<a href="http://kijtra.com/wp/wp-content/uploads/2013/09/2013-09-27_142602.png"><img src="http://kijtra.com/wp/wp-content/uploads/2013/09/2013-09-27_142602.png" alt="テーブルの斜めの線" width="276" height="164" class="aligncenter"></a>

コードは以下だけど、<a href="https://gist.github.com/kijtra/6723306" class="btn" target="_blank"><span class="icon-github-alt"></span> Gistにあり〼</a>

<script src="https://gist.github.com/kijtra/6723306.js"></script>

ウインドウサイズによって幅が変わるようなテーブルには対応していなくて、しかもセルのCSSスタイルによっては表示が微妙になる時がある・・・。

はじめはCSS3の背景グラデーションでやろうかと思ったけどセルのサイズを固定しないとできなかったので、jQueryでセルの縦横を取得して、それに合わせてボーダーのある要素を傾けるものになってる。
というかこれHTML5の標準機能とかでできたらなあw
