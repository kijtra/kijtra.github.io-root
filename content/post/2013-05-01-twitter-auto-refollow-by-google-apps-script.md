---
title: "Twitterのフォロー返し（リフォロー）をGoogle Apps Scriptで自動化する"
slug: "twitter-auto-refollow-by-google-apps-script"
date: "2013-05-01T00:00:00+09:00"
description: "Twitterのフォロー返し（リフォロー）を、Goolge Apps Scriptを使って自動化する方法。"
tag: ["Google", "Google Apps Script"]
---

TwitterでBot等を運用していると、「フォローを返す」というのはわりと重要。
相互フォローならDMもやりとりできるし、「フォローしてくれるならフォローする」という人もいるのでフォロワーが増える可能性がある。
ということでフォロー返し（リフォロー）を自動化するやつを作ってみた。

<!--more-->

大まかな流れとしては、

1. <strong>Twitterの自分用アプリを作成（なければ）</strong>
2. <strong>Twitterの設定で新しいフォロワーが増えたらメール通知するようにする</strong>
3. <strong>Google Apps Scriptで、そのメールをチェック</strong>
4. <strong>TwitterのAPIでフォローを返す</strong>
5. <strong>メールを既読にする</strong>

という感じ。


## Step0. Twitterのアプリを作成（なければ）

TwitterのAPIを使うので、Twitterアプリが必要になる。
※画像は<a href="http://kijtra.com/article/twitter-backup-to-google-drive" target="_blank">以前の記事</a>の使い回しなので、アプリ名の意味とかは無視してください

<a href="https://dev.twitter.com/" target="_blank">https://dev.twitter.com/</a>にアクセスし、自分のTwitterアカウントでサインイン。
<a href="http://lh3.ggpht.com/-DE5XEV3mxIw/UUptPGEY8FI/AAAAAAAADNE/1W3kVOWbgS0/s990/2013-03-21_111512.png" target="_blank"><img class="aligncenter" alt="自分のTwitterアカウントでサインイン" src="http://lh3.ggpht.com/-DE5XEV3mxIw/UUptPGEY8FI/AAAAAAAADNE/1W3kVOWbgS0/s640/2013-03-21_111512.png" /></a>

<a href="https://dev.twitter.com/apps">My applications</a>へ移動。
<a href="https://lh6.googleusercontent.com/-6UBBXs45SuE/UUptxsV89MI/AAAAAAAADNM/dQ_Q7_zdAYQ/s399/2013-03-21_111738.png" target="_blank"><img class="aligncenter" alt="My applicationsへ移動" src="https://lh6.googleusercontent.com/-6UBBXs45SuE/UUptxsV89MI/AAAAAAAADNM/dQ_Q7_zdAYQ/s399/2013-03-21_111738.png" /></a>

右上の「Create a new application」をクリックし、必要な情報を入力。
<a href="https://lh6.googleusercontent.com/-KzxSH2l1I_k/UUp9kc8JhtI/AAAAAAAADOs/F2tRhJ_kTeE/s981/2013-03-21_122459.png" target="_blank"><img class="aligncenter" alt="「Create a new application」をクリック" src="https://lh6.googleusercontent.com/-KzxSH2l1I_k/UUp9kc8JhtI/AAAAAAAADOs/F2tRhJ_kTeE/s640/2013-03-21_122459.png" /></a>

「Name」はなんでもいいけど、誰かが同じ名前のアプリを作ってるとエラーになる。
「Description」も適当に。文字数が少ないとエラー。
「Website」もなんでもOK。とりあえずGoogleドライブのURLにした。
<span style="color:#B94A48">「Callback URL」は必ず「<strong style="color:#B94A48">https://spreadsheets.google.com/macros</strong>」にする</span>必要がある。

入力したら「Developer Rules Of The Road」の同意にチェックし、CAPTCHAに表示された文字を入力して「Create your Twitter application」ボタンをクリック。
アプリケーションが作成された。

