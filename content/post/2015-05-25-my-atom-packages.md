---
title: "いま入れてるAtomプラグイン（パッケージ）メモ（2015年5月）"
slug: "my-atom-packages"
date: "2015-05-25T23:00:00+09:00"
description: "最近はSublime Textと併用してAtomもわりと使っていて、プラグイン（パッケージ）探しが落ち着いてきたのでメモしておく。"
tag: ["Atom"]
---

最近はSublime Textと併用してAtomもわりと使っていて、プラグイン（パッケージ）探しが落ち着いてきたのでメモしておく。

<!--more-->

基本的にWeb系＋PHPの開発が多いのと、環境がWindowsなので、そのような傾向にある。

- **[emmet](https://atom.io/packages/emmet)**  
  HTML等を簡単な記述でコーディングできるプラグイン。  
  他のエディタもすべて必ず入れてる。
- **[minimap](https://atom.io/packages/minimap)**  
  エディタの横にファイルの全体像を表示する。スクロールバー代わりに便利。
- **[japanese-wrap](https://atom.io/packages/japanese-wrap)**  
  日本語の文章がウインドウの端で改行されるようにする。Atomのv0.201.0時点でも公式対応されていないので必要。
- **[atom-color-highlight](https://atom.io/packages/atom-color-highlight)**  
  コード中のCSSカラーっぽい文字を検出して背景にその色を表示してくれる。  
  Sublime Textの[Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)が便利だったので同等のものを。  
  ![](https://i.github-camo.com/c3aaeeee1875bec435e468f58357becbac26367a/68747470733a2f2f7261772e6769746875622e636f6d2f61626533332f61746f6d2d636f6c6f722d686967686c696768742f6d61737465722f61746f6d2d636f6c6f722d686967686c696768742d7661726961626c65732e676966)
- **[project-manager](https://atom.io/packages/project-manager)**  
  プロジェクトを管理するプラグイン。デフォルト機能にしてほしい。
- **[open-last-project](https://atom.io/packages/open-last-project)**  
  Atom起動時、最後に開いていたプロジェクトを開くプラグイン。
- **[atom-terminal](https://atom.io/packages/atom-terminal)**  
  いま開いているプロジェクトのディレクトリでターミナル系アプリを起動するプラグイン。  
  ちなみに個人的に[ConEmu](https://conemu.github.io/)でGit Bashをメインに使っている。
- **[linter](https://atom.io/packages/linter)**  
  コードのリアルタイムエラー検出。これ単体では意味がなく、以下のように言語ごとに用意する。
  - [linter-jshint](https://atom.io/packages/linter-jshint) JavaScript用。
  - [linter-less](https://atom.io/packages/linter-less) LESS用。
  - [linter-php](https://atom.io/packages/linter-php) PHP用。
- **[chary-tree-view](https://atom.io/packages/chary-tree-view)**  
  左サイドのファイルツリーで、シングルクリックのプレビューを表示しないプラグイン。  
  Atomではファイルツリーのシングルクリックでプレビューとして開く仕様になっているけど、個人的にこれがけっこうストレスで、Minifyされたファイルや巨大ファイル（2MBの制限はあるけど）をクリックしてしまうとAtomがフリーズすることがちょこちょこあった。（流行りなのか、他のエディタでもそういう傾向があるみたい）  
  オフにしたくて[StackOverflowで質問してみた](http://ja.stackoverflow.com/q/10485/3876)ところ、心優しい人が速攻で作ってくれたもの。有り難し。
- **[git-plus](https://atom.io/packages/git-plus)**  
  ターミナル系アプリを使わなくてもGitコマンドを使えるプラグイン。
- **[git-control](https://atom.io/packages/git-control)**  
  GitをGUIで操作するプラグイン。簡易[SourceTree](https://www.sourcetreeapp.com/)のようなもの。  
  基本的にGitの状態をざっと確認するのに使ってる。  
  ![](https://i.github-camo.com/e35620a073ae64498e9dbff837aa273d3dcb263d/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6a61636f67722f61746f6d2d6769742d636f6e74726f6c2f6d61737465722f73637265656e73686f74732f6769742d30312e706e67)
- **[less-autocompile](https://atom.io/packages/less-autocompile)**  
  LESSファイルの保存時にCSSにコンパイルする。（npmでlessをインストールしておく必要あり）  
  個人的にSASSやSCSSよりLESSを使うことが多いので。  
  このプラグインはファイル監視系ではなく、.lessファイルの1行目に出力先ファイル名や圧縮有無、ソースマップ有無などをコメントとして書くだけなので手軽で自由が効く。  
  SASSな人は「[sass-autocompile](https://atom.io/packages/sass-autocompile)」が同じ機能。
- **[tool-bar](https://atom.io/packages/tool-bar)**  
  エディタの上下左右好きなところにボタンを設置する。基本的にメインメニューやコマンドパレットのショートカット。  
  次項目のflex-tool-barと組み合わせて好きなボタンが入れられる。  
  ![](https://i.github-camo.com/8387595328108e1dce2b658a6827140047e286e9/687474703a2f2f636c2e6c792f696d6167652f3277307533633178314b33572f53637265656e73686f742d323031352d30342d32312d31362e34362e34392e706e67)
- **[flex-tool-bar](https://atom.io/packages/flex-tool-bar)**  
  上記tool-barに依存したプラグイン。好きなアイコン＆コマンドでボタンを設置できる。  
  普通のURLでリンクも貼れるし、そのURL機能を使ってアプリのショートカットにもできる。  
  設定はAtomの設定フォルダ（~/.atom）の直下に `toolbar.json` というファイルを作って、そこに書く。  
  例として[個人的な設定をGistに書いておいた](https://gist.github.com/kijtra/6b74e2decc14cbbde01a)。
- **[script](https://atom.io/packages/script)**  
  コードの一部を選択してこのプラグインを使うと、その部分のコードを実行してくれる。いろんな言語に対応してて便利。  
  PHPでUNIX時間をDateTimeにしたりとかよく使う。  
  ![](https://i.github-camo.com/405fb492595dd819647af375b68c716fd862ee80/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f313639343035352f333232363230312f63343538616362632d663036372d313165332d383461302d6461323766653333346635652e676966)
- **[php-documentation-online](https://atom.io/packages/php-documentation-online)**  
  PHP者用。コード中の関数にカーソルを合わせて <kbd>F4</kbd> キーで公式ドキュメントが表示される。  
  デフォルトでは英語版なので、ソースを書き換えて日本語版に飛ぶようにしてる。  
  設定場所はプラグインのフォルダ内 `lib/php-documentation-online.coffee` の28行目、
  `http://php.net/manual/en/` → `http://php.net/manual/ja/` に。
- **[SFTP-deployment](https://atom.io/packages/SFTP-deployment)**  
  (S)FTPでサーバーにアップ＆ダウンロードできる。Windowsだとダウンロードが不安定だったりdeprecationのコード使ってたりで今のところあまり実用的じゃない。  
  けどアップデート待ちで一応入れてる。
- **[language-nginx](https://atom.io/packages/language-nginx)**  
  nginxのconfファイルのシンタックスハイライト。完全な感じではない。
- **[language-apache](https://atom.io/packages/language-apache)**  
  Apache系（htaccessなど）のシンタックスハイライト。公式に取り込んでほしい。
- ちなみにテーマは [Seti-ui](https://atom.io/themes/seti-ui) を使ってる。（[file-icons](https://atom.io/packages/file-icons)を使わなくてもいいので）

- - - - -

Atomはまだ起動が遅かったりプラグインの完成度が高くなかったりするけど、少し使い慣れてきたので継続してみる。  
来月（2015年6月）にはメジャーバージョンになるっぽいので期待してる。
