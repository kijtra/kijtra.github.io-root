---
title: "Sublime Text 3 のインストール～設定メモ"
slug: "sublime-text-3-install-and-settings"
date: "2014-07-04T12:07:00+09:00"
description: "Sublime Text 3 のインストールから基本設定、各プラグイン導入までの個人的メモ"
tag: ["Sublime Text", "Editor"]
---

Sublime Text 3 のインストールから基本設定、各プラグイン導入までの個人的メモ。

<!--more-->

## 開発バージョンをダウンロード

巷では Sublime Text の [バージョン2](http://www.sublimetext.com/2) を使っている人が多いようだけど、バージョン **3** を使う。  
バージョン3の方が起動など動作が速く、サイドバーのファイルアイコン(あとで「テーマ」の部分で紹介)に対応してる。  

現時点(2014/07/05)では Build 3062 が最新だった。  

**[Sublime Text Dev Builds](http://www.sublimetext.com/3dev)** http://www.sublimetext.com/3dev  

ちなみに Portable Version を Dropbox に入れて使ってる。

## まずは「Package Control」をインストール
Sublime Text をはじめて起動したら、まずはこれを入れる。  
**[Package Control](https://sublime.wbond.net/)** https://sublime.wbond.net/  

インストール手順は、Sublime Text を起動し、<kbd>Ctrl</kbd> + <kbd>`</kbd>(<kbd>@</kbd>キー) を押してコンソールを表示させ、公式コードをそのままコピー＆ペーストして <kbd>Enter</kbd>。  
コピーするコードは [ここのページのもの(「SUBLIME TEXT 3」のタブ内)を使用する](https://sublime.wbond.net/installation) 。  
※上記ページに「コードの再配布はするな」と書いてあるのでここには書けない


## プラグイン

プラグインはなるべく Package Control で入れられるものに限定したい。  
各プラグインのインストールは、 Sublime Text 起動時に　<kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>P</kbd> でコマンドリストを表示させ、「Package Control: Install Package」を探して <kbd>Enter</kbd>。  
コマンドリストの検索窓に「 <span style="font-family:serif">**I**</span> 」を入力して、そこから探して <kbd>Enter</kbd> しておくと、次回からは「<span style="font-family:serif">I</span>」検索で「Package Control: Install Package」が最初に出るのでなるべくやっておく。  
「Package Control: Install Package」を <kbd>Enter</kbd> したら Package Control のサーバーから一覧が読み込まれるので、以下の各プラグイン名で検索して <kbd>Enter</kbd> するとインストールされる。


### おすすめ系

- **[Emmet](https://sublime.wbond.net/packages/Emmet)**  
  [Zen Coding](https://code.google.com/p/zen-coding/) の進化系。コーディングする人は必須で覚えた方がいい。

- **[SidebarEnhancements](https://sublime.wbond.net/packages/SideBarEnhancements)**  
  Sublime Text のサイドバーでの右クリック項目を拡張してくれる。  
  例えば「このファイルを指定のアプリケーションで開く(Open With...)」とか「実行する(Open/Run)」とか、デフォルトでは付いていないので。

- **[ConvertToUTF8](https://sublime.wbond.net/packages/ConvertToUTF8)**  
  マルチバイト文字が含まれるファイルをUTF8に変換して表示。  
  デフォルトでは Shift-JIS とか文字化けしたりするので、とりあえず入れておく。  
  絶対に UTF-8 しか扱わない自信があればいらないかも。

- **[BracketHighlighter](https://sublime.wbond.net/packages/BracketHighlighter)**  
  HTMLの開始タグ～終了タグや、コードのカッコのペアをわかりやすく表示してくれる。  
  この終了タグってどのdivだ？みたいなのに無駄な時間を取られないようにしたい。

- **[IMESupport](https://sublime.wbond.net/packages/IMESupport)**  
  Windowsのみ。 Sublime Text デフォルト状態では日本語入力変換がウインドウ左下の方に表示されるため視点が定まらないけど、これを入れるとキャレットの部分で表示されて便利。

- **[SFTP](https://sublime.wbond.net/packages/SFTP)**  
  Sublime Text 単体で(S)FTPできるプラグイン。有料($20)だけど、度々出る警告を無視できるならとりあえずは無料で使い続けられる(機能の制限は特に無い)。
  SFTPと公開鍵認証に対応してるのはこのプラグインぐらいしかないので、自己投資と思って買ってしまうのがおすすめ。

- **[Sublime​Linter](https://sublime.wbond.net/packages/SublimeLinter)**  
  コードの間違いを警告してくれるプラグイン。言語ごとに Sublime​Linter プラグインがあって、これはその基板となるプラグインなので入れておく。  
  言語ごとのものは [検索すると希望のものが見つかるはず](https://sublime.wbond.net/search/SublimeLinter)。


### 個人的に必要系

- **[Diffy](https://sublime.wbond.net/packages/Diffy)**  
  2つのファイルの差分を表示してくれるプラグイン。  
  Sublime Text で <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>2</kbd>(<kbd>"</kbd>) を押してウインドウを分割して比較したいファイルを開き、<kbd>Ctrl</kbd> + <kbd>K</kbd> + <kbd>D</kbd>で差分がハイライトされる。

- **[ApacheConf.tmLanguage](https://sublime.wbond.net/packages/ApacheConf.tmLanguage)**  
  Apache系の .conf ファイルや .htaccess なんかをシンタックスハイライトしてくれるプラグイン。

- **[Git](https://sublime.wbond.net/packages/Git)**  
  コマンドウインドウからGit系コマンドが実行できる。  
  単体で動くものではなく、 [Git](http://git-scm.com/) 自体がインストールされていて、かつパスが通ってる必要がある。  
  コミット時のコメントがわかりにくい。コミットコマンドを打つと Sublime Text で新規タブが開くので、その一番上にコメントを書いて「保存せずタブを閉じる」。  
  ちなみに日本語でコメントすると動かないので注意。

- **[Omni​Markup​Previewer](https://sublime.wbond.net/packages/OmniMarkupPreviewer)**  
  Markdown をブラウザでリアルタイムプレビューしてくれるプラグイン。Markdown をHTMLに変換できたりもする。  
  このブログは Markdown で書いており、プレビュー具合もいい(特にコード部分のシンタックスハイライトとか)ので個人的に便利。  
  ちなみに Sublime Text はデフォルトで Markdown をシンタックスハイライトしてくれないので、別途カラースキーマをインストールする必要がある(「テーマ」の部分で紹介)。

- **[LESS](https://sublime.wbond.net/packages/LESS)**  
  LESSファイルのシンタックスハイライト用プラグイン。  
  SASSよりLESSの方が使う頻度が高いので。


上記以外は状況によって。  
[Vagrant](https://sublime.wbond.net/packages/Vagrant) とか [Compass](https://sublime.wbond.net/packages/Compass) とか [Terminal](https://sublime.wbond.net/packages/Terminal) とかは便利かも。


## 追加設定

[こちらのページ](http://brdr-mmrndm.tumblr.com/post/80456872825/sublime-text)にあるように、
メニューの「Preferences -> Settings - User」を開いて、 `draw_indent_guides`、 `indent_guide_options`、 `match_brackets` の設定を追記するとさらに見やすくなる。  
また、そのほか上からデフォルトでない設定。

- `"font_face": "Consolas"`  
  個人的にフォントは Consolas にしてる
- `"bold_folder_labels": true`  
  サイドバーのフォルダ名を太字にして区別しやすくする
- `"word_wrap": true`  
  ウインドウの端で折り返す
- `"preview_on_click": false`  
  サイドバーでのファイルクリック時にいちいちファイルが開く動作が困る(大きいファイルなど)のでオフに
- `"highlight_line": true`  
  編集してる行をハイライトする
- `"draw_white_space": "all"`
  常に半角スペースを「・」で表示(デフォルトはテキスト選択時のみ)
- `"atomic_save": true`  
  保存時に一時ファイルを使う(?)ような機能みたいだけど、他のアプリケーションで同時に開けなかったりするのでオフに

```json
{
	"draw_indent_guides": true,
	"indent_guide_options": ["draw_normal", "draw_active"],
	"match_brackets": false,

	"font_face": "Consolas",
	"bold_folder_labels": true,
	"word_wrap": true,
	"preview_on_click": false,
	"highlight_line": true,
	"draw_white_space": "all",
	"atomic_save": true
}
```



## テーマ

去年あたりからコード書く場合はダーク系テーマが見やすいと気づいた。  
Sublime Text は「テーマ」が枠のデザイン(サイドバーとかタブとか)で、「カラースキーマ」は入力部分の見た目となっていて、それぞれ違うものが使えるので好みによって。  
<a href="https://lh5.googleusercontent.com/-niyXuM4iVM0/U7YOktcwN7I/AAAAAAAADbE/jJ8Pr9ooV2s/w232-h190-no/2014-07-04_111638.png" target="_blank"><img src="https://lh5.googleusercontent.com/-niyXuM4iVM0/U7YOktcwN7I/AAAAAAAADbE/jJ8Pr9ooV2s/w232-h190-no/2014-07-04_111638.png" align="right" hspace="10" alt="Sublime Text のファイルアイコン"></a> テーマでは [Flatland](https://sublime.wbond.net/packages/Theme%20-%20Flatland) とか [Soda](https://sublime.wbond.net/packages/Theme%20-%20Soda) とかがカッコいいので人気みたいだけど、  
個人的に「ファイルアイコン」が表示できるものを必要条件としているため、以下のテーマを使ってる。  

**[Aprosopo](https://sublime.wbond.net/packages/Theme%20-%20Aprosopo)**

ファイルアイコンというのは Sublime Text 3 の 開発版 Build 3062 から導入されたもので、これまでサイドバーのアイコンはフォルダにしか表示されなかったけど、各ファイルにもアイコンが表示できるようになった機能。  
拡張子ごとにアイコンが変わったりするので見やすくなる。  
これまでフォルダとファイルの階層のインデントが少しわかりにくくて誤操作も多かったんだけど、この機能で解消された。  
前述した Flatland とか Soda とかはまだこの機能に対応してないのが惜しい。  

Aprosopo はダークテーマとライトテーマがあって、しかも設定が Preferences メニューから簡単に変えられる(いちいち設定ファイルに書かなくてもいい)ので気に入ってる。


## カラースキーマ

これは完全に好みや気分。  
いまは **[Cobalt2](https://sublime.wbond.net/packages/Theme%20-%20Cobalt2)** の背景色をカスタマイズしたものを使ってる。  
Cobalt2 は Markdown にも対応してて、PHP なんかも見やすい。(リンク先で見た目のキャプチャ見れます)  
ちなみに色のカスタマイズは [Color​Scheme​Editor](https://sublime.wbond.net/packages/ColorSchemeEditor) を使うと手軽に変更できる。  
(しょっちゅう使うものでもないのでプラグインで紹介してない)  

気分でよく変える人なんかは [Dayle Rees Color Schemes](https://sublime.wbond.net/packages/Dayle%20Rees%20Color%20Schemes) のプラグインが便利。  
このプラグインはインストールすると [たくさんのカラースキーマ](http://daylerees.github.io/) が一括インストールされるので、好みのものが見つかるはず。
