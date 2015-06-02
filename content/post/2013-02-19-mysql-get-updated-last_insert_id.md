---
title: "MySQLで ON DUPLICATE KEY UPDATE した時も LAST_INSERT_ID を取得する"
slug: "mysql-get-updated-last_insert_id"
date: "2013-02-19T00:00:00+09:00"
description: "MySQLで UPDATE や INSERT...ON DUPLICATE KEY UPDATE の時とかに LAST_INSERT_ID を取得するメモ。"
tag: ["MySQL"]
---

MySQLで UPDATE や INSERT...ON DUPLICATE KEY UPDATE の時とかに LAST_INSERT_ID を取得するメモ。

<!--more-->

MySQLで普通に ``UPDATE`` した時（これはIDわかってるだろうから不要だろうけど）とか、``INSERT...ON DUPLICATE KEY UPDATE`` した時にも ``LAST_INSERT_ID`` が取得したいって時あるあるですよね。
普通にSQL文書くとできなかったから不可能だと思ってたけど、できたっぽいのでメモ。

まず普通のUPDATEのときは、以下のようにする。（「13」てのはプライマリキーのID）

```sql
UPDATE `table_name`
SET `col` = 'hoge'
WHERE `id` = LAST_INSERT_ID( 13 )
LIMIT 1;
```

で、最もやりたい ``ON DUPLICATE KEY UPDATE`` のときは以下のように。

```sql
INSERT INTO `table_name` ( `id`, `col1`, `col2` )
VALUES ( '13', 'val1', 'val2' )
ON DUPLICATE KEY UPDATE
  `col1` = VALUES( `col1` ),
  `col2` = VALUES( `col2` ),
  `id` = LAST_INSERT_ID( `id` );
```

さいごのところがキモですかね。
これで、mysqli_query(または mysql_query ) の直後に <a href="http://www.php.net/manual/ja/mysqli.insert-id.php" target="_blank">mysqli_last_insert_id(または mysql_last_insert_id )</a> で取得するか、

```php
<?php
$id = mysqli_result( mysqli_query( "SELECT LAST_INSERT_ID()" ), 0 );
```

とかでもIDが取得できる。

``LAST_INSERT_ID`` に引数があるのは知ってたけど、効果は知らなかった。
LAST_INSERT_IDに値をセットしておけば、後でまた取り出せるってことだとは思うけど、取り出さなかった時にどこまでそれが保持されるのかとかがやや不安・・・
この使い方が正しいかどうかはマニュアルに見つからなかったんだけど、以下がそれっぽい記述かな・・・。

> b.テーブルを使用して、次のようにシークエンス番号を生成 :  
> mysql> UPDATE sequence SET id=LAST_INSERT_ID(id+1);  
> mysql> SELECT LAST_INSERT_ID();  
> UPDATE 文はシークエンス カウンタを増分し、LAST_INSERT_ID() への次の呼び出しが更新された値を戻すようにします。  
> SELECT 文はその値を引き出します。  
> mysql_insert_id() C API 関数は、値の入手に使用することもできます。  
> <cite><a href="http://dev.mysql.com/doc/refman/5.1/ja/information-functions.html" target="_blank">11.10.3. 情報関数</a></cite>
