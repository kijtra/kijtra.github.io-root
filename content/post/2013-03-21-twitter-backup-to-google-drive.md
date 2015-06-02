---
title: "Twitterの自分の過去ツイートをGoogleドライブに自動バックアップ（＆公開）する方法"
slug: "twitter-backup-to-google-drive"
date: "2013-03-21T00:00:00+09:00"
description: "Twitterの自分の過去のツイートをGoogleドライブにバックアップ（＆公開）しつつ、クールなインターフェイスで閲覧も可能にする方法。"
tag: ["Google", "Google Apps Script", "Twitter"]
---

Twitterの自分の過去のツイートをGoogleドライブにバックアップ（＆公開）しつつ、クールなインターフェイスで閲覧も可能にする方法。

<!--more-->

Twitterの自分のツイートをバックアップするのは<a href="http://twilog.org/" target="_blank">ツイログ</a>なんかが有名だけど、自前のどこかに貯めておきたい気もする。
それをGoogleドライブで、無料で、自動で、しかもプログラム知識ゼロでもできるってやつを見つけたのでその方法を。

<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> <strong>この記事は古いため、もしかしたら実践しても動かないかもしれません。</strong></div>

最近は<a href="https://developers.google.com/apps-script/" target="_blank">Google Apps Script</a>というのがあんまり便利なもんで、自分の過去ツイートを保存するやつでも作ろうかなーと思っていたら、Martin Hawksey(<a href="https://twitter.com/mhawksey" target="_blank">@mhawksey</a>)さんという方が<a href="http://mashe.hawksey.info/2013/01/sync-twitter-archive-with-google-drive/" target="_blank">ドンピシャなものを公開してた</a>。
これは使わん手はない。

その<a href="http://mashe.hawksey.info/2013/01/sync-twitter-archive-with-google-drive/" target="_blank">元記事</a>に手順と動画の説明まであるからいいかな、とはいえ英語だから、ここに日本語用の手順を書いておく。
注意点として、これから説明する方法でバックアップした場合、***バックアップの閲覧にはGoogleドライブの指定フォルダを「一般公開」の状態にする必要がある***。
閲覧URLは複雑な文字列なのでバレにくくはあるけど、非公開ツイートにしている人なんかはあまりおすすめできないかも。
<a href="https://googledrive.com/host/0B6aI6pgeMKqOUmlJbVlDRWFhYkE/" target="_blank"><strong>完成するとこんな感じでツイートが溜まっていく。</strong></a>
見た目カッチョイイし、右の月別ナビゲーションもグッド。
（Twitter公式のテンプレなので。）
これがプログラム知識ナシで、無料で組める。


## STEP 0. Twitterの「アプリ」を作成

下準備。
Googleドライブから自動で自分のツイートを定期的に取得するため、Twitterにアクセスするためのアプリが必要になる。

<a href="https://dev.twitter.com/" target="_blank">https://dev.twitter.com/</a>にアクセスし、自分のTwitterアカウントでサインイン。  
<a href="http://lh3.ggpht.com/-DE5XEV3mxIw/UUptPGEY8FI/AAAAAAAADNE/1W3kVOWbgS0/s990/2013-03-21_111512.png" target="_blank"><img class="aligncenter" alt="自分のTwitterアカウントでサインイン" src="http://lh3.ggpht.com/-DE5XEV3mxIw/UUptPGEY8FI/AAAAAAAADNE/1W3kVOWbgS0/s640/2013-03-21_111512.png" /></a>

<a href="https://dev.twitter.com/apps">My applications</a>へ移動。  
<a href="https://lh6.googleusercontent.com/-6UBBXs45SuE/UUptxsV89MI/AAAAAAAADNM/dQ_Q7_zdAYQ/s399/2013-03-21_111738.png" target="_blank"><img class="aligncenter" alt="My applicationsへ移動" src="https://lh6.googleusercontent.com/-6UBBXs45SuE/UUptxsV89MI/AAAAAAAADNM/dQ_Q7_zdAYQ/s399/2013-03-21_111738.png" /></a>

右上の「Create a new application」をクリックし、必要な情報を入力。  
<a href="https://lh6.googleusercontent.com/-KzxSH2l1I_k/UUp9kc8JhtI/AAAAAAAADOs/F2tRhJ_kTeE/s981/2013-03-21_122459.png" target="_blank"><img class="aligncenter" alt="「Create a new application」をクリック" src="https://lh6.googleusercontent.com/-KzxSH2l1I_k/UUp9kc8JhtI/AAAAAAAADOs/F2tRhJ_kTeE/s640/2013-03-21_122459.png" /></a>

