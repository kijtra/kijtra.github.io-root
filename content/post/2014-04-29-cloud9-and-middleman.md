---
title: "ブログ移行。WordPressからCloud9＋Middlemanへ。"
slug: "cloud9-and-middleman"
date: "2014-04-29T23:21:00+09:00"
description: "以前から静的ブログにしたかったのもあり、やっと2014/04/29に移行したので経緯の日記。"
tag: ["Middleman"]
---

以前から静的ブログにしたかったのもあり、やっと2014/04/29に移行したので経緯の日記。

<!--more-->

移行前の状況としては、[Netowl](http://www.netowl.jp/)の運営する[スタードメイン](http://www.star-domain.jp/)というところでドメインを取得した時についてくる無料サーバーでWordPressを使ってた。  
でも、個人ブログとしてのWordPressはオーバースペック（自由にできすぎる）な気がしてたのと、最近少しMarkdownに慣れてきたのもあり、思い切って静的サイトにすることにした。

それと、レンタルサーバーとかっていろいろと変えたくなることがあるので、サーバーに縛られない状況にしたいと思った。  
条件として、わりと厳しめなのを想定した。

- テンプレートが自由にいじれる
- AdSenseが貼れる
- Google Analyticsが使える
- メモ帳的に書ける（つまりMarkdown）
- サーバーを管理しなくていい
- サーバーが落ちにくい＆高速
- 以前のURL（特に記事URL）を引き継げる
- すべて無料である

普通にブログプラットフォームを使おうかとも思って以下のようなものを検討した。

1. [Postach.io](http://postach.io/)  
   Evernoteのノートをそのままブログにできる。
2. [Scriptogr.am](http://scriptogr.am/)  
   Dropbox内のMarkdownファイルをブログにできる。
3. [Calepin](http://calepin.co/)  
   これもDropboxのMarkdownをブログに。
4. [Medium](https://medium.com/)  
   見た目がクール。流行り。だけど自由度激低。
6. [Tumblr](http://tumblr.com/)  
   テキストブログとしては扱いにくい。
5. [Blogger](https://www.blogger.com)  
   言わずと知れた。でもMarkdown不可。

どれも条件にはピッタリいかなかった。  
けどPostach.ioだけはかなり良く、画像なんかもEvernoteに貼るだけだしテンプレもいじれて広告貼れるし。  
2点だけ、そもそもEvernoteではシンタックスハイライトがやりにくいのと、ノートのタイトルがそのまま（中国語翻訳のローマ字で）URLになるという痛い仕様だった。  
これじゃタイトルちょっと直しただけで記事URLが変わってしまいSEOに良くない。  
でもバージョンアップ次第では今後の移行も検討。

で、巷では静的ブログというのが一部で盛り上がってる（？）ようで、特に[Jekyll](http://jekyllrb.com/)というやつが[GitHub Pages](https://pages.github.com/)と相性が良いということでユーザーが多いようだった。  
たしかにブログなんて静的なもので十分だと感じてたので静的にしようと決意。

個人的に、普段[Cloud9](https://c9.io/)というサービス(PaaS？SaaS？なんだろ)をちょこちょこ使っていて、早速試してみると、全くRuby慣れしてない自分でもなんとなくいけそうだった。  
で、そのJekyllをブログっぽくしてくれる[Octopress](http://octopress.org/)というプラグインがあって、これも試したんだけど、なんか縛りが増えた感じで受け付けなかったのでボツとした。

Octopressを入れていろいろやってこんがらがったので、新たにCloud9のワークスペースを作って、今度はJekyllと似た感じの[Middleman](http://middlemanapp.com/jp/)というものを使ってみることにした。  
こちらはマニュアルが日本語化されてて、Jekyllを経たこともあり、すんなり受け入れられた。

このMiddlemanもGitHub Pagesに簡単にデプロイできるってんでこれに決めた。

というわけで、Cloud9にMiddlemanを入れ、そのままCloud9上でテンプレ編集して記事を書き、GitHub Pagesへデプロイして公開する、という流れで移行の条件を全て満たすことができた。

実際にどういう手順でやったかはヒマがある時にまた書こうと思う。  
（ブログで↑こういう終わり方って個人的には嫌いだけどw）
