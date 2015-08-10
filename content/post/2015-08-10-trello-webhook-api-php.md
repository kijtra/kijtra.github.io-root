---
title: "Trello の Webhook API をPHPで受け取ってみた"
date: "2015-08-10T14:18:14+09:00"
slug: "trello-webhook-api-php"
description: "タスク管理ツール「Trello」のプッシュ通知API「Webhook」が便利そうだったのでPHPで処理してみた。"
tag: ["PHP", "API"]
---

タスク管理ツール「[Trello](https://trello.com)」のAPIに **[Webhook](https://trello.com/docs/gettingstarted/webhooks.html)** というものがありまして、更新を任意のURLにリアルタイムでプッシュ通知してくれるという非常に便利なAPIなのです。
わりと日本語の紹介記事などがなかったのでメモ。

<!--more-->

## まずはAPIキーをゲット

[Trello](https://trello.com)にログインし、以下のURLにアクセス。  
**https://trello.com/app-key**


## アクセストークンをゲット

APIキーを使って以下のURLにアクセスすると、認証画面が出るので「**Allow**」で許可する。  
**https://trello.com/1/authorize?key=[APIキー]&expiration=never&response_type=token&scope=read,write**

するとトークン文字が表示されるので、どこかに保存しておく。


## ライブラリを使う

Trello APIを使うのに便利なライブラリを取得しておく。  
個人的には以下のものを使ってる。（[公式ドキュメントはこちら](https://github.com/cdaguerre/php-trello-api/blob/master/docs/Api/Index.md)）  
**[cdaguerre/php-trello-api](https://github.com/cdaguerre/php-trello-api)**  

Composerでインストール

```bash
$ composer.phar require cdaguerre/php-trello-api:@dev
```

## ボードのIDを取得する

Webhookを作る際に通知を受け取るボードのIDが必要になるので、自分のボード一覧を見て確認しておく。

```php
<?php
include(__DIR__.'/vendor/autoload.php');

$api_key = '取得したAPIキー';
$access_token = '取得したアクセストークン';

// cdaguerre/php-trello-api ライブラリの名前空間
use Trello\Client;

// APIクライアントのインスタンス作成
$client = new Client();

// APIキーとトークンで認証
$client->authenticate($api_key, $access_token, Client::AUTH_URL_CLIENT_ID);

// 自分のボード一覧を取得
// ※「ユーザーID」はログイン時のユーザーID。
$boards = $client->members()->boards()->all('ユーザーID');

// 表示
var_dump($boards);
```

実行すると、以下のようなデータが表示される。

```php
array(9) {
  [0]=>
  array(21) {
    ["name"]=>
    string(7) "ボード名"
    ["desc"]=>
    string(0) ""
    ["descData"]=>
    NULL
    ["closed"]=>
    bool(true)
    ["idOrganization"]=>
    NULL
    ["pinned"]=>
    NULL
    ["invitations"]=>
    NULL
    ["shortLink"]=>
    string(8) "xxxxxxxx"
    ["powerUps"]=>
    NULL
    ["dateLastActivity"]=>
    string(24) "0000-00-00T00:00:00.000Z"
    ["idTags"]=>
    array(0) {
    }
    ["id"]=>
    string(24) "123456789abcdefghijklmno" // ★ここのIDが必要
    ["invited"]=>
    bool(false)
    ["starred"]=>
    ...
```



## Webhook を作る

Webhookを受信するURLを設定する。

- [Trello公式のAPIドキュメント](https://trello.com/docs/gettingstarted/webhooks.html)
- [cdaguerre/php-trello-api ライブラリの Webhook ドキュメント](https://github.com/cdaguerre/php-trello-api/blob/master/docs/Api/Webhook.md)

```php
<?php
include(__DIR__.'/vendor/autoload.php');

$api_key = '取得したAPIキー';
$access_token = '取得したアクセストークン';

// cdaguerre/php-trello-api ライブラリの名前空間
use Trello\Client;

// APIクライアントのインスタンス作成
$client = new Client();

// APIキーとトークンで認証
$client->authenticate($api_key, $access_token, Client::AUTH_URL_CLIENT_ID);

// Webhookを作成
$hook = array(
    'description' => 'My First Webhook!',
    'callbackURL' => 'http://example.com/trelloCallback.php',
    'idModel' => 'ボードのID',
);
$webhooks = $client->webhooks()->create($hook);
var_dump($webhooks);
```

上記を実行すると、以下のようなレスポンスが表示される。

```php
array(5) {
  ["id"]=>
  string(24) "123456789abcdefghijklmno"
  ["description"]=>
  string(17) "My First Webhook!"
  ["idModel"]=>
  string(24) "ボードのID"
  ["callbackURL"]=>
  string(48) "http://example.com/trelloCallback.php"
  ["active"]=>
  bool(true)
}
```

これで Webhook を送信する準備は完了。  

ちなみに作成した Webhook の一覧は以下のURLで確認できる。  
https://trello.com/1/tokens/[アクセストークン]/webhooks/?key=[APIキー]


## 通知を受け取るPHPを作成

データはリクエストボディにJSON形式でPOSTされる。

```php
<?php
if ('POST' == $_SERVER['REQUEST_METHOD'] && isset($_SERVER['HTTP_X_TRELLO_WEBHOOK'])) {
    $body = file_get_contents("php://input");
    if (!empty($body)) {
        $json = json_decode($body);

        // ... あとはご自由に ...
    }
}
```

`HTTP_X_TRELLO_WEBHOOK` については、Webhook からのリクエストかどうかを検証するためのハッシュ値がセットされているんだけど、[公式ドキュメント](https://trello.com/docs/gettingstarted/webhooks.html#triggering-webhooks)に倣ってPHPの `hash_hmac` 関数を使って検証してみたけどうまくいかなかった・・・。  
なので、`HTTP_X_TRELLO_WEBHOOK` が存在するかどうかだけ検証してる。  
ちなみに検証用に作ったコードはこちら。

```php
<?php
function verifyTrelloWebhookRequest($body, $secret, $callbackURL, $header) {
    $base64Digest = function($s) use($secret) {
        $s = hash_hmac('sha1', $s, $secret, true);
        $s = base64_encode($s);
        return $s;
    };

    $content = $body + $callbackURL;
    $doubleHash = $base64Digest($base64Digest($content));
    $headerHash = $base64Digest($header);

    return ($doubleHash == $headerHash);
}
```