「Name」はなんでもいいけど、誰かが同じ名前のアプリを作ってるとエラーになる。
「Description」も適当に。文字数が少ないとエラー。
「Website」もなんでもOK。とりあえずGoogleドライブのURLにした。

*「Callback URL」は必ず「<strong>https://spreadsheets.google.com/macros</strong>」にする*必要がある。

入力したら「Developer Rules Of The Road」の同意にチェックし、CAPTCHAに表示された文字を入力して「Create your Twitter application」ボタンをクリック。
アプリケーションが作成された。
必要になるのは「<strong>Consumer key</strong>」と「<strong>Consumer secret</strong>」のランダムな文字。
これをメモしておく。  
<a href="http://lh3.ggpht.com/-lw5V0oW5g5o/UUpw1xqJHFI/AAAAAAAADNc/HhbCYz-OGyw/s986/2013-03-21_112853.png" target="_blank"><img class="aligncenter" alt="アプリケーションが作成された" src="http://lh3.ggpht.com/-lw5V0oW5g5o/UUpw1xqJHFI/AAAAAAAADNc/HhbCYz-OGyw/s640/2013-03-21_112853.png" /></a>
下準備ここまで。


## STEP 1. 公式の「Twitterアーカイブファイル」を取得

まず、現在の過去ツイートをダウンロードする。
Twitterでは2012年の12月に、<a href="http://blog.twitter.com/2012/12/your-twitter-archive.html" target="_blank">過去ツイートのバックアップ機能を公開</a>している。
<del>これは現時点（2013-03-21）で英語版だけの機能なんだけど、Twitterの設定画面を英語にすれば使える。</del>

<a href="http://blog.jp.twitter.com/2013/03/blog-post_22.html" target="_blank">日本語版でもできるようになったみたい(2013/03/22)</a>
Twitterにログインし、<a href="https://twitter.com/settings" target="_blank">設定画面</a>に行く。

そして「言語設定」を「英語」にする。（保存時はログインパスワードが必要）  
<a href="http://lh5.ggpht.com/-UsfWaXfgr2Q/UUpfv6bDhGI/AAAAAAAADLs/2v9k9pkbEk8/s912/2013-03-21_101706.png" target="_blank"><img class="aligncenter" alt="「言語設定」を「英語」にする" src="http://lh5.ggpht.com/-UsfWaXfgr2Q/UUpfv6bDhGI/AAAAAAAADLs/2v9k9pkbEk8/s640/2013-03-21_101706.png" /></a>

英語版に切り替わると、同設定画面の下の方に、「Request your archive」ボタンが出現。  
<a href="http://lh3.ggpht.com/-nmfS89iiheE/UUphHkwGoZI/AAAAAAAADL0/9kCePbAoHxU/s922/2013-03-21_102335.png" target="_blank"><img class="aligncenter" alt="「Request your archive」ボタンが出現" src="http://lh3.ggpht.com/-nmfS89iiheE/UUphHkwGoZI/AAAAAAAADL0/9kCePbAoHxU/s640/2013-03-21_102335.png" /></a>

そうすると、「ダウンロード用ページのリンクをメールで送りましたよ」ってなのが出て、リンクつきメールが送られてくる。  
<a href="https://lh4.googleusercontent.com/-3YukWu0Ldi0/UUphsGEgrbI/AAAAAAAADL8/Xkt1xVB3fJo/s391/2013-03-21_102603.png" target="_blank"><img class="aligncenter" alt="ダウンロード用ページのリンクをメールで送りましたよ" src="https://lh4.googleusercontent.com/-3YukWu0Ldi0/UUphsGEgrbI/AAAAAAAADL8/Xkt1xVB3fJo/2013-03-21_102603.png" /></a>

リンクをクリックすると、「Download」ボタンのあるページへ。  
<a href="http://lh6.ggpht.com/-nZboWq9MS1c/UUpiinXlEKI/AAAAAAAADME/OoPe7N8ujOA/s888/2013-03-21_102937.png" target="_blank"><img class="aligncenter" alt="「Download」ボタンのあるページ" src="http://lh6.ggpht.com/-nZboWq9MS1c/UUpiinXlEKI/AAAAAAAADME/OoPe7N8ujOA/s640/2013-03-21_102937.png" /></a>
クリックすると「<strong>tweets.zip</strong>」というファイルがダウンロードされるので、解凍しておく。
（あとでまた使う）

