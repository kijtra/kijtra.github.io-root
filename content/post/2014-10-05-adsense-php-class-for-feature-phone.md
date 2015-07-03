---
title: "AdSenseを携帯(フィーチャーフォン/ガラケー/WAP)サイトで使う用のPHPクラス"
slug: "adsense-php-class-for-feature-phone"
date: "2014-10-05T10:30:00+09:00"
description: "携帯サイトでAdSenseを表示したい時、Google公式のコードが使いにくいのでPHPのクラス作っといた。(2014年10月時点)"
tag: ["AdSense", "PHP"]
---

携帯サイトでAdSenseを表示したい時、Google公式のコードが使いにくいのでPHPのクラス作っといた。(2014年10月時点)

<!--more-->

Web上の携帯(フィーチャーフォン/ガラケー)サイト制作の情報って、もうすっかり古いものしか残ってないけど、まだ消滅したわけじゃないので作り続けてるわけです。  
実際、自分が関わってるサイトでは非スマホでフィーチャーフォン/ガラケーのユーザーがまだ約2割もいる！  
業種やコンテンツによってはまだ需要があって、しかもAdSenseのCTRはPCなんかよりはるかに高い(ミスクリックしやすい…？)。  
ということで、携帯(フィーチャーフォン/ガラケー)サイトがあるならばAdSenseを貼らないテはないんだけど、いかんせんGoogle公式のPHP用AdSenseコードがイマイチなので、クラスを作った。

