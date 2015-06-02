---
title: "AppFog（のPHP）でCronぽいことを実現する"
slug: "cron-in-appfog-php"
date: "2013-10-07T00:00:00+09:00"
description: "AppFogでCronを使いたいと思って調べてみたら、Cron機能自体はないんだけどそれっぽいことができたのでメモ。"
tag: ["PHP", "Cron"]
---

<a href="https://www.appfog.com/" target="_blank" rel="nofollow">AppFog</a>でCronを使いたいと思って調べてみたら、Cron機能自体はないんだけどそれっぽいことができたのでメモ。

<!--more-->

だいたいは以下のページの焼き増し。
<a href="http://stackoverflow.com/questions/13595025/running-php-workers-on-appfog" target="_blank" rel="nofollow">Stack Overflow : Running PHP workers on AppFog</a>

流れとしては、

1. Cronするには専用の新規アプリを作る必要があるので作る
2. それをスタンドアロンアプリとして設定
3. 常時実行コマンドみたいなやつを設定して特定のPHPファイルを常時実行
4. そのPHP内でCronぽい動きをさせる</li>

という感じ。

まずはローカルでCronテスト用のアプリディレクトリとファイルを作成。
ここでは例として「<strong>my-cron</strong>」というアプリ名とする。

my-cronディレクトリに「<strong>index.php</strong>」を作成。（ファイル名はなんでも良い）
このindex.phpの中身は以下のような感じ。

```php
<?php
//タイムアウトなしに設定
set_time_limit(0);
//延々と繰り返す
while (true) {
	//確認のためログに出力される文字
	echo "Cronテストっす\n";
	//指定時間だけ処理止める(ここでは300秒=5分)
	//ここで止める間隔がCronの実行間隔になる
	sleep(300);
}
```

あとは基本的にコマンドラインでの作業。
（appfogの管理画面でもできるかもだけど調べてない）
※appfogのコマンド「af」は<a href="https://docs.appfog.com/getting-started/af-cli" target="_blank" rel="nofollor">appfogのCLI</a>をインストールしておく必要あり

```sh
# 上で決めたCron用アプリのディレクトリに移動
$ cd /path/to/my-cron
# アプリの新規作成ステップ開始
$ af push
Would you like to deploy from the current directory? [Yn]:# そのままEnter
Application Name: my-cron # 上で決めたアプリ名を入力
Detected a PHP Application, is this correct? [Yn]: n # No(n)を指定
1: Sinatra
2: JavaWeb
3: Spring
4: Rails
5: Play
6: Erlang/OTP Rebar
7: PHP
8: Lift
9: Django
10: Rack
11: WSGI
12: Standalone
13: Node
14: Grails
Select Application Type: 12 # 「Standalone」を指定
Selected Standalone Application
1: java
2: node04
3: node06
4: node08
5: php
6: python2
7: ruby18
8: ruby192
9: ruby193
Select Runtime: 5 # 「php」を指定
Selected php
Start Command: php index.php # 常時実行コマンド。上で作ったファイル「index.php」
1: AWS US East - Virginia
2: AWS EU West - Ireland
3: AWS Asia SE - Singapore
4: HP AZ 2 - Las Vegas
Select Infrastructure: 3 # 任意。ここでは「AWS Asia」
Application Deployed URL [None]: # そのままEnter
Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]: # そのままEnter
How many instances? [1]: # そのままEnter
Bind existing services to 'my-cron'? [yN]: # そのままEnter
Create services to bind to 'my-cron'? [yN]: # そのままEnter
Would you like to save this configuration? [yN]: # そのままEnter
# あとは自動出力
Creating Application: OK
Uploading Application:
  Checking for available resources: OK
  Packing application: OK
  Uploading (0K): OK
Push Status: OK
Staging Application 'my-cron': OK
Starting Application 'my-cron': OK
```

↑ソースの色付け見難くてスミマセン・・・

これで、「my-cron」アプリの「index.php」が常時動いてることになるので、
sleep()で止めるなり指定時間になにか処理するなりしていく模様。
（PHPが動きっぱなしってのが個人的に気持ち悪いけどw）
