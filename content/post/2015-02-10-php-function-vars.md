---
title: "PHPで変数を便利にSet/Getする関数をつくった"
slug: "php-function-vars"
date: "2015-02-10T09:50:00+09:00"
description: "PHPでグローバルな変数を扱う時に $GLOBALS とかスーパーグローバル変の汚染とかあんまり使いたくなかったので、手軽にできる関数を作った。"
tag: ["PHP"]
---

PHPでグローバルな変数を扱う時に `$GLOBALS` とか [スーパーグローバル変数](http://php.net/manual/ja/language.variables.superglobals.php) の汚染とかあんまり使いたくなかったので、手軽にできる関数を作った。  

<!--more-->

まずはコード。

<script src="https://gist.github.com/kijtra/78c54a12cfbf3c4432f3.js"></script>

第一引数がキー、第二引数が値で、値がある場合はSet、値がない場合はGetになる。  
基本的な使い方としては以下のような感じ。

```php
<?php

// キーを「A」、値を「B」とした変数のセット
vars('A', 'B');

// キー「A」を取得
echo vars('A'); //　-> "B"



// 「A」を上書き
vars('A', 'Aval');

// 再びキー「A」を取得
echo vars('A'); //　-> "Aval"



// もちろん多次元配列などもセット可能
$value = array(
    'C1' => 'C1val',
    'C2' => array(
        'C2-1' => 'C2-1val',
        'C2-2' => 'C2-2val',
        'C2-3' => 'C2-3val',
    )
);
vars('C', $value);



// 引数なしの場合はセットした全部を取得
$all = vars();
/*
array(
    'A' => 'Aval',
    'C' => array(
        'C1' => 'C1val',
        'C2' => array(
            'C2-1' => 'C2-1val',
            'C2-2' => 'C2-2val',
            'C2-3' => 'C2-3val'
        )
    )
)
*/


// 存在しないキーの場合はnull
var_dump(vars('who')); // -> null
```

大きな特徴は、多次元配列を入れた時に下層の配列へは **ドットつなぎの文字列で簡単にアクセスできる** 点。

```php
<?php
// 上の例でセットした「C2-2」の値を取得
echo vars('C.C2.C2-2'); // -> "C2-2val"
```

で、下層の配列の一部を上書きしたいことがあるけど、その場合もドットつなぎで。

```php
<?php
// 上の例でセットした「C2-2」の値を再セット
vars('C.C2.C2-2', 'C2-2 is override!');

echo vars('C.C2.C2-2'); // -> "C2-2 is override!"


// この時、「C」の配列全体は以下のようになっている
array(
    'C1' => 'C1val',
    'C2' => array(
        'C2-1' => 'C2-1val',
        'C2-2' => 'C2-2 is override!', // ここだけ上書き済み
        'C2-3' => 'C2-3val',
    )
)
```

ドットつなぎでの取得は `static` 変数でプチキャッシュしてるので2回目以降は速いはず。  

あと、関数内で `array_replace_recursive` という関数を使ってる。  
これは PHP5.3 からの機能なので、それ以下のバージョンの場合は [公式ドキュメントにあるユーザー関数](http://php.net/manual/ja/function.array-replace-recursive.php#109390) を書いておく必要がある。

```php
<?php
if (!function_exists('array_replace_recursive'))
{
	// http://php.net/manual/ja/function.array-replace-recursive.php#109390
	function array_replace_recursive($base, $replacements)
	{
		foreach (array_slice(func_get_args(), 1) as $replacements) {
			$bref_stack = array(&$base);
			$head_stack = array($replacements);

			do {
				end($bref_stack);

				$bref = &$bref_stack[key($bref_stack)];
				$head = array_pop($head_stack);

				unset($bref_stack[key($bref_stack)]);

				foreach (array_keys($head) as $key) {
					if (isset($key, $bref) && is_array($bref[$key]) && is_array($head[$key])) {
						$bref_stack[] = &$bref[$key];
						$head_stack[] = $head[$key];
					} else {
						$bref[$key] = $head[$key];
					}
				}
			} while(count($head_stack));
		}

		return $base;
	}
}
```

余談だけど、この `vars` は個人的によく使ってる関数なんだけど、関数名がなんかしっくりこない。  
`var()` という名前は予約後で使えないので、よく使うので短く書くために `v()` とかにしようかと思ったけど、これもなんだかなあw
