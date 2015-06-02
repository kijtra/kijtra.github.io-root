---
title: "PackagistとComposerで自作パッケージを使う"
slug: "original-library-using-composer-packagist"
date: "2015-05-20T12:02:00+09:00"
description: "自分で作ったPHPのパッケージ（ライブラリ）を Packagist に登録して、Composer から使えるようにしてみたのでメモ。"
tag: ["PHP"]
---

自分で作ったPHPのパッケージ（ライブラリ）を Packagist に登録して、Composer から使えるようにしてみたのでメモ。

<!--more-->

[Composer](https://getcomposer.org/) でダウンロードするパッケージは、基本的には [Packagist](https://packagist.org/) にあるものからダウンロードされる。  
個人的によく使う自作ライブラリ等も Composer で依存関係を解消しつつ使いたいなあと思ってやってみた。

## 全体の流れ

1. コードを書く
1. （してなければ）[GitHub](https://github.com/) にユーザー登録する
1. （してなければ）[Packagist](https://packagist.org/) にユーザー登録する
1. GitHub にリポジトリを作る
1. そのリポジトリと Packagist を連携させる
1. 書いたコードを GitHubリポジトリ にプッシュ
1. Packagist に公開（自動）
1. Composer から使う

まあ普通なら 1 をコピペして済むんだけど Composer から使ってみたかったので。


## コードを書くにあたって（composer.json の作成）

自作パッケージのルートに **composer.json** というファイルを作成して、Composer でどう扱ってもらうかを記述する必要がある。  

簡単に作成するには、ルートディレクトリでターミナルやコマンドプロンプトを開き、以下のコマンドを打つ。（[Composerインストール](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)済みが前提）  

```sh
php composer.phar init
```

composer.json を作成するための質問をいくつか訊かれるため、それに入力していくことで自動生成される。

```sh
# パッケージ名（「ベンダー（ユーザー）名/パッケージ名」の形式）
Package name (<vendor>/<name>) [kijtra/oreore-lib]: kijtra/oreore-lib
# パッケージの概要
Description []: オッス！オラ、オレオレライブラリ！
# 作成者（あなた）
Author [kijtra <kijtra@gmail.com>]:
# 依存パッケージの最低限の安定バージョン（「stable」が無難）
Minimum Stability []: stable
# パッケージの種類（なんでも良いようだけど「library」とかで）
Package Type []: library
# ライセンス（今回はまず自分しか使わないので無保証なMIT）
License []: MIT

Define your dependencies. # 「依存関係を決めてね」

# 依存するパッケージがありますか？
Would you like to define your dependencies (require) interactively [yes]?
# 検索する依存パッケージ名（例：monolog/monolog）
Search for a package: monolog/monolog
# 検索した依存パッケージで使用するバージョン
Enter the version constraint to require (or leave blank to use the latest version): @stable
# ほかに検索する場合（なければそのまま Enter）
Search for a package:
# 開発時に依存するパッケージがありますか？（以降は上記と同じ。なければ「no」）
Would you like to define your dev dependencies (require-dev) interactively [yes]? no

{
    "name": "kijtra/oreore-lib",
    "description": "オッス！オラ、オレオレライブラリ！",
    "type": "library",
    "license": "MIT",
    "require": {
        "monolog/monolog": "@stable"
    },
    "authors": [
        {
            "name": "kijtra",
            "email": "kijtra@gmail.com"
        }
    ]
}
# 「上のようなファイルが作られるけどいいかな？」（そのまま Enter）
Do you confirm generation [yes]?

```

これで **composer.json** が生成されてるはず。  
で、もしPHPのバージョン制限とかあるなら追記しておく。  
また、「autoload」での振る舞いも記述しておくと良いので、最終的な composer.json ファイルは以下のようになる。

```json
{
    "name": "kijtra/oreore-lib",
    "description": "オッス！オラ、オレオレライブラリ！",
    "type": "library",
    "license": "MIT",
    "require": {
        "monolog/monolog": "@stable"
    },
    "authors": [
        {
            "name": "kijtra",
            "email": "kijtra@gmail.com"
        }
    ],

    //--以下追記--

    "keywords": ["オレオレ", "自作"], //（任意）Packagistでの検索でタグ指定できる

    "require": {
        "php": ">=5.3.2" //PHP５．３．２以上推奨
    },

    "autoload": {
        "psr-4": { //（ファイル構成が）PSR-4形式で作りましたよ
            "Kijtra\\": "src" //ファイル群は「src」ディレクトリの中ですよ
        }
	},

    "include-path": ["src/"] //（開発時用）「src」ディレクトリ内からautoload
}
```

開発時には開発ディレクトリのルートで以下を実行しておき、Composer の基本ファイルをダウンロードする。

```sh
php composer.phar install
```

そうすると vendor ディレクトリが作成され、 vendor/autoload.php が使用できる。  
上記 composer.json の最終行にある `"include-path": ["src/"]` は、この時に必要。  

「PSR-4」というのはPHPでクラスファイルをオートロードする際のディレクトリやファイルの命名規則等のことで、ここでは説明しないので [Googleで「PSR-4とは」](https://www.google.co.jp/search?q=PSR-4%E3%81%A8%E3%81%AF) を。


## GitHub と Packagist の連携

パッケージをGitHubに置く前に、Packagist との連携を設定しておく。  

まずは事前に [Packagist](https://packagist.org/) の **API Token** を取得する。  
Packagist のマイページに「**Show API Token**」というリンクがあるので、クリックすると API Token が表示される。  
それをコピーしておく。

<a href="https://lh4.googleusercontent.com/kENdHHVR4B4SfhR7HTv7fdzr2H-6IYAVPAdq2UGByo8=w782-h451-no" target="_blank"><img class="aligncenter" alt="Packagist の API Token を取得" src="https://lh4.googleusercontent.com/kENdHHVR4B4SfhR7HTv7fdzr2H-6IYAVPAdq2UGByo8=w782-h451-no" /></a>


次に [GitHub](https://github.com/) に行き、リポジトリを作ったら、そのリポジトリの **Settings 画面**（右メニュー）に行く。  

左メニューの「**Webhooks &amp; Services**」というページに行き、「Services」の「**Add service**」から「**Packagist**」を検索。  
クリックで追加。

<a href="https://lh3.googleusercontent.com/-JqmxdtL8V_s/VVvekOrNwyI/AAAAAAAADgc/iU_uwNJ-dVw/w1003-h405-no/2015-05-15_103417.png" target="_blank"><img class="aligncenter" alt="「Webhooks &amp; Services」から「Packagist」を検索し追加" src="https://lh3.googleusercontent.com/-JqmxdtL8V_s/VVvekOrNwyI/AAAAAAAADgc/iU_uwNJ-dVw/w1003-h405-no/2015-05-15_103417.png" /></a>

入力欄に以下のように入れ、「**Add service**」ボタンで追加。  

**User** ・・・Packagist のユーザー名  
**Token** ・・・Packagist の API Token  
**Domain** ・・・空のままでOK  
**Active** ・・・チェックする  

<a href="https://lh6.googleusercontent.com/-5BoKQ-2qUYk/VVvekWQo7II/AAAAAAAADgk/mOGKrutfJNA/w957-h740-no/2015-05-15_104025.png" target="_blank"><img class="aligncenter" alt="「Webhooks &amp; Services」から「Packagist」を検索し追加" src="https://lh6.googleusercontent.com/-5BoKQ-2qUYk/VVvekWQo7II/AAAAAAAADgk/mOGKrutfJNA/w957-h740-no/2015-05-15_104025.png" /></a>

これで GitHub にプッシュすれば自動的に Packagist に反映されるようになる。


## バージョン管理

ここまででもう Composer から使える状態なんだけど、パッケージのバージョンをどうリリースするかわからなかったので少しとまどってしまった。  
（デフォルトではバージョンなしで「dev-master」のみ）  

なんてことはない。Git で push する前にタグとしてバージョンを記述するだけだった。  
例えば以下のような感じ。

```sh
git add . # Addして
git commit -m "オッス！リリースすっぞ！" # Commitして
git tag -a 0.0.1 # ここでバージョン用タグ作成
git push origin master # Push
```

コミットの前後とかは関係なさそう？プッシュ前ならどこでもいい？みたいだけど、上記でできてる。

- - - - -

### あとがき

これまでPHPのパッケージ群といえば [PEAR](https://pear.php.net/manual/ja/) だったけど、もう最近では [Composer](https://getcomposer.org/) ばかりになってしまった。  
PEAR はメンテナンスされていないものが多くてインストールも面倒で個人的にはあまり好きじゃなかったので、Composer はけっこう便利に使ってる。  

自作のパッケージを登録しておいて、いつでも（依存関係を解消しつつ）使える状態にしておくのはとても便利だと思った。  

だけど、[Packagist](https://packagist.org/) での検索でひっかかってしまうので、あまりにプライベートなものとかはセキュリティ的に危ないまたは恥ずかしくて申し訳ない気持ちに。（GitHub もそうだけど）  
検索にヒットしないように設定できたらいいかも。  

ちなみに今回試しに作ったのは Yahoo JAPAN の [YOLPのAPI](http://developer.yahoo.co.jp/webapi/map/) を扱うもの。  

Packagist: **[kijtra/yolp](https://packagist.org/packages/kijtra/yolp)**  
GitHub: **[kijtra/yolp](https://github.com/kijtra/yolp)**  

おそらく放置の可能性が高いので composer.json の中身とかを見るぐらいでお願いしますw