ここまで終わったら、Twitter管理画面は「日本語」に戻してOK。


## STEP 2. Googleドライブの設定

<a href="https://drive.google.com/" target="_blank">Google Drive</a>に行く。
まだ使ったことがない人はなにか始める手続きが必要かもしれない。
***Step1***でダウンロードしたtweets.zipを解凍したフォルダをアップロードする。  
<a href="http://lh5.ggpht.com/-21jvbd91KCY/UUpmV_XrF6I/AAAAAAAADMc/coRlB75fRj0/s343/2013-03-21_104537.png" target="_blank"><img class="aligncenter" alt="フォルダをアップロード" src="http://lh5.ggpht.com/-21jvbd91KCY/UUpmV_XrF6I/AAAAAAAADMc/coRlB75fRj0/2013-03-21_104537.png" /></a>

_このときの注意点として、アップロードファイルの「変換」が「***オフ***」になっている必要がある。_  
<a href="https://lh4.googleusercontent.com/-zc_jxRJJEJs/UUpnO9LHqBI/AAAAAAAADMk/C1OYF_4ZQtE/s513/2013-03-21_104940.png" target="_blank"><img class="aligncenter" alt="「変換」が「オフ」になっている必要がある" src="https://lh4.googleusercontent.com/-zc_jxRJJEJs/UUpnO9LHqBI/AAAAAAAADMk/C1OYF_4ZQtE/2013-03-21_104940.png" /></a>

Googleドライブ内に「***tweets***」というフォルダが作られ、中にファイル一式が作成された状態。  
<a href="https://lh6.googleusercontent.com/--8eRakd1GM0/UUpopV4PCbI/AAAAAAAADMs/0qystxS3HRo/s685/2013-03-21_105539.png" target="_blank"><img class="aligncenter" alt="ファイル一式" src="https://lh6.googleusercontent.com/--8eRakd1GM0/UUpopV4PCbI/AAAAAAAADMs/0qystxS3HRo/s640/2013-03-21_105539.png" /></a>

そして「***tweets***」フォルダのURLに含まれる「***フォルダID***」をメモしておく。  
<a href="http://lh5.ggpht.com/-aql1p_inSEU/UUp3YnOUkYI/AAAAAAAADOI/rKHO0MDGpU4/s730/2013-03-21_115833.png" target="_blank"><img class="aligncenter" alt="ファイル一式" src="http://lh5.ggpht.com/-aql1p_inSEU/UUp3YnOUkYI/AAAAAAAADOI/rKHO0MDGpU4/s640/2013-03-21_115833.png" /></a>


## STEP 3. Hawkseyさんのファイルをコピー

Hawkseyさんが作ったGoogleスプレッドシートを、自分のGoogleドライブにコピーする。  
<a href="https://docs.google.com/spreadsheet/ccc?key=0AqGkLMU9sHmLdHRtbUF4OGh6ZnBZeFVsSjNhZlc1Z2c#gid=1" target="_blank"><strong>このリンクをクリック</strong></a>して開き、「ファイル」メニューから「コピーを作成」をクリック。  
<a href="http://lh5.ggpht.com/-3fZqRifOtZ8/UUpqBFeqo6I/AAAAAAAADM4/OF3-BsAoWmc/s780/2013-03-21_110132.png" target="_blank"><img class="aligncenter" alt="「ファイル」メニューから「コピーを作成」をクリック" src="http://lh5.ggpht.com/-3fZqRifOtZ8/UUpqBFeqo6I/AAAAAAAADM4/OF3-BsAoWmc/s640/2013-03-21_110132.png" /></a>
コピーするドキュメント名はなんでも良い。（「コピー ～...」のままでOK）
そしたらコピーが自分のGoogleドライブに保存される。


## STEP 4. Google Apps Scriptの設定と起動

コピーしたスプレッドシートでの操作。
（Hawkseyさんのと間違わないように）
これまでにメモした以下の3つを使用するので、念のため確認。

- STEP 0 でのTwitterアプリの「<strong>Consumer key</strong>」
- STEP 0 でのTwitterアプリの「<strong>Consumer secret</strong>」
- STEP 2 での「tweets」フォルダのURLに含まれる「<strong>フォルダID</strong>」

