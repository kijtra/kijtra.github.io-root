---
title: "電子書籍の横断検索"
slug: "ebook-search"
date: "2013-02-14T00:00:00+09:00"
description: "電子書籍サイトを横断検索できるやつをGoogleのカスタム検索エンジンを使って作ってみた。"
tag: ["Google"]
---

Googleのカスタム検索エンジンの試しで、電子書籍サイトを横断検索できるやつを作ってみた。

<!--more-->

<script>
  (function() {
    var cx = '005022487374147002888:jpardwcfjya';
    var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
  })();
</script><gcse:search></gcse:search>

テキトウに検索してみてください。
作ったのはいいんだけど、やっぱアフィリエイトはできないよねこれw

知らなかったけど、カスタム検索に「プロモーション」ってのがあって、検索結果で自由にリンクを表示する機能がある。
上の検索で試しに「<strong>池上</strong>」と検索すると、グレー背景の広告っぽいリンクが出る(Kindle Fireのページへのリンクを設定した)。

プロモーションを表示する条件として、検索キーワードを正規表現で指定する。
「いつでも表示」はできなくて、あるキーワードに対して表示する形。
あとスマホでも見れないことはない模様。

ほかにアイデア練ってみよう。
