---
title: "Gmailで指定日時に送る ってのをGoogle Apps Scriptで書いた"
slug: "gmail-delay-send-by-google-apps-script"
date: "2013-09-15T00:00:00+09:00"
description: "Gmailで、日付や時間を指定して送りたい（予約送信したい）ってことありますよね。Google Apps Scriptで、指定日はもちろん、分単位で予約して自動送信できるスクリプトを書いた。"
tag: ["Snippet", "Google", "Google Apps Script"]
---

Gmailで、日付や時間を指定して送りたい（予約送信したい）ってことありますよね。Google Apps Scriptで、指定日はもちろん、分単位で予約して自動送信できるスクリプトを書いた。

<!--more-->

Gmail(に限らずだけど)で、時間を指定して送りたいってことありますよね。  
いろんなアリバイ作りとかで。

<a href="http://android-smart.com/2012/03/right-inbox.html" target="_blank" rel="nofollow">ブラウザのプラグイン</a>とかはあるんだけど、会員登録が必要だったり<strong>セキュリティとかどうなの</strong>的な心配があったりするので、Google Apps Scriptでできそうだなあと思ったら、一応それなりのができたっぽい。  
「指定の年月日」はもちろん、分刻みで、しかも「安全に」予約送信ができる。

まず準備（Google Apps Scriptの作成）が必要。

流れとしては、

1. Googleドライブの「作成」→「スクリプト」でスクリプトファイル作成
2. スクリプトファイルに、下記に書いたコードをペースト
3. Gmailのアクセスを許可（自分のアカウントで自分のGmailへのアクセス許可）
4. トリガー（Cronのようなもの）を設定</li>

という感じ。

### 2014/05/15 追記

件名なしでも送りたいとの要望があったので、プログラムを一部修正しました～

### 2014/11/11 追記

Fromを変更してもそのメールアドレスで送れていなかったのを修正しました。

- - -


## まずは下準備

### 1. Googleドライブでスクリプトファイル作成

Googleドライブに行き、「作成」→「スクリプト」。  
プロジェクト名（ファイル名）は何でも構わない。  
今回は「Gmail時間指定送信」という名前にした。

### 2. コードをコピペ

コードは以下。そのまんまでOK。

```js
function delaySendDraftMail() {
  var drafts = GmailApp.getDraftMessages();
  var len = drafts.length;

  //下書きがなければ終了
  if (!len) {
    return false;
  }

  //現在時刻
  var now = (new Date()).getTime();

  for (var i = 0, l = len; i < l; i++) {
    //メールデータをセット
    var mes = drafts[i];
    if ('object' !== typeof mes) {
      continue;
    }

    //件名を取得
    var str = mes.getSubject();
    //件名から日時を抽出
    var match = str.match(/^(\{(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2} \d{1,2}:\d{1,2})\}) ?(.*)?/);
    //日時が抽出できないなら無視
    if (!match || !match[1]) {
      continue;
    }

    //時間を取得
    var time = (new Date(match[2].replace(/\-/g,'/')+' +09:00')).getTime();
    //時間を取得できない、または未来の時間なら無視
    if(!time || (time && time>now)){
      continue;
    }

    //各情報をセット
    var to = mes.getTo();
    var subject = match[3] || '';
    var body = mes.getPlainBody();
    var options = {}, val;

    //必要な情報がなければ無視
    if (!to || !body) {
      continue;
    }

    // 2014.11.11 From を変更した場合でも対応(ただしFrom名はつけられない模様)
    var from = mes.getFrom();
    var aliases = GmailApp.getAliases();
    for (var i = 0, l = aliases.length; i < l; i++) {
      var val = aliases[i];
      // From エイリアス一覧にマッチすれば From として使用
      if (-1 !== from.indexOf(val)) {
        options['from'] = val;
        break;
      }
    }

    if (val = mes.getCc()) {//Cc
      options['cc'] = val;
    }

    if (val = mes.getBcc()) {//Bcc
      options['bcc'] = val;
    }

    if (val = mes.getBody()) {//HTML本文
      //bodyにdivタグがあればHTMLとみなす
      if ( val.indexOf('<div')!==-1 ) {
        options['htmlBody'] = val;
      }
    }

    //添付ファイル
    if (val = mes.getAttachments()) {
      options['attachments'] = val;
    }

    // 送信！
    var status = GmailApp.sendEmail(to, subject, body, options);

    //送信したら下書きをゴミ箱へ
    if (status) {
      mes.moveToTrash();
    }
  }
}
```

特に怪しいところはない。  
あと特に複雑なことしてるわけじゃないw

### 3. アクセス許可（コードをテスト実行）

