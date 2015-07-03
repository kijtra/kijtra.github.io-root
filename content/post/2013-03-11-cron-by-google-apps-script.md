---
title: "無料でお手軽Cron！Google Apps Scriptを使ってみる"
slug: "cron-by-google-apps-script"
date: "2013-03-11T00:00:00+09:00"
description: "Googleが提供する「Google Apps Script」にある「UrlFetch」を使って、Cronのように時間指定で任意のURLをリクエストできちゃう、ってやつです。"
tag: ["PHP", "Cron", "Google", "Google Apps Script"]
---

Googleが提供する「Google Apps Script」にある「UrlFetch」を使って、Cronのように時間指定で任意のURLをリクエストできちゃう、ってやつです。

<!--more-->

Cron使いたいけど、レンタルサーバーにその機能がない、またはCronつきレンタルサーバー借りる余裕がない。
そんなことないですかね。ないですかそうですか。いや個人的にあったんでメモ。

「<a href="http://www.google.com/script/" target="_blank">Google Apps Script</a>」というのがあって、JavaScriptに似たコードを書けばなんかいろいろ動くみたいなんですよ。動く時間も指定できて。無料で。

「Google Apps」とついてるけど、別に企業アカウントとか独自ドメインとかが必要なわけじゃない。
必要なのはリクエスト先URLとGoogleアカウントだけ。

まずGoogleにログインして「<a href="http://www.google.com/script" target="_blank">Google Apps Script</a>」にアクセスすると、下のような画面になるので「Start Scripting」をクリック。
ここは英語だけどその先は日本語。
<a href="http://lh3.googleusercontent.com/-gK_O0yT2lpc/UT0sslDYg_I/AAAAAAAADKk/eKp_rfxG-cU/2013-03-11_095900.png" target="_blank"><img class="aligncenter" alt="「Start Scripting」をクリック" src="http://lh3.googleusercontent.com/-gK_O0yT2lpc/UT0sslDYg_I/AAAAAAAADKk/eKp_rfxG-cU/s650/2013-03-11_095900.png" /></a>

すると以下の画面に遷移するので、とりあえず「空のプロジェクト」をクリックして、プロジェクトを作成。
<a href="http://lh4.ggpht.com/-Wa_FpWI99qw/UT0uHxv3YSI/AAAAAAAADK8/L4CsTMve438/2013-03-11_100530.png" target="_blank"><img class="aligncenter" alt="「空のプロジェクト」をクリック" src="http://lh4.ggpht.com/-Wa_FpWI99qw/UT0uHxv3YSI/AAAAAAAADK8/L4CsTMve438/s640/2013-03-11_100530.png" /></a>

いきなりコードを書く画面になるので、ここに書いていく。
今回は「<strong>指定時間（または定期的）に、単にURLをリクエストするだけ</strong>」という要件のものなので、最低限の書き方でいく。
例えば「http://example.com/cron.php」というURLリクエストしたいなら、以下のように記述する。
（エラー処理とかしてない最低限のコード）

```js
function myFunction() {
UrlFetchApp.fetch("http://example.com/cron.php");
}
```

こんだけ！

Google Apps Scriptに「<strong>UrlFetch</strong>」という機能があって、指定したURLをリクエストするというもの。
必要ならリクエスト先URLの結果の文字列も取得できる。

で、重要なのは指定時間に上記のスクリプトを実行すること。
Google Apps Scriptではこれを「***トリガー***」と読んでるみたい。

コード編集画面のメニューにある時計マークをクリック。
<a href="http://lh3.ggpht.com/-SrYU2KFbKqw/UT0xMMW1KcI/AAAAAAAADLE/UygDuyf4mlg/2013-03-11_101935.png" target="_blank"><img class="aligncenter" alt="コード編集画面のメニューにある時計マークをクリック" src="http://lh3.ggpht.com/-SrYU2KFbKqw/UT0xMMW1KcI/AAAAAAAADLE/UygDuyf4mlg/s640/2013-03-11_101935.png" /></a>

プロジェクトをまだ保存してなければ、「プロジェクト名の変更」という画面が表示されるので、好きな名前をつける。（その名前でGoogleドライブに保存される）

「現在のプロジェクトのトリガー」という画面が表示されるので、「今すぐ追加するには・・・」のところをクリック。
<a href="http://lh6.ggpht.com/-2eVM3VCh9HQ/UT0yMjcmXZI/AAAAAAAADLM/C39bq-s-hT4/2013-03-11_102357.png" target="_blank"><img class="aligncenter" alt="「今すぐ追加するには・・・」のところをクリック" src="http://lh6.ggpht.com/-2eVM3VCh9HQ/UT0yMjcmXZI/AAAAAAAADLM/C39bq-s-hT4/s640/2013-03-11_102357.png" /></a>