シート内にある「Authorize/Add Sync Menu」をクリック。  
<a href="http://lh4.ggpht.com/-uFtl4eaabTo/UUpzLppnuYI/AAAAAAAADNk/E-Od6xGCtrM/s623/2013-03-21_114042.png" target="_blank"><img class="aligncenter" alt="「Authorize/Add Sync Menu」をクリック" src="http://lh4.ggpht.com/-uFtl4eaabTo/UUpzLppnuYI/AAAAAAAADNk/E-Od6xGCtrM/s623/2013-03-21_114042.png" /></a>

承認の大仰な警告が表示される。
念のため内容をよく読んで「OK」をクリック。  
<a href="https://lh5.googleusercontent.com/-Lb3pMbTP6Uw/UUp0aIQE7MI/AAAAAAAADNs/UuoHAcwsGFY/s916/2013-03-21_114552.png" target="_blank"><img class="aligncenter" alt="「Authorize/Add Sync Menu」をクリック" src="https://lh5.googleusercontent.com/-Lb3pMbTP6Uw/UUp0aIQE7MI/AAAAAAAADNs/UuoHAcwsGFY/s640/2013-03-21_114552.png" /></a>

別ウインドウで承認完了の旨が表示されるので、閉じる。  
<a href="http://lh4.ggpht.com/--4yyZ-XqMBk/UUp06cuE8eI/AAAAAAAADN0/baj9gW5PPLc/s243/2013-03-21_114800.png" target="_blank"><img class="aligncenter" alt="「Authorize/Add Sync Menu」をクリック" src="http://lh4.ggpht.com/--4yyZ-XqMBk/UUp06cuE8eI/AAAAAAAADN0/baj9gW5PPLc/s243/2013-03-21_114800.png" /></a>

承認が完了すると、スプレッドシートの上部に「Sync Twitter Setup」というメニューが表示される。  
<a href="https://lh3.googleusercontent.com/-9yyLogfioY8/UUp1a6F3cGI/AAAAAAAADN8/VcpE_KNFPU8/s808/2013-03-21_115015.png" target="_blank"><img class="aligncenter" alt="「Sync Twitter Setup」というメニューが表示" src="https://lh3.googleusercontent.com/-9yyLogfioY8/UUp1a6F3cGI/AAAAAAAADN8/VcpE_KNFPU8/s640/2013-03-21_115015.png" /></a>

表示された「Sync Twitter Setup」にある「Set Archive Path」をクリックし、表示されたウインドウに「tweets」フォルダ「<strong>フォルダID</strong>」を入力して「Save Configuration」ボタンをクリック。  
<a href="http://lh3.ggpht.com/-ZlkzUuraYSY/UUp3YrUuD3I/AAAAAAAADOM/xNYuuVVUL2s/s782/2013-03-21_115422.png" target="_blank"><img class="aligncenter" alt="「フォルダID」を入力" src="http://lh3.ggpht.com/-ZlkzUuraYSY/UUp3YrUuD3I/AAAAAAAADOM/xNYuuVVUL2s/s640/2013-03-21_115422.png" /></a>

再度「Sync Twitter Setup」から「API Authentication」をクリックし、表示されたウインドウにTwitterアプリの「<strong>Consumer key</strong>」と「<strong>Consumer secret</strong>」を入力して「Save Configuration」ボタンをクリック。  
<a href="http://lh4.ggpht.com/-HrJIATbuXQI/UUp5Zgf7_OI/AAAAAAAADOU/Ojw8zpkLjuQ/s803/2013-03-21_120711.png" target="_blank"><img class="aligncenter" alt="「Consumer key」と「Consumer secret」を入力" src="http://lh4.ggpht.com/-HrJIATbuXQI/UUp5Zgf7_OI/AAAAAAAADOU/Ojw8zpkLjuQ/s640/2013-03-21_120711.png" /></a>

これで入力系はOK。
次にTwitterへのアクセス認証。

スプレッドシートの「ツール」から「スクリプト エディタ...」をクリック。  
<a href="https://lh5.googleusercontent.com/-1I81NTZukzc/UUp6WcMV3JI/AAAAAAAADOc/P1rOyZbd9ZY/s648/2013-03-21_121116.png" target="_blank"><img class="aligncenter" alt="「スクリプト エディタ」をクリック" src="https://lh5.googleusercontent.com/-1I81NTZukzc/UUp6WcMV3JI/AAAAAAAADOc/P1rOyZbd9ZY/s640/2013-03-21_121116.png" /></a>

