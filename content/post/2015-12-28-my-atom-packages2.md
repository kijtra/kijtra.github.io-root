---
date: "2015-12-28T10:08:10+09:00"
slug: "my-atom-packages2"
tag: ["Editor"]
title: "いま入れてるAtomプラグイン（パッケージ）メモ（2015年12月）"
description: "今年はAtomも1.0となり、入れてるプラグインも少し変化があったので改めてまとめてみる"
---

今年のAtomも[2015年6月末に1.0に達し](http://blog.atom.io/2015/06/25/atom-1-0.html)、入れてるプラグインも変化があったので改めてまとめてみる。  
[2015年5月時点のプラグインまとめ](/article/my-atom-packages/) からすると若干減った。  

<!--more-->

## 新しく導入したもの

- **[sublime-style-column-selection](https://atom.io/packages/Sublime-Style-Column-Selection)**  
  いわゆる「矩形選択」ができるプラグイン。いざという時にやっぱり必要だった・・・。  
  Markdownの場合は動作が微妙な場合がある（プラビュー中のみ？）。  
  ![sublime-style-column-selection](https://i.github-camo.com/d25f9471535b04a7ce4eece13d6063d5e91372c9/68747470733a2f2f7261772e6769746875622e636f6d2f626967666976652f61746f6d2d7375626c696d652d73656c6563742f6d61737465722f73637265656e73686f742e706e67)
- **[atom-beautify](https://atom.io/packages/atom-beautify)**  
  コマンド一発でコードを整形してくれるプラグイン。  
  言語（拡張子）ごとに設定できたり、「選択したテキストのみ整形」とかできるので助かる。  
  例えば、Web上で見つけたコードをコピペした際にインデントの形式とかが自分のスタイルと違ったりなんかがよくあると思うけど、そういう時に便利。  
  個人的には [flex-tool-bar](https://atom.io/packages/flex-tool-bar) に `atom-beautify:beautify-editor` のコマンドを付けてボタン一発でできるようにしてる。
- **[editorconfig](https://atom.io/packages/editorconfig)**  
  [EditorConfig](http://editorconfig.org/) という定番規格(?)に対応するプラグイン。  
  EditorConfigというのは、`.editorconfig` というファイルをどこかに用意し、そこに設定（インデントサイズとか改行コードとかそういうの）を書いておくことで、他のIDEやエディタでもそのファイルを共有して同じ設定を適用できる(「EditorConfig」に対応していれば)というもの。  
  Sublime Textや自宅/職場などでと同じ設定を使いたいので入れた。
- **[highlight-column](https://atom.io/packages/highlight-column)**  
  タテの列をハイライト（明るく）するプラグイン。地味に必須。  
  ![highlight-column](https://i.github-camo.com/f8fcaa025f37aa99aeba70272fce528457eb7ad5/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313235333635392f323336353733362f62363063396239302d613664612d313165332d383038312d6663383735333738333433352e706e67)  
- **[pigments](https://atom.io/packages/pigments)**  
  コード中のカラーコードっぽい文字列の背景に、その色をつけてくれる。  
  SassやLESSの変数でも探しだして色を付けてくれるのがありがたい。  
  同機能である [atom-color-highlight](https://atom.io/packages/atom-color-highlight) の動作が少し微妙だったためこちらに変更。  
  ![pigments](https://i.github-camo.com/16c0c12a183c6f57fb33481984593a515777d5e8/68747470733a2f2f6769746875622e636f6d2f61626533332f61746f6d2d7069676d656e74732f626c6f622f6d61737465722f7265736f75726365732f7069676d656e74732e6769663f7261773d74727565)
- **[terminal-panel](https://atom.io/packages/terminal-panel)**  
  ウインドウ下部にターミナル（コマンドプロンプト）用の入力欄を出してコマンドが打てるプラグイン。  
  タスクランナーの起動とかPHPのビルトインサーバー起動とかに活躍中。ターミナルが複数起動できるのも非常に良い。  
  コマンド結果の文字がコピペできないのが少し不便なのと、コマンド結果文字のハイライト色が設定できるといいなあと思う。　　
  ![terminal-panel](https://i.github-camo.com/08b164c6803467b8824a34ca9f52b6f2d1d6b2e6/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f74686564616e69656c2f7465726d696e616c2d70616e656c2f6d61737465722f7465726d696e616c2d64656d6f2e676966)
- **[activate-power-mode](https://atom.io/packages/activate-power-mode)**  
  個人的な2015年いちばんのヒットプラグイン。  
  以下画像のような我がコード！こそ！最強ッッ！状態になるだけのもの。  
  <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd>で簡単にON/OFFできます。
  ![activate-power-mode](https://i.github-camo.com/b1d03b9b7a9d7dc9a32d1eab307b5378f8c59a7b/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f3638383431352f31313631353536352f31306631363435362d396336352d313165352d386166342d3236356630316663383361302e676966)  
  地味なコーディング作業にこういう華のある演出はとても大切だなと思うし、こういうのを作ろうという気概って他人に良い影響を与えると思うのです。


## 変わらず使っているもの

- [emmet](https://atom.io/packages/emmet)  
  HTML等を簡単な記述でコーディングできるプラグイン。もう公式で良いのでは。
- [minimap](https://atom.io/packages/minimap)  
  エディタの横にファイルの全体像を表示する。こちらも公式に取り込んで良いのでは。
- [project-manager](https://atom.io/packages/project-manager)  
  プロジェクトを管理するプラグイン。
- [atom-terminal](https://atom.io/packages/atom-terminal)  
  いま開いているプロジェクトのディレクトリでターミナル系アプリを起動するプラグイン。
- [linter](https://atom.io/packages/linter)  
  コードのリアルタイムエラー検出。こちらも公式取り込み希望。
- [tool-bar](https://atom.io/packages/tool-bar)  
  エディタの上下左右好きなところにボタンを設置できる。
- [flex-tool-bar](https://atom.io/packages/flex-tool-bar)  
  上記tool-barに依存し、好きなアイコン＆コマンドでボタンを設置できる。
- [Remote-FTP](https://atom.io/packages/remote-ftp)  
  (S)FTPでのアップ・ダウンロードが可能なプラグイン。  
  あまり使う機会は多くないけど入れている。
- [language-nginx](https://atom.io/packages/language-nginx)  
  nginxのconfファイルのシンタックスハイライト。
- [language-apache](https://atom.io/packages/language-apache)  
  Apache系（htaccessなど）のシンタックスハイライト。


## 削除したもの

- ~~[japanese-wrap](https://atom.io/packages/japanese-wrap)~~  
日本語の文章がウインドウの端で改行されるようにするプラグインだけど、[Atom1.2から公式対応された](http://blog.atom.io/2015/11/12/atom-1-2.html)ため不要に。大変お世話になりました。
- ~~[atom-color-highlight](https://atom.io/packages/atom-color-highlight)~~  
  コード中のCSSカラーっぽい文字をの背景にその色を表示する。色がついた部分がズレたりとかがあったので、同機能の [pigments](https://atom.io/packages/pigments) に変更。
- ~~[open-last-project](https://atom.io/packages/open-last-project)~~  
特になくても上記 project-manager のみで動いているので不要に。
- ~~[chary-tree-view](https://atom.io/packages/chary-tree-view)~~  
左サイドのファイルツリーで、シングルクリックのプレビューを表示しないプラグイン。  
以前[StackOverflowでの質問から作っていただいた](http://ja.stackoverflow.com/q/10485/3876)ものだけど、プレビューありで慣れるように修行して不要に。
- ~~[git-plus](https://atom.io/packages/git-plus)~~  
ターミナル系アプリを使わなくてもGitコマンドを使えるプラグイン。  
Gitはターミナルで操作してしまうことが多いのと、Windowsだと微妙な動作があったりでとりあえず削除。
- ~~[git-control](https://atom.io/packages/git-control)~~  
こちらも上記と同様の理由で削除。
- ~~[less-autocompile](https://atom.io/packages/less-autocompile)~~  
SASSでの管理に移行し、 [sass-autocompile](https://atom.io/packages/sass-autocompile) を入れたので不要に。
- ~~[script](https://atom.io/packages/script)~~  
コードの一部を選択してこのプラグインを使うと、その部分のコードを実行してくれる。あまり使う機会がなかったので削除。
- ~~[php-documentation-online](https://atom.io/packages/php-documentation-online)~~  
PHPの関数などのドキュメントがその場で見られる。ブラウザで見てしまうことが多いため削除。


- - - - -

ということでいまのところまだAtomをメインで使っている。  
[Visual Studio Code](https://www.visualstudio.com/ja-jp/products/code-vs.aspx)が話題になったけど、PHPメインの場合は今のところあまり使えなさそう。  
[Sublime Text](http://www.sublimetext.com/)は2015年3月以降、動きが完全停止・・・簡易エディタとしてはバリバリ使ってるので、クマムシのように息を吹き返すのを期待。
