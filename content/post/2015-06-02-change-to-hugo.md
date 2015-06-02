---
title: "ブログのバックエンドを「Hugo」に変更"
date: "2015-06-02T18:39:32+09:00"
slug: "change-to-hugo"
tag: ["hugo"]
description: "ブログのバックエンドを「Hugo」に変更したので概要メモ。"
---

ブログのバックエンドを全面変更したので記録ついでにメモ。

<!--more-->

これまで、ブログのバックエンドは以下のような構成だった。

- 開発環境 → [Cloud9](https://c9.io/)
- エディタ  →  同上
- CMS → [Middleman](https://middlemanapp.com/jp/)(Ruby)
- ホスティング → [GitHub Pages](https://pages.github.com/)

Cloud9 に Middleman をインストールし、その Cloud9 上で Markdown ファイルを編集し、Cloud9 上でプレビューして確認、そのまま GitHub Pages にデプロイ（公開）。  
この構成でネットとブラウザさえあればどこでも編集・公開できるんだけど、去年あたりから Cloud9 が無料版と有料版の差をつけはじめ、無料版ではサーバーの起動が非常に遅くなってややストレスに。  
とうことで最近になって環境を変えることにした。  

自分の行動からして出先でブログ更新とかまずやらない（推敲のみ）ので、素直にローカルPCで記事作成してから GitHub Pages にデプロイするようにした。  
でも新規投稿時の記事リンク貼りとかいちいち作業するわけにもいかないので静的サイトジェネレータを探してみたところ、ローカルで動かすなら **[Hugo](http://gohugo.io/)** が最適な感じだった。  
現状の環境は以下な感じ。  

- 開発環境 → ローカル（Windows）
- エディタ  →  Atom（デフォルトの [Markdown Preview](https://github.com/atom/markdown-preview) 機能）
- CMS → [Hugo](http://gohugo.io/)
- ホスティング → [GitHub Pages](https://pages.github.com/)

Hugo は Go言語 で制作されていて、Windows用に .exe ファイルが1つだけのアプリとして[提供されている](https://github.com/spf13/hugo/releases)。  
なので、基本はコマンドプロンプトで hugo.exe （ダウンロード時はファイル名が違うのでリネームする）を呼び出しての作業になる。  

1ファイルなのでブログのリポジトリにそのまま入れて作業している。  
で、ブログのリポジトリ自体は Dropbox にまるごと入れてるので Dropbox と Git があればどこでも作業ができなくもない（やらんけどw）。  

## Hugo のインストール

[Hugo の GitHub から最新版アプリをダウンロード](https://github.com/spf13/hugo/releases)。  
ウチの環境は Windows7 64-bit なので **hugo_0.xx_windows_amd64.zip** をダウンロードして解凍。  
中に **hugo_0.xx_windows_amd64.exe** があるので、「 **hugo.exe** 」にリネームしてパスの通ったところに置くか、ウチのようにローカルのブログ用リポジトリのルートフォルダに入れる（そこでしか作業しない場合）。  


## サイトの作成

コマンドプロンプトを開き、ローカルのブログ用フォルダ（空フォルダ。あるのは hugo.exe のみ）に移動。  
以下のコマンドで初期構成が生成される。

```bash
hugo new site ./
```

ファイル構成は自動で以下のように作られる。

```bash
▸ archetypes/  # ページ(mdファイル)のデフォルトテンプレート
▸ content/ # ここの中身が最終的に静的サイトとして生成される
▸ layouts/ # レイアウト、テーマ関連
▸ static/ # 画像やCSS、JSとかを管理する
  config.toml # サイト設定ファイル
```

基本設定などは、基本的に生成された「config.toml」ファイルに書く。  
個人的に toml という形式が慣れなかったので **config.yaml** ファイルにすることにした。  
設定ファイルは config.toml →なければ config.yaml →なければ config.json という順番で自動判別してくれる。  


## テーマ（ページテンプレート）の作成

`themes` フォルダがなければ作っておく。  
特にこだわりがなければ[公式テーマの集まってる処](https://github.com/spf13/hugoThemes)があるので、そこから落としてきて `themes` に入れる。  

今回は自前のデザインを引き継ぐので自作することになったので、他のテーマを参考にしつつ、同じく `themes` に作って入れた。  
自前テーマの作り方は[公式ドキュメント（英語）](http://gohugo.io/themes/creation/)を参照。  
基本的に[Go言語のHTMLテンプレート機能](http://golang.org/pkg/html/template/)に沿って記述する。  （[mustache](https://mustache.github.io/)に似てる）

## 記事（ページ）の作成

`content` フォルダに Markdown ファイル（拡張子は .md または .markdown）を入れると、それが最終的にテーマ（テンプレート）を通してHTMLファイルとして生成される。  
ウチの場合、記事ページは `/article/xxxxxxx` というURL構成なので、 `content/article/xxxxxxxx.md` というファイルを作っていく。  

### Markdownフォーマットの設定

Markdown は [Front Matter](http://gohugo.io/content/front-matter/) という形式で書くんだけど、デフォルトでは toml（TOML Front Matter） の形式になっている。  
これも個人的に慣れてない（＆旧記事ページが対応してない）ので **YAML Front Matter** 形式で書けるようにする。  
`config.yaml` に以下の一行を追加。（なければ）  

```yaml
metaDataFormat:  "yaml"
```

### architypes の作成

`architypes` フォルダが空の場合、とりあえず「**`default.md`**」というファイルがないとページ作成時にエラーが出る。  
`default.md` の中身はページ生成時のデフォルトテンプレートとして使われる。  
例としては以下のようなもの。

```md:architypes/default.md
---
tags:
categories:
---
```

### 新規投稿ページの作成

以下のコマンドで新規ページが作成される。  （ブログのルートフォルダで実行）

```bash
hugo new article/new-post-dayo.md
```

上記コマンドは `content/article/new-post-dayo.md` を生成するコマンド。  
実行すると以下のようなファイルが作られる。（`architypes/default.md` の内容が反映される）

```md
---
date: 2015-06-01T10:51:30+09:00
title: new post dayo
tags:
categories:
---
```

## サイトのプレビュー

記事ファイルができたらプレビューしてみる。コマンドは以下。

```bash
hugo server --watch
```

実行すると以下のような表示が出る。

```bash
0 draft content
0 future content
1 pages created
0 paginator pages created
0 categories created
in 258 ms
Watching for changes in C:\xxxxxxx\xxxxxx\{content,layouts,static,themes\kijtra}
Serving pages from C:\xxxxxxx\xxxxxx\public
Web Server is available at http://127.0.0.1:1313/
Press Ctrl+C to stop
```

これで `http://127.0.0.1:1313/` をブラウザで開いてプレビューできる。  
`--watch` はリアルタイムプレビューのオプションで、ファイル変更を監視してくれる。  

プレビューすると自動的に `public` というフォルダが生成されている。  
このフォルダが公開対象フォルダ(GitHub Pagesに置くフォルダ)になる。


## GitHub Pagesでの公開

単純に生成されたファイルを GitHub Pages 用リポジトリにプッシュすれば公開される。  
でも個人的にサイトのルートフォルダごと GitHub で管理したかったので[公式ドキュメントのGitHub Pagesで公開する方法（英語）](http://gohugo.io/tutorials/github-pages-blog/)を参考にした。  

この方法でやる場合、GitHubに**2つのリポジトリが必要になる**。  
ひとつはサイトの全ファイル用、もうひとつは公開用（_username_.github.io）。  

おおまかな手順としては、全ファイル用リポジトリにファイルを置き、`public` フォルダのみ [git submodule](https://git-scm.com/book/ja/v1/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB) 機能で別リポジトリにする。  

例としては、最初に以下のコマンドでリポジトリを設定した。  
（すべてルートディレクトリ作業）

```sh
# Gitの初期化
git init
git remote add origin https://github.com/<全ファイル用リポジトリ>.git

# サイトをビルド
hugo

# いったんpublicフォルダを削除（いつでも生成できるので心配無用）
rm -rf public

# gitにファイル追加
git add -A

# いったんコミット（プッシュはまだしない）
git commit -m "before add submodule"

# publicフォルダのみ公開用リポジトリとして管理
git submodule add git@github.com:<公開用リポジトリ>.git public
```

これで公開の準備ができた。  

実際に公開する時には毎回いくつかのコマンドが必要「になって面倒なので、以下のような**deploy.sh**というファイルを用意しておく。  
※ Windowsでshファイルを実行するので、Git Bash([Git for Windows](https://msysgit.github.io/))が入っている必要がある

```sh:deploy.sh
#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# サイトをビルド
hugo

# 変更ファイルをgitに追加
git add -A

# コミット（引数があればそれをコミットメッセージにする）
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# 親フォルダ（全ファイル）をプッシュ
git push origin master

# 公開用フォルダ（サブモジュール）をプッシュ
git subtree push --prefix=public https://github.com/<公開用リポジトリ>.git master
```

で、今後公開する時は以下のコマンドだけで公開可能。

```sh
deploy.sh "コミットメッセージ"
```
