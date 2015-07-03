---
title: "Twitter Cardsに対応！"
slug: "twitter-cards"
date: "2013-03-30T00:00:00+09:00"
description: "やっとウチのブログもTwitter Cards表示に対応してもらえたので、Twitter Cardsの申し込み方法、審査など。"
tag: ["Twitter"]
---

やっとウチのブログもTwitter Cards表示に対応してもらえたので、Twitter Cardsの申し込み方法、審査など。

<!--more-->

あれから約2ヶ月半。
やっとウチのブログが <strong>Twitter Cards</strong> の審査に通った！
申し込んでたのすら忘れてたよ・・・

- - -

*[追記] 現在は審査などしなくても、単にmetaタグを入れるだけで表示されるようになりました*

- - -

「<a href="https://dev.twitter.com/docs/cards" target="_blank">Twitter Cards</a>」というのは、特サイトのリンクをツイートすると、そのリンク先ページがTwitter内でインライン表示される、というもの。
Amazonなんかもそうだね。

実際の表示はこんな感じ。
<a href="http://lh5.ggpht.com/-grDBH_XSG08/UVYaEd3Fk7I/AAAAAAAADPo/jHKludUmc7s/s566/2013-03-30_074734.png" target="_blank"><img src="http://lh5.ggpht.com/-grDBH_XSG08/UVYaEd3Fk7I/AAAAAAAADPo/jHKludUmc7s/s566/2013-03-30_074734.png" alt="Twitter Cards表示例 デスクトップ版" class="aligncenter"></a>

iPhone版も。
<a href="http://lh6.ggpht.com/-HxMHTp6wrno/UVYZlyIczWI/AAAAAAAADPg/KEk7lpHM_nw/s640/20130330-073720.jpg" target="_blank"><img src="http://lh6.ggpht.com/-HxMHTp6wrno/UVYZlyIczWI/AAAAAAAADPg/KEk7lpHM_nw/s450/20130330-073720.jpg" alt="Twitter Cards表示例 iPhone版" class="aligncenter"></a>

Twitterでは短縮URLが日常的に使われるから、たまに悪意のあるリンクも出まわってしまう。
こうやってリンクをクリックする前にリンク先の概要が表示されれば、少し信頼性が増すと思う。
Tweitter Cardsは、最初はTwitter側が勝手にやってるものだと思ってたんだけど、実際には申し込みが必要。

まずはHTMLの<head>～</head>内に専用のメタタグを追加する。
普通の<a href="http://ogp.me/" target="_blank">OGP</a>が記述されていればそれを読み込んでくれるような感じだけど、以下の4つのプロパティは最低限あったほうがいい。

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="http://kijtra.com/">
<meta name="twitter:title" content="きじとらの記事">
<meta name="twitter:description" content="きじとらの記事の概要文ですよ。">
```

加えて、サムネイル画像もあったほうがクリックされやすくなると思う。

```html
<meta name="twitter:image" content="http://kijtra.com/gazou/no/path.jpg">
```

次に<a href="https://dev.twitter.com/docs/cards/preview" target="_blank">Twitter Cardsの表示テストページ</a>(要ログイン)で希望のURLを入れてみて、どのように表示されるか確認する。

問題なければ、<a href="https://dev.twitter.com/form/participate-twitter-cards" target="_blank">Twitter Cards申請ページ(英語)</a>で必要項目を入力して送信する。
そんなに重い入力項目じゃないから気軽に申請していいと思う。
申請後は確認メールとか特に来なかった。
申し込みページには「数週間で結果メールを送ります」とあるけど、ウチの場合は約2ヶ月半かかった。
個人サイトじゃ審査通らないだろうなと思って、ダメもとでやったからちょっと嬉しかったw
