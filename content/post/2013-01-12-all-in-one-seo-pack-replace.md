---
title: "All in One SEO Pack の設定で使えるタグ一覧"
slug: "all-in-one-seo-pack-replace"
date: "2013-01-12T00:00:00+09:00"
description: "WordPressのプラグイン All in One SEO Pack で「%blog_title%」とかの置換タグの一覧。"
tag: ["SEO", "WordPress"]
---

WordPressのプラグイン「<a href="http://wordpress.org/extend/plugins/all-in-one-seo-pack/" target="_blank">All in One SEO Pack</a>」、SEOやるうえでとても便利。<br />
で、ページタイトルとかを専用タグで置換できるんだけど、どんなタグが使えるのかわからなかったので、プラグインのソース見て一覧をメモ。

<!--more-->

# ページタイトル

<table>
<tr class="thead">
<th colspan="2">ページ送り（is_paged）</th>
</tr>
<tr>
<th>ページ番号</th>
<td>%page%</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">投稿記事ページ(is_single)</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>記事タイトル</th>
<td>%post_title%</td>
</tr>
<tr>
<th>カテゴリ名</th>
<td>%category%</td>
</tr>
<tr>
<th>投稿者のユーザー名</th>
<td>%post_author_login%</td>
</tr>
<tr>
<th>投稿者のニックネーム</th>
<td>%post_author_nicename%</td>
</tr>
<tr>
<th>投稿者の姓</th>
<td>%post_author_firstname%</td>
</tr>
<tr>
<th>投稿者の名</th>
<td>%post_author_lastname%</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">固定ページ（is_page）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>ページタイトル</th>
<td>%page_title%</td>
</tr>
<tr>
<th>投稿者のユーザー名</th>
<td>%post_author_login%</td>
</tr>
<tr>
<th>投稿者のニックネーム</th>
<td>%post_author_nicename%</td>
</tr>
<tr>
<th>投稿者の姓</th>
<td>%post_author_firstname%</td>
</tr>
<tr>
<th>投稿者の名</th>
<td>%post_author_lastname%</td>
</tr>
<tr class="tfoot">
<td colspan="2">※複数ページならタイトル末尾に「ページ送り」で設定した文字が追加<br>※フロントページに設定されていると無効（「ホームタイトル」のものを表示）</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">検索ページ（is_search）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>検索語</th>
<td>%search%</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">カテゴリページ（is_category）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>カテゴリ名</th>
<td>%category_title%</td>
</tr>
<tr>
<th>カテゴリ概要文</th>
<td>%category_description%</td>
</tr>
<tr class="tfoot">
<td colspan="2">※複数ページならタイトル末尾に「ページ送り」で設定した文字が追加<br>※フィードでは無効</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">タグページ（is_tag）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>タグ名</th>
<td>%tag%</td>
</tr>
<tr class="tfoot">
<td colspan="2">※複数ページならタイトル末尾に「ページ送り」で設定した文字が追加</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">アーカイブページ（is_archive）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>日付（年、月、日など）</th>
<td>%date%</td>
</tr>
<tr class="tfoot">
<td colspan="2">※複数ページならタイトル末尾に「ページ送り」で設定した文字が追加</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">404エラーページ（is_404）</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>リクエストURL</th>
<td>%request_url%</td>
</tr>
<tr>
<th>URLから生成した英単語</th>
<td>%request_words%</td>
</tr>
<tr>
<th>ページタイトル（wp_title('', false)）</th>
<td>%404_title%</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">メディア（is_attachment）</th>
</tr>
<tr class="tfoot">
<td colspan="2">なし</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">ホーム（is_home）</th>
</tr>
<tr class="tfoot">
<td colspan="2">なし（「ホームタイトル」に入力されていればそれを表示）<br>※複数ページならタイトル末尾に「ページ送り」で設定した文字が追加</td>
</tr>
</table>


# メタタグ

<table>
<tr class="thead">
<th colspan="2">metaディスクリプション</th>
</tr>
<tr>
<th>ブログタイトル</th>
<td>%blog_title%</td>
</tr>
<tr>
<th>ブログ説明文</th>
<td>%blog_description%</td>
</tr>
<tr>
<th>抜粋</th>
<td>%description%</td>
</tr>
<tr>
<th>記事タイトル</th>
<td>%wp_title%</td>
</tr>
<tr class="thead">
<th colspan="2" style="padding-top:20px">metaキーワード</th>
</tr>
<tr class="tfoot">
<td colspan="2">なし</td>
</tr>
</table>
