---
title: "公開日を未来にしても予約投稿にせず強制公開するWordPressプラグイン"
slug: "wordpress-future-post-publish"
date: "2012-12-14T00:00:00+09:00"
description: "公開日を未来にしても予約状態にせず公開したいことがあって。デバッグとかそういうので。ということで必要にかられて作った。"
tag: ["PHP", "WordPress"]
---

公開日を未来にしても予約状態にせず公開したいことがあって。
デバッグとかそういうので。
ということで必要にかられて作った。

<!--more-->

以下のコードを適当なファイル名（文字コードはUTF-8）で保存して「<strong>plugins</strong>」ディレクトリに入れれば、Wordpressの管理画面からプラグインに表示される。
あとはプラグインを有効にすると、記事編集時に右サイドに設定が表示。

<a href="https://gist.github.com/4083991/download" class="btn" target="_blank">ソースをダウンロード(Gistから)</a>

```php
<?php
/*
Plugin Name: Force Publish
Plugin URI: http://kijtra.com/article/27
Description: 公開日が未来の日付でも、強制的に公開状態にします。
Author: kijtra
Version: 1
Author URI: http://kijtra.com
*/
add_action( 'admin_menu', 'force_future_to_publish_add_custom_box' );
function force_future_to_publish_add_custom_box() {
	$box_title = '予約投稿の変更';
	//add_meta_boxがない場合(WP2.5以前)
	if( !function_exists( 'add_meta_box' ) ) {
		add_action( 'dbx_post_advanced', 'force_future_to_publish_metabox_old' );
		add_action( 'dbx_page_advanced', 'force_future_to_publish_metabox_old' );
	} else {
		add_meta_box( 'force_future_to_publish', $box_title, 'force_future_to_publish_metabox', 'news', 'side' );
    add_meta_box( 'force_future_to_publish', $box_title, 'force_future_to_publish_metabox', 'page', 'side' );
		//すべてのカスタム投稿タイプでも有効にする
		foreach( get_post_types( array( 'public' => true, '_builtin' => false ), 'objects' ) as $key => $val ) {
			add_meta_box( 'force_future_to_publish', $box_title, 'force_future_to_publish_metabox', $val->slug, 'side' );
		}
	}
}
// WP2.6以降用
function force_future_to_publish_metabox() {
	global $post;
	if ( strtotime( $post->post_date ) > time() && $post->post_status == 'publish' ) {
		$label = '予約投稿にもどす';
	} else {
		$label = '公開日が未来の日付でも公開';
	}
?>
	<label for="force_future_to_publish_check">
		<input type="checkbox" id="force_future_to_publish_check" name="force_future_to_publish" value="1">
		<span id="force_future_to_publish_label"><?php echo $label; ?></span>
	</label>
<?php
}
// WP2.5以前用
function force_future_to_publish_metabox_old() {
?>
<div class="dbx-b-ox-wrapper">
<fieldset id="force_future_to_publish_fieldsetid" class="dbx-box">
<div class="dbx-h-andle-wrapper">
<h3 class="dbx-handle">強制公開</h3>
</div>
<div class="dbx-c-ontent-wrapper">
<div class="dbx-content">
					<?php force_future_to_publish_metabox(); ?>
				</div>
</div>
</fieldset></div>
<?php
}
add_filter( 'wp_insert_post_data', 'force_future_to_publish_save', '10', '2');
function force_future_to_publish_save( $data, $postarr ) {
	//必要なデータがあるか確認
	if( empty( $_POST['ID'] ) || empty( $_POST['action'] ) || empty( $data['post_status'] ) ){
		return $data;
	}
	//自動保存なら何もしない
	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
		return $data;
	}
	//権限チェック
	if ( 'page' == $_POST['post_type'] ) {
		if ( !current_user_can( 'edit_page', $_POST['ID'] ) ) {
			return $data;
		}
	} else {
		if ( !current_user_can( 'edit_post', $_POST['ID'] ) ) {
			return $data;
		}
	}
	//予約投稿に設定されていれば強制的に公開の設定
	if( $_POST['action'] == 'editpost' ) {
		//チェックボックスにチェックが入っている場合
		if( !empty( $_POST['force_future_to_publish'] ) ){
			if ( $_POST['post_status'] == 'future' ){
				$data['post_status'] = 'publish';
			}
			//予約投稿に戻す場合
			elseif ( $_POST['post_status'] == 'publish' ){
				$data['post_status'] = 'future';
			}
		}
		//チェックボックスにチェックが入っていない場合
		else {
			//旧データがpublishならpublishを維持
			if( $_POST['post_status'] == 'publish' &&  $data['post_status'] = 'future') {
				$data['post_status'] = 'publish';
			}
		}
	}
	return $data;
}
```
