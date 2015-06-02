---
title: "ランダムな文字列を生成するPHP関数"
slug: "random-string"
date: "2012-11-26T00:00:00+09:00"
description: "ランダムな文字列を生成する関数。会員系サイト（パスワード忘れとか）とかに使ったりするかも？"
tag: ["PHP", "Snippet"]
---

ランダムな文字列を生成する関数。
第一引数は生成後の文字数、第二匹数は記号を含めるかどうか。

<!--more-->

```php
<?php
function random_str($len=12,$special=false){
	$len=empty($len) ? 12 : $len;
	mt_srand((double)microtime()*1000000);
	$chars=array(
		array(
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
		),
		array(
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
		),
		array(
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		)
    );
	if($special){
		$chars[]=array(
			'@', '%', '^', '(', ')', '_', '<', '>', '{', '}', '[', ']',';', '.',
			'/', '|', ':', '&', '#', '~', '>', ')', '-', '?', '=', '!', '$', '*'
		);
	}
	$num=count($chars)-1;
	$str='';
	for($i=0;$i<$len;$i++){
		$c=$chars[mt_rand(0,$num)];
		$str.=$c[mt_rand(0,count($c)-1)];
	}
	return $str;
}
?>
```
