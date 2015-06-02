---
title: "HTMLのbodyタグにclass名を追加する関数"
slug: "php-add-body-class-function"
date: "2013-01-31T00:00:00+09:00"
description: "HTMLのbodyタグにclass名を付加するのを補助するPHP関数。自動でOSやブラウザ(IEの場合はバージョンまで)の文字列も出力。"
tag: ["CSS", "PHP", "Snippet"]
---

PHPで組んでる時、HTMLのbodyタグに動的にclass名を追加するの面倒だったりしませんか。
いや、たまにあるんです。
フォームの入力画面→確認画面→送信完了画面とか。
そんなときにつかえるやつです。

<!--more-->

```php
<?php
function bodyclass( $name = NULL ){
  static $_buffer = array(), $_browser = array();
	if ( empty( $name ) ) {
		if ( empty( $_browser ) ) {
			$ua = $_SERVER['HTTP_USER_AGENT'];
			if ( ! empty( $ua ) ) {
				// UserAgent(小文字)
				$ua = strtolower( $ua );
				// OSの判定
				if ( preg_match( '/(windows|win32)/i', $ua ) ) {
					$_browser[] = 'win';
				} elseif ( preg_match( '/(macintosh|mac os x)/i', $ua ) ) {
					$_browser[] = 'mac';
				} elseif ( strpos( $ua, 'linux' ) !== false ) {
					$_browser[] = 'linux';
				} elseif ( strpos( $ua, 'iphone' ) !== false ) {
					$_browser[] = 'iphone';
				} elseif ( strpos( $ua, 'ipod' ) !== false ) {
					$_browser[] = 'ipod';
				} elseif ( strpos( $ua, 'ipad' ) !== false ) {
					$_browser[] = 'ipad';
				} elseif ( strpos( $ua, 'android' ) !== false ) {
					$_browser[] = 'android';
					if ( strpos( $ua, 'mobile' ) !== false ) {
						$_browser[] = 'android-mobile';
					}
				} elseif ( strpos( $ua, 'windows phone' ) !== false ) {
					$_browser[] = 'windows-phone';
				} elseif ( strpos( $ua, 'kindle' ) !== false ) {
					$_browser[] = 'kindle';
				}
				// ブラウザの判定
				if( preg_match( '/msie ([0-9]{1,}[\.0-9]{0,})/', $ua, $m ) ){
					$ver = intval( $m[1] );
					$_browser[] = 'ie';
					$_browser[] = 'ie' . intval($ver);
					if( $ver <= 9 ) {
						$_browser[] = 'ielt9';
					}
					if ( $ver <= 8 ) {
						$_browser[] = 'ielt8';
					}
					if ( $ver <= 7 ) {
						$_browser[] = 'ielt7';
					}
					if ( $ver <= 6 ) {
						$_browser[] = 'ielt6';
					}
					if ( $ver <= 5 ) {
						$_browser[] = 'ielt5';
					}
				} elseif ( strpos( $ua, 'chrome' ) !== false ) {
					$_browser[] = 'chrome';
				} elseif ( strpos( $ua, 'firefox' ) !== false ) {
					$_browser[] = 'firefox';
				} elseif ( strpos( $ua, 'safari' ) !== false ) {
					$_browser[] = 'safari';
				} elseif ( strpos( $ua, 'opera' ) !== false ) {
					$_browser[] = 'opera';
				}
			}
			$_buffer = array_merge( $_browser, $_buffer );
		}
		if ( ! empty( $_buffer ) ) {
			$_buffer = array_unique( $_buffer );
			$_buffer = array_merge( array_diff( $_buffer, array( "" ) ) );
			if ( ! empty( $_buffer ) ) {
				sort( $_buffer );
				echo implode( ' ', $_buffer );
			}
		}
	} else {
		$args = func_get_args();
		if ( ! empty( $args[1] ) ) {
			$name = implode( ' ', $args );
		} elseif( is_array( $name ) ) {
			$name = implode( ' ', $name );
		}
		$_buffer = array_merge( $_buffer, explode( ' ', $name ) );
	}
}
?>
```

使い方としては、まずあらかじめHTMLの方に

```html
<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body class="<?php bodyclass(); ?>">
	...contents...
</body>
</html>
```

というふうにbodyタグに仕込んでおきます。
あとは上記が出力される前に

```php
<?php
include('bodyclass.php');
// 引数にclass名を放り込んでいけば、自動でまとめて出力。
bodyclass( 'test' );//普通。
bodyclass( 'test2', 'test3 test4' );//関数は何度呼び出してもOKかつ引数はいくつでも。
bodyclass( array( 'test4', 'test5 test3' ) );//引数は配列でもOK。重複は取り除かれる。
/*
上記の結果は
chrome test test2 test3 test4 test5 win
と出力される。（OSがWindows、ブラウザがChromeの場合）
※IEの場合はバージョンまでつく。
順番は強制的にアルファベット順。（そのほうがページ圧縮率が高いらしい）
*/
?>
```

という感じでいけます。
<a href="https://gist.github.com/4681611" target="_blank" class="btn">Gistにも置いてます</a>