そしたら出てきた。Cronぽいものが。

ここで自由に時間を指定する。
<a href="http://lh4.ggpht.com/-mZtVacg0s9o/UT0y4NlG8xI/AAAAAAAADLU/e8cofZNtXUc/2013-03-11_102649.png" target="_blank"><img class="aligncenter" alt="「今すぐ追加するには・・・」のところをクリック" src="http://lh4.ggpht.com/-mZtVacg0s9o/UT0y4NlG8xI/AAAAAAAADLU/e8cofZNtXUc/s640/2013-03-11_102649.png" /></a>
選択肢の右にある「通知」では、失敗時の通知をメールで受信できる。
ここはどうやらログインユーザーのメールアドレスか、Googleドライブでそのプロジェクトを共有しているメールアドレスしか選べないっぽい。
時間帯を「保存」して、プロジェクトも保存すると、すぐに動きはじめる模様。

## リクエスト結果をメールで受け取ってみる

単にURLをリクエストしただけだと、リクエスト先のプログラムの生死がわからない。
リクエスト結果をメールで受け取ってみる。

結果の文字列をメール送信するには、前述のコードを以下のように修正。

```js
function myFunction() {
    var response = UrlFetchApp.fetch("http://example.com/cron.php");
    MailApp.sendEmail(
        "google-user-name@gmail.com",// 送信先メール
        "Cronの実行結果ですよ",// メール件名
        "",
        {
            htmlBody: response.getContentText()
        }
    );
}
```

コード2行目でURLをリクエストし、その結果を「response」にセット。
<a href="https://developers.google.com/apps-script/service_mail" target="_blank">Mail機能</a>を使ってメール送信。
送信先メールアドレスは4行目、その下の5行目はメールの件名になる。

これでGoogleドライブに保存しておけば、指定時間にせっせと動いてくれる。

ちなみにGoogleドライブに保存されたプロジェクトを編集する時は、Googleドライブを「Google Apps Scriptアプリ」と「接続」する必要があるみたい。
要するにGoogleドライブ内へのアクセス許可ということかな。

***あと、注意点として、トリガー設定済みのプロジェクトを削除してもトリガーは止まらなかった。  
ゴミ箱にある状態だと動き続けるみたい。  
プロジェクトを削除する場合は、念のためトリガーを削除してからの方がよさそう。***

Google Apps Scriptをもっと知りたいなら公式リファレンスを。（まだ英語のみ）

- <a href="https://developers.google.com/apps-script/" target="_blank">Google Apps Script</a>
- <a href="https://developers.google.com/apps-script/service_urlfetch" target="_blank">UrlFetch Services</a>（URLリクエスト機能）
- <a href="https://developers.google.com/apps-script/service_mail" target="_blank">Mail Services</a>（メール機能）
- <a href="https://developers.google.com/apps-script/understanding_triggers#TimeTriggers" target="_blank">Using Time-Driven Triggers</a>（時間指定機能の使い方）

で、気になる制限系だけど、<a href="https://developers.google.com/apps-script/understanding_triggers#TimeTriggers" target="_blank">公式リファレンス</a>にはなにも書いてない・・・？
英語だし、指定時間もいくらでも設定できるようだし・・・よくわからない。
以前はGoogle App Engineでわざわざ<a href="http://ko-lab.net/twitter/google-app-enginegae%E3%81%A7cron%E5%8B%95%E3%81%8B%E3%81%99%E3%82%84%E3%82%8A%E6%96%B9%E3%82%92%E3%82%86%E3%81%A8%E3%82%8A%E5%90%91%E3%81%91%E3%81%AB%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF/" target="_blank">Pythonでcron.yaml書いてやってた</a>けど、これならデプロイとかエディタすらも不要。
まだお試し検証中だけど、カジュアルなbot系とかなら良さそうかな。
もちろんUrlFetch機能はGETもPOSTもできるので、<a href="http://pipes.yahoo.com/pipes/" target="_blank">Yahoo!Pipes</a>とか<a href="http://developer.yahoo.com/yql/" target="_blank">YQL</a>とかも使うとわりと夢がひろがりそう。
（ちなみに公式リファレンスにも<a href="https://developers.google.com/apps-script/class_urlfetchapp#fetch" target="_blank">OAuthが必要なTwitter用サンプルコード</a>がある）
