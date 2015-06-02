---
title: "2つの配列が同じものかどうかチェックするPHP関数"
slug: "php-check-same-array"
date: "2014-05-13T11:07:00+09:00"
description: "PHPで、配列の内容が同じかどうかチェックしたい時に使う関数。  連想配列の階層が深くても可。"
tag: ["PHP"]
---

PHPで、配列の内容が同じかどうかチェックしたい時に使う関数。  
連想配列の階層が深くても可。

<!--more-->

```php
<?php
function is_same_array($array1 = null, $array2 = null)
{
    if (empty($array1) && empty($array2)) {
        return true;
    } elseif(
        (empty($array1) && !empty($array2))
        || (!empty($array1) && empty($array2))
    ) {
        return false;
    } elseif(
        (is_array($array1) && !is_array($array2))
        || (!is_array($array1) && is_array($array2))
    ) {
        return false;
    }

    foreach($array1 as $key => $value) {
        if (is_array($value)) {
            if (!isset($array2[$key])) {
                return false;
            } elseif(!is_array($array2[$key])) {
                return false;
            } elseif (!is_same_array($value, $array2[$key])) {
                return false;
            }
        } elseif(!array_key_exists($key, $array2) || $array2[$key] !== $value) {
            return false;
        }
    }

    return true;
}
```

機能としては「ただ同じかどうか判断するだけ」（返り値は ```true``` か `false` のみ）なので。  
参考にしたのが[こちらの関数](http://us3.php.net/manual/ja/function.array-diff-assoc.php#73972)なので、diff取りたい場合はいいかも。

パフォーマンスは悪そうだけど、配列の順番が違ってもチェックできるのがメリットかな・・・