別ウインドウで「スクリプトエディタ」が開くので、上メニューの「関数を選択」をクリックし、「<strong>authorize</strong>」を選択して実行（三角ボタン）をクリック。  
<a href="http://lh5.ggpht.com/-idCbzUKb00Y/UUp7ThMUO7I/AAAAAAAADOk/6Vavnwk4D0I/s686/2013-03-21_121518.png" target="_blank"><img class="aligncenter" alt="「authorize」を選択して実行" src="http://lh5.ggpht.com/-idCbzUKb00Y/UUp7ThMUO7I/AAAAAAAADOk/6Vavnwk4D0I/s640/2013-03-21_121518.png" /></a>

「承認が必要です」には「承認」をクリック。  
<a href="http://lh5.ggpht.com/-hZSM4yu7NxE/UUp-cWKJQoI/AAAAAAAADO4/nbMn2Pcx7UQ/s261/2013-03-21_122433.png" target="_blank"><img class="aligncenter" alt="「承認」をクリック" src="http://lh5.ggpht.com/-hZSM4yu7NxE/UUp-cWKJQoI/AAAAAAAADO4/nbMn2Pcx7UQ/s261/2013-03-21_122433.png" /></a>

Twitterの画面に移動するので、「連携アプリを承認」をクリック。  
<a href="https://lh4.googleusercontent.com/-vYx82TJPknw/UUp_ANo_DRI/AAAAAAAADPA/tPBIWdwlNAw/s693/2013-03-21_123105.png" target="_blank"><img class="aligncenter" alt="「連携アプリを承認」をクリック" src="https://lh4.googleusercontent.com/-vYx82TJPknw/UUp_ANo_DRI/AAAAAAAADPA/tPBIWdwlNAw/s640/2013-03-21_123105.png" /></a>

何事も無くければ、「スクリプトエディタ」は閉じて、スプレッドシートでの設定に戻る。
あとは現在のツイートデータを保存する。

スプレッドシート上部の「Sync Twitter Setup」にある「Update Archive Now」をクリックすると、その時点のツイートデータが保存される。  
<a href="http://lh6.ggpht.com/-k2f-HAzl2Wg/UUp_-DBrgWI/AAAAAAAADPI/uVutv3pAFGk/s640/2013-03-21_123513.png" target="_blank"><img class="aligncenter" alt="「Update Archive Now」をクリック" src="http://lh6.ggpht.com/-k2f-HAzl2Wg/UUp_-DBrgWI/AAAAAAAADPI/uVutv3pAFGk/s640/2013-03-21_123513.png" /></a>

あとは最後の仕上げ。

スプレッドシート上部の「Sync Twitter Setup」にある「Turn Auto-Refresh On」をクリックすれば、ウインドウを閉じても、サーバー側で定期的に、自動でツイートが蓄積されていく。  
<a href="https://lh5.googleusercontent.com/-awL5O3zSgzM/UUqA1xgb2II/AAAAAAAADPQ/FwHUycZlTJg/s640/2013-03-21_123859.png" target="_blank"><img class="aligncenter" alt="「Turn Auto-Refresh On」をクリック" src="https://lh5.googleusercontent.com/-awL5O3zSgzM/UUqA1xgb2II/AAAAAAAADPQ/FwHUycZlTJg/s640/2013-03-21_123859.png" /></a>

お疲れさまでした。


## バックアップの閲覧

「STEP2」での「<strong>tweets</strong>」フォルダの共有設定を「<strong>ウェブ上で一般公開</strong>」にする。
（閲覧URLは複雑な文字列なのでバレにくくはあるけど、非公開ツイートにしている人なんかはあまりおすすめできないかも）
その後は以下のようなURLから閲覧できる。
<strong>https://googledrive.com/host/フォルダID/</strong>
「フォルダID」は Step2 でメモしたものと同じ。
この素晴らしいスクリプトを作ったMartin Hawksey(<a href="https://twitter.com/mhawksey" target="_blank">@mhawksey</a>)さんの過去ツイートはこちら。
<a href="https://googledrive.com/host/0B6GkLMU9sHmLRFk3VGh5Tjc5RzQ/" target="_blank">https://googledrive.com/host/0B6GkLMU9sHmLRFk3VGh5Tjc5RzQ/</a>

動画でもやり方が公開されている（英語）ので、確認になると思う。
<iframe width="640" height="360" src="http://www.youtube.com/embed/ce8G3sEOjAY?rel=0" frameborder="0" allowfullscreen></iframe>
