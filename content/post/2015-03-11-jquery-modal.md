---
title: "モーダル用jQueryプラグインをつくった"
slug: "jquery-modal"
date: "2015-03-11T00:20:00+09:00"
description: "なかなか理想のモーダル用スクリプトが見つからなかったので勉強を兼ねて作ってみた。なるべく実用的なものにしたつもり・・・。"
tag: ["jQuery"]
---

なかなか理想のモーダル用スクリプトが見つからなかったので勉強を兼ねて作ってみた。  
なるべく実用的なものにしたつもり・・・。  

<!--more-->

[ソースは Github にあり〼。](https://github.com/kijtra/modaled)
<iframe src="https://ghbtns.com/github-btn.html?user=kijtra&repo=modaled&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px" style="margin:0 0 0 10px;vertical-align:middle;"></iframe>


## 使用例 (examples)

### <a href="#demo1" class="modaled">インライン要素 (inline)</a>

<div id="demo1" style="display:none">
	インライン要素の内容です。<br>
	&lt;a&gt;タグの href と同じIDを持つ要素が表示されます。<br>
	また、&lt;a&gt;タグに href="#close" を指定したリンクは閉じるボタンになります。<br>
	<a href="#close">CLOSE</a>
</div>

```html
<!-- 発火するリンク -->
<a href="#demo1" class="modaled">インライン要素 (inline)</a>

<!-- 表示する内容 -->
<div id="demo1" style="display:none">
	...
</div>

<!-- スクリプト -->
<script>
$('.modaled').modaled();
</script>
```

-----

### <a href="/static/jquery-modal/demo2.html" class="modaled" rel="nofollow">別ページ ※同ドメイン内のみ (ajax)</a>

```html
<!-- 発火するリンク -->
<a href="/static/jquery-modal/demo2.html" class="modaled">別ページ ※同ドメイン内のみ (ajax)<</a>

<!-- スクリプト -->
<script>
$('.modaled').modaled();
</script>
```

-----

### <a href="http://i.giphy.com/fz9wCNZeff5yU.gif" class="modaled" rel="nofollow">画像 ※別ドメイン可 (image)</a>

```html
<!-- 発火するリンク -->
<a href="http://i.giphy.com/fz9wCNZeff5yU.gif" class="modaled">画像 ※別ドメイン可 (image)</a>

<!-- スクリプト -->
<script>
$('.modaled').modaled();
</script>
```

-----

### <a href="#demo4" class="modaled">内容切り替え (other modal)</a>

<div id="demo4" style="display:none">
	読み込んだモーダルの &lt;a&gt;タグにも適用されます。<br>
	NEXT : <a href="/static/jquery-modal/demo4.html" class="modaled">demo4.html</a>
</div>

```html
<!-- 発火するリンク -->
<a href="#demo4" class="modaled">内容切り替え (other modal)</a>

<!-- 表示する内容 -->
<div id="demo4" style="display:none">
	...
	NEXT : <a href="/static/jquery-modal/demo4.html" class="modaled">demo4.html</a>
</div>

<!-- スクリプト -->
<script>
$('.modaled').modaled();
</script>
```

-----

### <a href="#demo5">モーダル内のヘッダ・フッタ (header and footer)</a>

<div id="demo5" style="display:none">
	初期状態では全くデザインされていないので、自分でデザインする必要があります。<br>
	デフォルトではヘッダには「header」、<br>
	フッタには「footer」というclass名がついています。<br>
	※クラス名は設定で変更できます。
</div>

```html
<!-- 発火するリンク -->
<a href="#demo5">モーダル内のヘッダ・フッタ (header and footer)</a>

<!-- 表示する内容 -->
<div id="demo5" style="display:none">
	...
</div>

<!-- スクリプト -->
<script>
$('a[href="#demo5"]').modaled({
	header: '<i>ヘッダです (header)</i>',
	footer: '<i>フッタです (footer)</i>　<a href="#close">CLOSE</a>',
	headerClass: 'ヘッダのclass名',
	footerClass: 'フッタのclass名'
});
</script>

<!-- または、やや強引ですが表示する内容の data-* 属性に直接設定を書くこともできます -->
<div id="demo5" style="display:none" data-header="<i>ヘッダです (header)</i>" data-footer="<i>フッタです (footer)</i>">
	...
</div>
```

-----

### <a href="#demo6-1">アニメーション例1 (animation example 1)</a>

<div id="demo6-1" style="display:none">
	アニメーションは設定で指定できます。<br>
	これは以下のように指定した例です。
<pre class="highlight json">{
    acShow : 'bounceIn',
    acHide : 'bounceOut'
}</pre>
	<a href="#close">CLOSE</a>
</div>

### <a href="#demo6-2" data-ac-show="rotateIn" data-ac-hide="hinge">アニメーション例2 (animation example 2)</a>

<div id="demo6-2" style="display:none">
	これはリンク自体に data-* 属性を使って指定しています。<br>
	表示対象の &lt;div&gt; 等の方に data-* 属性で指定することもできます。<br>
	<a href="#close">CLOSE</a>
</div>

**アニメーションには <a href="http://daneden.github.io/animate.css/" target="_blank">Animate.css</a> が必要です**。  
Animate.cssが読み込まれていれば自動的にアニメーション表示になります。


```html
<!-- Animate.cssの読み込み -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.1/animate.min.css">

<!-- 発火するリンク -->
<a href="#demo6-1">アニメーション例1 (animation example 1)</a>

<!-- 表示する内容 -->
<div id="demo6-1" style="display:none">
	...
</div>

<a href="#demo6-2" data-ac-show="rotateIn" data-ac-hide="hinge">アニメーション例2 (animation example 2)</a>

<div id="demo6-2" style="display:none">
	...
</div>

<!-- スクリプト -->
<script>
$('a[href="#demo6-1"]').modaled({
	acShow: 'bounceIn',
	acHide: 'bounceOut'
});

$('a[href="#demo6-2"]').modaled();
</script>
```

-----

### <a href="#demo7">デザイン例 (design example)</a>

<div id="demo7" style="display:none">
	すこしデザインした例です。<br>
	基本的にはデザインは自分でやる方向です。<br>
	<a href="http://getbootstrap.com/" target="_blank">Bootstrap</a> 等を使っている場合は class名が衝突したりするのでご注意ください。
</div>

```html
<!-- 発火するリンク -->
<a href="#demo7">デザイン例 (design example)</a>

<!-- 表示する内容 -->
<div id="demo7" style="display:none">
	...
</div>
<!-- スクリプト -->
<script>
$('a[href="#demo7"]').modaled({
	header: '<h3><i class="fa fa-leaf"></i> デザイン例</h3><a href="#close">&times;</a>',
	footer: '<a href="#close"><i class="fa fa-check-circle"></i> 閉じる</a>',
	containerClass: 'my-modal',
	headerClass: 'my-header',
	footerClass: 'my-footer',
	contentClass: 'my-content',
});
</script>
```

-----

### <a href="#demo8-1" class="modaled">オーバーレイのクリックで閉じさせない (disable overlay click)</a>

<div id="demo8-1" style="display:none" data-overlay-hide-disable="true">
	オーバーレイをクリックしても閉じさせない形式です。<br>
	必ずリンクをクリックさせたい場合等に使えるかもしれません。<br>
	また、この次に表示されるモーダルでは自動で閉じる設定がされています。<br>
	<br>
	<div style="text-align:center;font-weight:bold;"><a href="#demo8-2" class="modaled">OK!</a></div>
</div>

<div id="demo8-2" style="display:none" data-auto-hide="2000">
	ありがとうございます！<br>
	※自動で閉じます (auto hide after 2000ms)
</div>

```html
<!-- 発火するリンク -->
<a href="#demo8-1" class="modaled">オーバーレイのクリックで閉じさせない (disable overlay click)</a>

<!-- 表示する内容1 -->
<div id="demo8-1" style="display:none" data-overlay-hide-disable="true">
	...
</div>

<!-- 表示する内容2（クリック後） -->
<div id="demo8-2" style="display:none" data-auto-hide="2000">
	...
</div>

<!-- スクリプト -->
<script>
$('.modaled').modaled();
</script>
```

-----

### ダイナミック表示 (dynamic open)

最初に表示されたものです。

```html
<!-- スクリプト -->
<script>
$.modaled('Welcome!<br>これはモーダルの見本です。<br><a href="#close">CLOSE</a>');
</script>
```


## 特徴 (feature)

- IE8+
- レスポンシブ
- <a href="http://daneden.github.io/animate.css/" target="_blank">Animate.css</a> 対応
- ダイナミック表示対応


## オプション (options)

- `header` - default: empty  
  ヘッダ用HTML
- `footer` - default: empty  
  フッタ用HTML
- `containerClass` - default: 'modal-container'  
  表示モーダル全体を包む&lt;div&gt;のclass名
- `headerClass` - default: empty  
  ヘッダのclass名（ヘッダがある場合）
- `footerClass` - default: empty  
  フッタのclass名（フッタがある場合）
- `contentClass` - default: empty  
  表示コンテンツ部分のclass名
- `overlayHideDisable` - default: false  
  オーバーレイクリックで閉じさせないかどうか
- `overlayOpacity` - default: 0.2  
  オーバーレイの透明度
- `autoHide` - default: 0  
  自動で閉じる場合のミリ秒（ms）
- `preload` - default: false  
  リンクコンテンツの場合に先読みするかどうか
- `acShow` - default: 'fadeInDown'  
  モーダル表示時のアニメーションclass名（Animate.css）
- `acHide` - default: 'fadeOutDown'  
  モーダルを閉じる時のアニメーションclass名（Animate.css）
- `acChangeHide` - default: 'flipOutY'  
  モーダル切り替え時に非表示にするアニメーションclass名（Animate.css）
- `acChangeShow` - default: 'flipInY'  
  モーダル切り替え時に表示するアニメーションclass名（Animate.css）
- `acSpinShow` - default: 'zoomIn'  
  読み込み中（loading）表示するアニメーションclass名（Animate.css）
- `acSpinHide` - default: 'zoomOut'  
  読み込み中（loading）を非表示にするアニメーションclass名（Animate.css）
- `acOverlayHideDisable` - default: 'wobble'  
  オーバーレイクリック拒否時のアニメーションclass名（Animate.css）
- `beforeShow` - default: null  
  モーダル表示直前に実行される関数
- `afterShow` - default: null  
  モーダル表示直後に実行される関数
- `beforeClose` - default: null  
  モーダル非表示直前に実行される関数
- `afterClose` - default: null  
  モーダル非表示直後に実行される関数

デフォルトオプションの設定方法は以下です。

```js
$.modaled.defaults({
	header: '<div class=" ...',
	overlayOpacity: 0.3,
	beforeShow: function(content, option) {
		...
	}
	...
});
```