上記のコードをペーストし、「delaySendDraftMail」という関数を実行すると、初回は以下のような承認ダイアログが出る。  
<a href="http://lh4.ggpht.com/-t8mOTQYP27I/UjVXWm8sOLI/AAAAAAAADWs/2vRpuuBNHRI/s291/2013-09-15_093131.png" target="_blank"><img class="aligncenter" alt="承認ダイアログ" src="http://lh4.ggpht.com/-t8mOTQYP27I/UjVXWm8sOLI/AAAAAAAADWs/2vRpuuBNHRI/s291/2013-09-15_093131.png" /></a>

「続行」すると、次はこれ。  
<a href="http://lh4.ggpht.com/-UsJSPbbY3KQ/UjVXX4hjDoI/AAAAAAAADW0/l267Re4Ut0I/s602/2013-09-15_093222.png" target="_blank"><img class="aligncenter" alt="Gmailへのアクセス許可" src="http://lh4.ggpht.com/-UsJSPbbY3KQ/UjVXX4hjDoI/AAAAAAAADW0/l267Re4Ut0I/s602/2013-09-15_093222.png" /></a>

### 4. トリガーを設定

スクリプトの「トリガー」を設定する。

編集画面の上のほうにある時計っぽいマークをクリック。  
<a href="http://lh6.ggpht.com/-LgQ7EP9JT-s/UjVXYhQShnI/AAAAAAAADW8/pD5muOyR7-Q/s527/2013-09-15_154126.png" target="_blank"><img class="aligncenter" alt="トリガーの設定を開く" src="http://lh6.ggpht.com/-LgQ7EP9JT-s/UjVXYhQShnI/AAAAAAAADW8/pD5muOyR7-Q/s527/2013-09-15_154126.png" /></a>

まだトリガーがない状態だと思うので「今すぐ追加するにはここをクリックしてください。」をクリックして、「分タイマー」で「1分ごと」に設定する。  
<a href="http://lh4.ggpht.com/-Ywi0JAKJ6Cc/UjVXZk1YPUI/AAAAAAAADXE/uTlJuKwIM4Q/s854/2013-09-15_154211.png" target="_blank"><img class="aligncenter" alt="「1分ごと」に設定" src="http://lh4.ggpht.com/-Ywi0JAKJ6Cc/UjVXZk1YPUI/AAAAAAAADXE/uTlJuKwIM4Q/s640/2013-09-15_154211.png" /></a>

さらに、右側にある「通知」をクリックして、スクリプトの失敗時にメールを受け取るようにしておくといいかも。  
<a href="http://lh4.ggpht.com/-LSakb9PhhWE/UjVXar2wBGI/AAAAAAAADXM/U2EbyhKg1lc/s456/2013-09-15_154308.png" target="_blank"><img class="aligncenter" alt="エラーメール受け取りの設定" src="http://lh4.ggpht.com/-LSakb9PhhWE/UjVXar2wBGI/AAAAAAAADXM/U2EbyhKg1lc/s456/2013-09-15_154308.png" /></a>
「immediately」は「その都度」ってことのようです。

以上で下準備は完了。  
このスクリプトファイルについては、今後は放置で。


## 日時指定メールの作成方法

送信日時を指定したいメールは、Gmailで「<strong>下書き</strong>」をつくる。  
その時、<strong>「件名」に日時を指定する</strong>ことで、その日時に送られる。

例えば「2013年9月20日の16:32に送信したい」という場合。  
送りたいメールの、下書きの件名を以下のように記述する。

> <span style="color:#27AE60">{2013/09/20 16:32}</span><span style="color:#5282D3">午後4時半になりましたよ！</span>

で、そのまま ***下書きとして保存しておく*** 。（というか自動保存）  
「<span style="color:green">{2013/09/20 16:32}</span>」の部分が送りたい日時、  
「<span style="color:#5282D3">午後4時半になりましたよ！</span>」の部分が実際の件名になって送信される。  
逆に、 ***件名が上記の形式になっていないものは完全無視*** 。  

スクリプトの動作としては、  
下書きの件名に日時が含まれるものがあるか探して、  
↓  
見つかったらその日時が過去か調べて、  
↓  
過去ならその下書きをもとに新規メールを作成して送信、  
↓  
もとの下書きは削除。  
という流れになっているので、 ***送信後はゴミ箱に下書きが残る*** 。  
注意点として以下がある。

- ***「本文インライン画像」には非対応（添付ファイルや普通のHTMLメールはOK）***
- ***例えば数分後に送信したい場合で、下書きの件名に日時を指定したままいつまでも本文を編集していると、Gmailが自動保存→指定時間になっちゃって送信されるってことがあるかもしれない***

ということで、そんなに大したことじゃないけど、やってる人が見つからなかったので自分で作ってみた。