必要になるのは「<strong>Consumer key</strong>」と「<strong>Consumer secret</strong>」のランダムな文字。
これをメモしておく。
<a href="http://lh3.ggpht.com/-lw5V0oW5g5o/UUpw1xqJHFI/AAAAAAAADNc/HhbCYz-OGyw/s986/2013-03-21_112853.png" target="_blank"><img class="aligncenter" alt="アプリケーションが作成された" src="http://lh3.ggpht.com/-lw5V0oW5g5o/UUpw1xqJHFI/AAAAAAAADNc/HhbCYz-OGyw/s640/2013-03-21_112853.png" /></a>


## Step1. Twitterのメール通知設定

フォロワーが増えた時にメールが来るようにする。
ちなみにGoogle Apps Scriptを使って作るので、<strong>Gmail宛てに受け取るようになってないといけない</strong>。
<a href="http://lh6.ggpht.com/-4rBz8t_vOyQ/UYB6mo1XqmI/AAAAAAAADSU/31rk0DiZPY0/s854/2013-05-01_111358.png" target="_blank"><img src="http://lh6.ggpht.com/-4rBz8t_vOyQ/UYB6mo1XqmI/AAAAAAAADSU/31rk0DiZPY0/s640/2013-05-01_111358.png" alt="Twitterでメール通知設定" class="aligncenter"></a>


## Step2. スクリプトを新規作成

<a href="https://drive.google.com/" target="_blank">Googleドライブ</a>で「<strong>スクリプト</strong>」を新規作成する。
<a href="http://lh5.ggpht.com/-sQ60u60UQrQ/UYB6l4XhJ2I/AAAAAAAADSI/Q1Wnn-Ig--s/s423/2013-05-01_110827.png" target="_blank"><img src="http://lh5.ggpht.com/-sQ60u60UQrQ/UYB6l4XhJ2I/AAAAAAAADSI/Q1Wnn-Ig--s/s423/2013-05-01_110827.png" alt="Google Apps Scriptで新規作成" class="aligncenter"></a>


## Step3. Twitterアプリの情報を設定

「ファイル」メニューの「<strong>プロジェクトのプロパティ</strong>」を開く。
<a href="http://lh5.ggpht.com/-acQyAI-SK2c/UYB6l33pjmI/AAAAAAAADSQ/GsJyVcDlAIo/s404/2013-05-01_110933.png" target="_blank"><img src="http://lh5.ggpht.com/-acQyAI-SK2c/UYB6l33pjmI/AAAAAAAADSQ/GsJyVcDlAIo/s404/2013-05-01_110933.png" alt="「プロジェクトのプロパティ」を開く" class="aligncenter"></a>

「プロジェクトのプロパティ」タブに移り、
「<strong>twitterConsumerKey</strong>」＝ <strong>Step0で取得した「Consumer key」</strong>
「<strong>twitterConsumerSecret</strong>」＝ <strong>Step0で取得した「Consumer secret」</strong>
を設定する。
（プロパティ名は上記のまま記入してください）
<a href="http://lh5.ggpht.com/-MJcdqJpboPo/UYB6l-OB7II/AAAAAAAADSM/bkb5ODFF-lY/s584/2013-05-01_111054.png" target="_blank"><img src="http://lh5.ggpht.com/-MJcdqJpboPo/UYB6l-OB7II/AAAAAAAADSM/bkb5ODFF-lY/s584/2013-05-01_111054.png" alt="プロパティ設定" class="aligncenter"></a>


## Step4. Google Apps Scriptの記述
以下のコードをペーストして保存。

