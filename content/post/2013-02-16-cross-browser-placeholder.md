---
title: "フォームの「placeholder」属性をIEでも使えるようにするスニペット(要jQuery)"
slug: "cross-browser-placeholder"
date: "2013-02-16T00:00:00+09:00"
description: "HTML5の「placeholder」属性をJavaScriptでクロスブラウザに対応するスニペット。jQueryが必要版。"
tag: ["JavaScript", "Snippet", "HTML5", "Form"]
---

HTML5の「placeholder」属性をJavaScriptでクロスブラウザに対応するスニペット。jQueryが必要版。

<!--more-->

placeholder属性は便利ですよね。さらにユーザーにもわかりやすい。
でもIE9以下は対応してないのが痛い・・・
なのでJavaScriptで代替してクロスブラウザにしてしまいましょう。（要jQuery）

# 追記 2013-04-08

<a href="http://kijtra.com/article/cross-browser-placeholder-without-jquer">jQueryなし版もつくってみた</a>

<script src="https://gist.github.com/kijtra/4964976.js"></script>

<a href="https://gist.github.com/kijtra/4964976" class="btn" target="_blank"><i class="icon-github">&nbsp;</i>Gistにも掲載中</a>
実行時にplaceholder属性が使えるかどうかチェックしてるので、使えるブラウザでは無駄な動きはしない。
いまのところjQueryがないと動かないけど、jQueryなしにする予定。
