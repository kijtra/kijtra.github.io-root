---
date: "2016-02-12T12:15:29+09:00"
slug: "support-https"
tag: ["SEO"]
title: "ブログを常時SSL(https)化した"
description: "CloudFlareでブログを常時SSL化したので経過を見るためにもメモ"
---

いまさら感があるけどブログを常時SSL化してみた。  
SEO的な影響などを調べるためにメモ。

<!--more-->

これまでも常時SSLできる環境は整ってたけど忘れてた・・・。  

2016/02/12時点、このブログの環境は以下のようになっている。  

- ドメイン（年1,180円）・・・[スタードメイン](http://www.star-domain.jp/)  
  [ネットオウル](http://www.netowl.jp/)という会社のドメインサービス。  
  安いのはもちろん、ICANN認定レジストラであるというのと、PHPが動く小さな無料サーバーもついてくるのでここでドメイン取得した。
- DNS（無料）・・・[CloudFlare](https://www.cloudflare.com/)  
  上記スタードメインからネームサーバーをこのCloudFlareに向けて管理してる。  
  SSLも無料で使え、キャッシュによるページ高速化もでき、さらにHTTP/2にも無料で対応。至れり尽くせり。
- サーバー（無料）・・・[Github Pages](https://pages.github.com/)  
  GitHubの静的ページホスティングサービス。ブログ用途ならこれで十分。
- 構築（無料）・・・[Atom](https://atom.io/) ＋ [hugo](https://gohugo.io/)  
  AtomでMarkdown書いてhugoで自動生成し、GitHub Pagesにプッシュして公開してる。

ようするに、ドメイン代金以外はすべて無料でやってる。  
また、ところどころに貼ってあるAdSenseで、ドメイン代金の年1,180円（月にすると100円以下）は賄えてるので出費のようなものは特にない。  

うちの場合、常時SSL化の理由はSEOのみ。  
Google Analytics と Google Search Console でドメインをhttpsにしたので、その経過をみていこうと思う。  

ちなみに Search Console の方は、非httpsドメインは消さず、しばらくはhttpsドメインと両方をウォッチする。  
CloudFlareで「httpでのアクセスは全てhttpsへリダイレクト」の設定にしているので、非httpsの方はアクセスが減少し、httpsドメインのアクセスに移っていくようになると思う。  
設定後にサイトマップ更新を忘れないようにした。

Analyticsは「プロパティの設定」で「http」を「https」にした。  
また、Search Consoleとの連携もhttpsの方に変更。  
加えてレポートの「メモ」機能で2016/02/12の部分に常時SSL化の旨をメモした。  

本来、サイトを常時SSL化する場合は一部のページから少しずつやるべきだけど、hugoでそういうのは難しいので全ページを一度にSSL化。  
HTMLヘッダでのcanonical属性もセットした。  
http→httpsにリダイレクトされるので必要ないかもとは思ったけど一応。  

あとは[AMP](https://support.google.com/webmasters/answer/6340290)に対応してみて、さらに経過を眺めてみようと思う。