```js
function twitterReFollow(){
  // Twitter用OAuthコンフィグ
  var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
  oAuthConfig.setAccessTokenUrl("http://api.twitter.com/oauth/access_token");
  oAuthConfig.setRequestTokenUrl("http://api.twitter.com/oauth/request_token");
  oAuthConfig.setAuthorizationUrl("http://api.twitter.com/oauth/authorize");
  oAuthConfig.setConsumerKey(ScriptProperties.getProperty("twitterConsumerKey"));
  oAuthConfig.setConsumerSecret(ScriptProperties.getProperty("twitterConsumerSecret"));
  try {
    // 自分のTwitter情報を取得
    var url = "https://api.twitter.com/1.1/account/verify_credentials.json";
    var me = UrlFetchApp.fetch(url,{method:"get",oAuthServiceName:"twitter",oAuthUseToken:"always"});
    me = Utilities.jsonParse(me.getContentText());
    // 情報が取れなければ終了
    if(!me.screen_name) {
      return false;
    }
    me = me.screen_name;
    // Gmailからフォローされたメールを取得
    var threads = GmailApp.search('is:unread from:(twitter.com) subject:(フォローされ)',0,50);
    var reg = new RegExp("\@([a-zA-Z0-9_]*(?!"+me+"))","i");
    var followers = new Array();
    for(var i = threads.length; i--;) {
      var message = threads[i].getMessages()[0];
      var body = message.getBody();
      // メール本文からスクリーンネームを抜き出す
      if(body.indexOf(me)>=0 && body.match(reg)) {
        var screen = RegExp.$1;
        if(screen && screen != me){
          followers.push({id:message.getId(), screen:screen});
        }
      }
    }
    // データがなければ終了
    if(!followers.length) {
      return false;
    }
    // 全員をフォローする
    var options = {
      "method":"POST",
      "oAuthServiceName":"twitter",
      "oAuthUseToken":"always"
    };
    for(var i = followers.length; i--;) {
      var follower = followers[i];
      var url = "https://api.twitter.com/1.1/friendships/create.json?follow=true&screen_name=" + follower.screen;
      var result = UrlFetchApp.fetch(url, options);
      if(200 === result.getResponseCode()){
        result = Utilities.jsonParse(result.getContentText());
        // フォローに成功したらメールを既読にする
        if(result.following) {
          GmailApp.markThreadRead(GmailApp.getThreadById(follower.id));
        }
      }
    }
  } catch (e) {
    Logger.log(e.toString());
  }
}
```


## Step5. Google Apps Scriptの実行テスト

上部メニューの「実行」から「twitterReFollow」をクリック。
<a href="http://lh5.ggpht.com/-8Rd33lyeQQI/UYCDEy8pvcI/AAAAAAAADSw/yjgS_raL9Fc/s406/2013-05-01_115052.png" target="_blank"><img src="http://lh5.ggpht.com/-8Rd33lyeQQI/UYCDEy8pvcI/AAAAAAAADSw/yjgS_raL9Fc/s406/2013-05-01_115052.png" alt="関数を実行" class="aligncenter"></a>

Twitterの承認とかGmailの承認とかが出てくるので、すべて「OK」か「承認」をクリックする。
警告などが出なくなるまで何度か実行した方が良いかも。


## Step6. 自動実行を設定
上部の時計っぽいアイコンをクリックすると自動実行の設定が開くので、「今すぐ追加するにはここをクリックしてください。」のリンクをクリックする。
<a href="http://lh5.ggpht.com/-j1wo8dMEUe0/UYCEVI9IcSI/AAAAAAAADS8/tE6aZYJcsPI/s922/2013-05-01_115607.png" target="_blank"><img src="http://lh5.ggpht.com/-j1wo8dMEUe0/UYCEVI9IcSI/AAAAAAAADS8/tE6aZYJcsPI/s640/2013-05-01_115607.png" alt="自動実行の設定" class="aligncenter"></a>
時間割は好きなタイミングにするといいと思う。


以上、あとは放っておけば自動フォロー返しが動くと思う。
ちなみにフォロー返しが実行されるとメールは既読になるので、その点はご注意を。
