---
title: "IEほかフォームの「placeholder」属性をクロスブラウザで使えるようにする(jQuery不要版)"
slug: "cross-browser-placeholder-without-jquer"
date: "2013-04-08T00:00:00+09:00"
description: "HTML5の「placeholder」属性をJavaScriptでクロスブラウザに対応するってやつです。jQuery不要で単体で使えます。"
tag: ["JavaScript", "Snippet"]
---

HTML5の「placeholder」属性をJavaScriptでクロスブラウザに対応するってやつです。jQuery不要で単体で使えます。

<!--more-->

placeholder属性は便利なので、サポート外のブラウザでも使いたい！
これサポートしていないブラウザが「IE9以下」と、けっこうなサポート外ぶりなのでJavaScriptで。

前にjQueryでやるやつは書いた( <a href="http://kijtra.com/article/cross-browser-placeholder">フォームの「placeholder」属性をIEでも使えるようにするスニペット(要jQuery)</a> )んだけど、jQueryなしの需要がありそうだったので作ってみた。

<script src="https://gist.github.com/kijtra/5334086.js"></script>

<a href="https://gist.github.com/kijtra/5334086" class="btn" target="_blank"><i class="icon-github">&nbsp;</i>Gistにも掲載中</a>
使い方としては、上記のコードをコピーして.jsファイルにペーストして、HTMLのどこでもいいので読み込むだけ。
勝手にwindowのonload後に実行されます。

placaholderの数だけformのonSubmitを登録してるのとかどうだろ…w
役に立ちそうならご自由にお使いください。
