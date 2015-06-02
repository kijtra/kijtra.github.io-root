---
title: "MySQLでLOCATE()とかINSTR()とかPOSITION()とかが大文字・小文字を区別してくれない"
slug: "mysql-string-position-upper-lower-case"
date: "2013-12-26T00:00:00+09:00"
description: "MySQLで、文字列内の任意の文字が何文字目に出てくるか取得できるLOCATE関数で、大文字と小文字に関係なく最初の文字を取得してきてしまうので対処メモ。"
tag: ["MySQL"]
---

MySQLで、文字列内の任意の文字が何文字目に出てくるか取得できるLOCATE関数で、大文字と小文字に関係なく最初の文字を取得してきてしまうので対処メモ。

<!--more-->

[LOCATE関数](http://dev.mysql.com/doc/refman/5.1/ja/string-functions.html#idm47509624022112){:target="_blank"}と同等の[INSTR関数](http://dev.mysql.com/doc/refman/5.1/ja/string-functions.html#idm47509624082512)とか[POSITION関数](http://dev.mysql.com/doc/refman/5.1/ja/string-functions.html#idm47509623909712)でも同じ症状。
[こちらの自作ストアドファンクション(とPHP関数)](https://gist.github.com/kijtra/8129050)を作る時に悩んだのでメモ。

以下を実行すると、どうなりますかね。

```sql
SELECT LOCATE('M', 'MySQL and me');
```

もちろん「1」が返ってくる。

すると以下はどうか。（「m」が小文字）

```sql
SELECT LOCATE('m', 'MySQL and me');
```

これも「1」が返ってくる。
本当は「me」の「m」の場所を返してほしい。

たぶんDBやテーブルなんかの文字コードに関係するんだと思うけど（そこまでは調べていない・・・）、文字をBINARYに変換するとうまくいった。

```sql
SELECT LOCATE( CAST('m' AS BINARY), CAST('MySQL and me' AS BINARY) );
```

これだと小文字「m」の場所である「11」が返ってきた。
