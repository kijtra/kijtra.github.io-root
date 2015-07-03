---
title: "Google Apps ScriptでOAuthConfigのサポートが終了してTwitter botが危険そうだったので変更"
slug: "twitter-api-for-google-apps-script-without-oauthconfig"
date: "2015-04-16T16:06:00+09:00"
description: "Google Apps Script でこれまでTwitterのボットを作ってたんだけど、OAuthConfig のサポートが2015年4月20日に終了するってのを見つけて焦って変更したメモ。"
tag: ["Google Apps Script", "Twitter"]
---

Google Apps Script でこれまでTwitterのボットを作ってたんだけど、OAuthConfig のサポートが2015年4月20日に終了するってのを見つけて焦って変更したメモ。

<!--more-->

これまでGoogle Apps ScriptでTwitter APIを利用する場合、OAuth認証に「**[OAuthConfig](https://developers.google.com/apps-script/reference/url-fetch/o-auth-config)**」というクラスを使うのが一般的だった。  
でも先日見てみると以下の一文が。

> **Warning**: Google's OAuth 1.0 support was deprecated in 2012 and is scheduled to be shut down on April 20, 2015. Scripts using OAuthConfig to connect to a Google API should instead use the [OAuth2 for Apps Script](https://github.com/googlesamples/apps-script-oauth2) library.

英語はあまり得意でないのでGoogleで翻訳すると、

> 警告：GoogleのOAuthの1.0のサポートは2012年に廃止されましたし、OAuthConfigを使用して2015年のスクリプトではなくAppsスクリプトライブラリのOAuth2を使用する必要があり、GoogleのAPIに接続するために、4月20日にシャットダウンされる予定です。

とのこと。  
確かに OAuthConfig を使用したプログラムを動かすと警告が出てる。  
まずいなー自作せんといかんかなーと思っていろいろと調べてみたところ、**[Googleが用意したOAuth1用ライブラリ(GitHub)](https://github.com/googlesamples/apps-script-oauth1)**を使うのが良さそうな感じだったので、手順をまとめておく。


## Step1. プロジェクトの作成

プロジェクトといっても単にGoogleドライブにファイルを作るだけ。  
スプレッドシートを新規作成して上部メニュー「ツール」→「スクリプトエディタ」にいくか、またはスクリプトファイル自体を新規作成してもOK。  
ログの記録とかにスプレッドシートが使えるので、できれば前者がいいと思う。


## Step2. OAuthライブラリの取得

スクリプトエディタを開き、上部メニュー「リソース」→「ライブラリ...」をクリック。  
開いたダイアログにある「ライブラリを検索」の入力欄に以下の文字を入力して検索（「選択」ボタン）する。
`Mb2Vpd5nfD3Pz-_a-39Q4VfxhMjh3Sh48`  
そうすると、以下の図のようにOAuth1用ライブラリが出るので、最新バージョンを選択して「保存」する。（Google製のライブラリなのでご安心を）  

<a href="https://lh5.googleusercontent.com/-Y0JexgZ4FLY/VS9jkx9CPdI/AAAAAAAADfo/qjpCGInBkwQ/w694-h417-no/2015-04-16_120428.png" target="_blank"><img class="aligncenter" alt="ライブラリ読み込みダイアログ" src="https://lh5.googleusercontent.com/-Y0JexgZ4FLY/VS9jkx9CPdI/AAAAAAAADfo/qjpCGInBkwQ/w694-h417-no/2015-04-16_120428.png" /></a>  

これでとりあえずはOAuth1ライブラリが使えるようになった。  
ちなみにこれらの手順は [公式GitHubのREADME](https://github.com/googlesamples/apps-script-oauth1/blob/master/README.md) に書いてある。  


## Step3. Twitter API用スクリプトの作成

[公式GitHubのREADME](https://github.com/googlesamples/apps-script-oauth1/blob/master/README.md) の通りに進めて問題ないけど、ここらへんは以下のスクリプトを自作した。  
[<i class="fa fa-github"></i> Gistにあり〼。](https://gist.github.com/kijtra/f4cdd8775277372d42f7)  
これを「twitter.gs」等のファイル名でプロジェクトエディタに新規作成＆コピペする。  

<script src="https://gist.github.com/kijtra/f4cdd8775277372d42f7.js"></script>


## Step4. Twitterアプリ側の設定

OAuth後のコールバック先URLをこれまでと変更する必要がある。  
[Twitterアプリの管理ページ](https://apps.twitter.com/)で、**Callback URL**に以下のようなURLを設定する。  
`https://script.google.com/macros/d/[プロジェクト キー]/usercallback`  

<a href="https://lh6.googleusercontent.com/-mEGyfYGF2Ng/VS9jmDNTSoI/AAAAAAAADfo/LddrM3jl43w/w1056-h259-no/2015-04-16_162213.png" target="_blank"><img class="aligncenter" alt="コールバックURLの入力欄" src="https://lh6.googleusercontent.com/-mEGyfYGF2Ng/VS9jmDNTSoI/AAAAAAAADfo/LddrM3jl43w/w1056-h259-no/2015-04-16_162213.png" /></a>

「**プロジェクト キー**」というのは、Google Apps Scriptのプロジェクトに付いているキー。  
スクリプトエディタの上部メニュー「ファイル」→「プロジェクトのプロパティ」をクリックすると確認できる。  
このキーは前述の自作スクリプト内でも使うので、ついでにコピペしておく。  

<a href="https://lh4.googleusercontent.com/-ma8FgouRKmI/VS9jlBunX3I/AAAAAAAADfo/aCYvvWZdlXI/w586-h427-no/2015-04-16_123848.png" target="_blank"><img class="aligncenter" alt="プロジェクト キーの確認" src="https://lh4.googleusercontent.com/-ma8FgouRKmI/VS9jlBunX3I/AAAAAAAADfo/aCYvvWZdlXI/w586-h427-no/2015-04-16_123848.png" /></a>


## Step5. OAuth認証する

自作スクリプトに、

- プロジェクト キー
- Twitterの Consumer Key
- Twitterの Consumer Secre

を記載したら、初回のOAuth認証用にいくつかの関数を用意しているので、「`twitterAuthorizeUrl`」というのを実行する。  

<a href="https://lh4.googleusercontent.com/-fLiwVXhwWyY/VS9jlgKjH7I/AAAAAAAADfo/M6o0jDoBTUQ/w399-h164-no/2015-04-16_143608.png" target="_blank"><img class="aligncenter" alt="OAuth用関数の実行" src="https://lh4.googleusercontent.com/-fLiwVXhwWyY/VS9jlgKjH7I/AAAAAAAADfo/M6o0jDoBTUQ/w399-h164-no/2015-04-16_143608.png" /></a>  

画面には何も出ないけど、上部メニュー「表示」→「ログ」を開くと承認用のURLが出力されている。
これをコピーしてブラウザでアクセスすると、Twitterのアプリ承認画面に行くので承認する。

<a href="https://lh4.googleusercontent.com/-dDk3p-mvLBY/VS9jlrsIrSI/AAAAAAAADfo/MPlKB5rDy9A/w684-h442-no/2015-04-16_143941.png" target="_blank"><img class="aligncenter" alt="OAuth認証用URLをコピーする" src="https://lh4.googleusercontent.com/-dDk3p-mvLBY/VS9jlrsIrSI/AAAAAAAADfo/MPlKB5rDy9A/w684-h442-no/2015-04-16_143941.png" /></a>  

ここまでの手順が正しく設定されていれば、承認後は画面が切り替わって「認証に成功しました」という文字が出る（ハズ）。


## Step6. テストする

これでOAuth認証が通ったと思うのでボットが作成できる。  
ツイッターのAPI自体は[公式 REST API ドキュメント](https://dev.twitter.com/rest/public)を参照のこと。
簡単に自作スクリプトの説明をしておくと、こんな感じ。  

```js
///// 基本的な使用方法 /////

// 以下は api.twitter.com/1.1/statuses/update.json を実行する例

var data = {
    "status": "ツイート文"
};

var res = Twitter.api("statuses/update", data);

/*
第一引数：APIのパス（api.twitter.com/1.1/～.jsonの間のパス）
第二引数：パラメータ（JSON形式）
*/
```

上記の他にいくつか簡易化した関数を用意した。  

```js
// ツイートを検索
var res = Twitter.search("検索文字");

// 自分のタイムラインを取得
var res = Twitter.tl();

// 特定ユーザーのタイムラインを取得
var res = Twitter.usertl("スクリーンネーム");

// ツイートする
var res = Twitter.tweet("ツイート文");

// トレンドの取得（デフォルトは日本全国対象。引数にWOEID指定でその地域のトレンド）
var res = Twitter.trends();

// トレンドのワードのみ取得（引数は上と同じ）
var res = Twitter.trendWords();
```

- - - - -

OAuthConfigの廃止はけっこう前から警告が出てたみたいだけど、対策しているような情報はググってもほとんど見当たらなかったので、Google Apps Scriptでボット作ってる人はほとんどいない模様w  
以前 [Twitterの自分の過去ツイートをGoogleドライブに自動バックアップ（＆公開）する方法](/article/twitter-backup-to-google-drive/) という投稿を書いたけど、こちらもOAuthを使っていて不安。  
提供元には特に何か対策してるっぽいことは書いてなさそう・・・動いてるからまあいいけど。  

ついでに [OAuth2でのTwitter API（Application-only authentication）](https://dev.twitter.com/oauth/application-only) も少し見てみたんだけど、わりと簡単なプログラムでデータを取得できるみたい。  
接続が簡単なかわりに更新系のAPIが利用できなかったりするけど、API使用階数の制限が少し緩和されるっぽい・・・？
