---
title: "配列の好きなところに配列を挿入する関数"
slug: "array-insert"
date: "2012-12-11T00:00:00+09:00"
description: "タイトルまんまだけどわりとこういう関数がないみたいなので作ってみた。"
tag: ["PHP", "Snippet"]
---

タイトルまんまだけどわりとこういう関数がないみたいなので作ってみた。

<!--more-->

「<a href="http://php.net/manual/ja/function.array-splice.php" target="_blank">array_splice</a>」ってのがあるんだけど、配列のキー（添字）が保持されないんで、そこらへんを対応した。
引数の順番がどういうのがわかりやすいが悩んだけど・・・気に入らない人は変えちゃってください。

```php
<?php
// 第一引数：挿入元配列 / 第二引数：挿入位置(ゼロは最初) / 第三引数：挿入したい配列
function array_insert($origin,$position,$insert){
	if(!is_array($origin) || !is_array($insert)){
		return false;
	}
	$origin_keys=array_keys($origin);
	$origin_values=array_values($origin);
	$insert_keys=array_keys($insert);
	$insert_values=array_values($insert);
	array_splice($origin_keys,$position,0,$insert_keys);
	array_splice($origin_values,$position,0,$insert_values);
	return array_combine($origin_keys,$origin_values);
}
?>
```