Gogoleでは「WAPブラウザ用広告」という名前にしてるみたい。  
AdSenseのコード改変は違反じゃないのかと思う人もいるかもしれないけど、違反になるのはユーザー体験を損ねたりする場合であって、今回のPHPの場合は[Google自身が外部リソースに頼れと誘導してる](https://support.google.com/adsense/answer/14204?hl=ja)ので問題ないはず。


## まず広告の作成

AdSense管理画面の「[広告の設定](https://www.google.com/adsense/app#myads-viewall-adunits)」に行き、左メニューの「**モバイルコンテンツ**」から広告を作成する。  
すでに広告作ってる場合はそれを使ってもいいかも。  
<a href="https://lh4.googleusercontent.com/-AaQ9gDcHZP4/VDCd6o1vemI/AAAAAAAADck/MDLZhXjp2sY/w496-h277-no/2014-10-05_101554.png" target="_blank"><img class="aligncenter" alt="携帯サイトAdSense用広告の作成" src="https://lh4.googleusercontent.com/-AaQ9gDcHZP4/VDCd6o1vemI/AAAAAAAADck/MDLZhXjp2sY/w496-h277-no/2014-10-05_101554.png" /></a>  

広告作成の際にPHP用のコードが選択できるので、それを選択してコードを生成。  
<a href="https://lh3.googleusercontent.com/-2sCbQH4qoBU/VDCd6h8HvrI/AAAAAAAADcs/F7dpwzXIRFs/w373-h199-no/2014-10-05_101737.png" target="_blank"><img class="aligncenter" alt="PHP用AdSenseコードの生成" src="https://lh3.googleusercontent.com/-2sCbQH4qoBU/VDCd6h8HvrI/AAAAAAAADcs/F7dpwzXIRFs/w373-h199-no/2014-10-05_101737.png" /></a>  

広告のコードが発行されるので、とりあえずメモ帳かなにかにコピペしておく。  
(あとでこのコード内の記述を使用)
<a href="https://lh5.googleusercontent.com/-RXz_kT9KGfQ/VDCd6kulqOI/AAAAAAAADco/3Z-oZmD8wFs/w693-h448-no/2014-10-05_102229.png" target="_blank"><img class="aligncenter" alt="携帯サイト用AdSense広告のコード" src="https://lh5.googleusercontent.com/-RXz_kT9KGfQ/VDCd6kulqOI/AAAAAAAADco/3Z-oZmD8wFs/w693-h448-no/2014-10-05_102229.png" /></a>  


## 携帯サイトAdSense用PHPクラスのコード

以下のコードをどこかに配置。  
[<i class="icon-github"></i> Gistにもあり(最新)](https://gist.github.com/kijtra/4f7b49f9c466a95463c8#file-adsense_for_keitai-php)  
10行目の「**ca-mb-pub-XXXXXXXXXXXXXXX**」には、AdSenseコードにある「```$GLOBALS['google']['client']```」の値を入れておく。  

```php
<?php

class adsenseForKeitai
{
	private $ad_url = 'http://pagead2.googlesyndication.com/pagead/ads';
	private $timeout = 3;//second

	private $params = array(
		'slot' => null,
		'client' => 'ca-mb-pub-XXXXXXXXXXXXXXX',

		'ad_type' => 'text_image',
		'format' => 'mobile_single',
		'markup' => 'xhtml',
		'output' => 'xhtml',
		'oe' => 'utf8',

		'https' => false,
		'ip' => null,
		'ref' => null,
		'url' => null,
		'useragent' => null,

		'color_border' => 'FFFFFF',
		'color_bg' => 'FFFFFF',
		'color_link' => '0053F9',
		'color_text' => '000000',
		'color_url' => '828282',
	);

	public function __construct($slot = null, $charset = 'utf8')
	{
		$this->params['slotname'] = $slot;
		$this->params['oe'] = $charset;

		$this->params['ip'] = $_SERVER['REMOTE_ADDR'];
		$this->params['useragent'] = (!empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null);
		$this->params['ref'] = (!empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null);
		$this->params['url'] = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

		if (
			(!empty($_SERVER['HTTPS']) && ('on' == strtolower($_SERVER['HTTPS']) || '1' == strtolower($_SERVER['HTTPS'])))
			|| (!empty($_SERVER['SERVER_PORT']) && (443 === (int)$_SERVER['SERVER_PORT'])
		)) {
			$this->params['https'] = true;
		}

		$this->params['dt'] = time();

		// Screen Resolutions
		$res = null;
		if (!empty($_SERVER['HTTP_UA_PIXELS'])) {
			$res = $_SERVER['HTTP_UA_PIXELS'];
		} elseif(!empty($_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'])) {
			$res = $_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'];
		} elseif(!empty($_SERVER['HTTP_X_JPHONE_DISPLAY'])) {
			$res = $_SERVER['HTTP_X_JPHONE_DISPLAY'];
		}

		if (!empty($res) && preg_match('/\A(\d+)[x,\*](\d+)\z/', $res, $match)) {
			$this->params['u_w'] = $match[1];
			$this->params['u_h'] = $match[2];
		}

		// MUID
		if (!empty($_SERVER['HTTP_X_DCMGUID'])) {
			$this->params['muid'] = $_SERVER['HTTP_X_DCMGUID'];
		} elseif(!empty($_SERVER['HTTP_X_UP_SUBNO'])) {
			$this->params['muid'] = $_SERVER['HTTP_X_UP_SUBNO'];
		} elseif(!empty($_SERVER['HTTP_X_JPHONE_UID'])) {
			$this->params['muid'] = $_SERVER['HTTP_X_JPHONE_UID'];
		} elseif(!empty($_SERVER['HTTP_X_EM_UID'])) {
			$this->params['muid'] = $_SERVER['HTTP_X_EM_UID'];
		}

		// Via and Accept
		if (!empty($_SERVER['HTTP_VIA'])) {
			$this->params['via'] = $_SERVER['HTTP_VIA'];
		}

		// Accept
		if (!empty($_SERVER['HTTP_ACCEPT'])) {
			$this->params['accept'] = $_SERVER['HTTP_ACCEPT'];
		}
	}

	public function client($id = null)
	{
		if (!empty($id) && false !== strpos($id, 'pub-')) {
			$this->params['client'] = $id;
		}

		return $this;
	}

	public function slot($id = null)
	{
		if (!empty($id) && ctype_digit(strval($id))) {
			$this->params['slotname'] = $id;
		}

		return $this;
	}

	public function param($param = null)
	{
		if (!empty($param) && is_array($param)) {
			$this->params = array_merge($this->params, $param);
		}

		return $this;
	}

	public function color() {return $this->colors();}//alias
	public function colors($param = null)
	{
		if (!empty($param) && is_array($param)) {
			foreach($param as $key => $val) {
				$val = str_replace('#', '', $val);
				if (!preg_match('/\A[a-f0-9]{6}\z/i', $val)) {
					if (preg_match('/\A([a-f0-9])([a-f0-9])([a-f0-9])\z/i', $val, $m)) {
						$val = $m[1].$m[1].$m[2].$m[2].$m[3].$m[3];
					} else {
						continue;
					}
				}
				if (0 !== strpos($key, 'color_')) {
					$key = 'color_'.$key;
				}

				$this->params[$key] = strtoupper($val);
			}
		}

		return $this;
	}

	private function request()
	{
		static $buffer = null;
		if (!empty($buffer)) {
			return $buffer;
		}

		if (empty($this->params['client']) || empty($this->params['slotname'])) {
			return false;
		}

		if (0 !== strpos($this->params['client'], 'ca-')) {
			$this->params['client'] = 'ca-mb-'.$this->params['client'];
		}

		$url = $this->ad_url.'?'.http_build_query($this->params);
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $this->timeout);
		//curl_setopt($ch, CURLOPT_HEADER, true);
		$content = curl_exec($ch);
		curl_close($ch);

		if (!empty($content)) {
			return $buffer = $content;
		}
	}

	public function get()
	{
		return $this->request();
	}

	public function show()
	{
		echo $this->request();
	}
}
```



## 表示する

広告を表示したい箇所に、以下のようなコードを書く。  

```php
<?php
// クラス作成
$class = new adsenseForKeitai();

//スロットIDを指定して表示
$class->slot('XXXXXXXXXXXXXXX')->show();
?>
```  

`slot('XXXXXXXXXXXXXXX')` の部分は、  
AdSenseコードにある `$GLOBALS['google']['slotname']` の値を入れる(数字のみ)。  

`show()` は出力も兼ねてるので、 `echo` を書く必要はなし。  
(echoしたくない場合のために一応 `get()` というのも用意してある)  

もし広告のリンクとかテキストとかの色を変えたい場合は以下のようなこともできる。  

```php
<?php
// クラス作成
$class = new adsenseForKeitai();

// 広告の色設定(指定できるのは以下の5種類のみっぽい)
$color = array(
    'border' => 'FFFFFF',// 枠線の色
	'bg' => 'FFFFFF',// 背景色
	'link' => '0053F9',// リンク(タイトル)の色
	'text' => '000000',// 通常テキスト色
	'url' => '828282',// URL部分の色(携帯用は関係ないかも)
);

//スロットIDを指定して、色をセットして表示
$class->slot('XXXXXXXXXXXXXXX')->color($color)->show();
?>
```  

## 関連情報

- [モバイル用AdSenseのヘルプ](https://support.google.com/adsense/answer/68724?ctx=as2&rd=1)
- [AdSenseモバイル広告の種類とサイズ](https://support.google.com/adsense/answer/185668?hl=ja)
- [AdSense 広告コードの改変について](https://support.google.com/adsense/answer/1354736?hl=ja)
