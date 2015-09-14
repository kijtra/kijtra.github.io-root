---
date: "2015-09-14T12:45:29+09:00"
ogp:
  image: "https://lh3.googleusercontent.com/DHtYeKyOtH11NfO39XTaIZ4uEUGjbqCca5OFkjtU_Wyf5TWJYvFp56nO3AUpZOYIMCOGdQ4JDWf1iUqWxKrtPtLPnbqxzbaT54iieHat3kIk2re7zQGUSpOpPtrrRtyUMk9KYn8BMnO55s0nijQ3kfy2cCZ08NIBAl7NBWTIGd2OUfGW8Bo7ZL7ChwRoHpSFVf17Sh7LSVUPjcyC4cgGAemhDpdb7Yhu_6RtpMQflMLlkwi0xJayuW_3S1zNwqr1YsK-ihHGJAhgomDAY8YuMAwu3OanTYH8yXUGuFpaZIheKl3iFloNulJnIiSjiJEmiWidDg-O4d4o1i-YNFQkBfK69mD4w2lHAdZMMQeFjzUBzhJ5JXwXLXPt_kFS5KrMUUzCRzSDzG29DqlmzB_43qgaBNyEWkj9LSWNF__Kn7PU7bTdeuXRtzBchEEE5H2fr-q1QQB-yc7SZ5NHWt4uT3CEsSsL82lJQEF_-0B-z7R0eCR_JM0sBJDiHe3Ac3XSdbk4wMzCukKRtO0M0G2GG-UAeDM_BeNchno0QjNp5k8=w1570-h708-no"
slug: "cloud9-install"
tag: ["Cloud9", "Editor"]
title: "Cloud9を自サーバにインストールしてどこでもコーディング"
description: "Web上で動くIDEである「Cloud9」を自サーバー（さくらVPS）にインストールしてみたので手順をメモ。"
---

[Cloud9](https://c9.io/) はWebサービスとして提供されているオンラインIDEだけど、オープンソースなので自前のサーバー（さくらVPS等）にインストールしても使うことができるため、なんとなく使ってみた。

<!--more-->

今回は [さくらインターネットのVPS](http://vps.sakura.ad.jp/) で最安の 512プラン を持っていたので、そこで使ってみた。  
OSは **CentOS 6.7** ( `yum -update` により6.6から6.7になった)。  

自前インストールだと [Node.js](https://nodejs.org) を使ってコマンドによりサーバーを立ち上げ、そこにアクセスして使うことになる。  
でも使うたびに毎回サーバーを起動する必要があるので、最終的には **立ち上げっぱなし** の状態にし、さらに **サブドメイン下で動くように** したい。

> Cloud9 SDK の公式Github  
> https://github.com/c9/core/

[![Cloud9動作イメージ](https://lh3.googleusercontent.com/DHtYeKyOtH11NfO39XTaIZ4uEUGjbqCca5OFkjtU_Wyf5TWJYvFp56nO3AUpZOYIMCOGdQ4JDWf1iUqWxKrtPtLPnbqxzbaT54iieHat3kIk2re7zQGUSpOpPtrrRtyUMk9KYn8BMnO55s0nijQ3kfy2cCZ08NIBAl7NBWTIGd2OUfGW8Bo7ZL7ChwRoHpSFVf17Sh7LSVUPjcyC4cgGAemhDpdb7Yhu_6RtpMQflMLlkwi0xJayuW_3S1zNwqr1YsK-ihHGJAhgomDAY8YuMAwu3OanTYH8yXUGuFpaZIheKl3iFloNulJnIiSjiJEmiWidDg-O4d4o1i-YNFQkBfK69mD4w2lHAdZMMQeFjzUBzhJ5JXwXLXPt_kFS5KrMUUzCRzSDzG29DqlmzB_43qgaBNyEWkj9LSWNF__Kn7PU7bTdeuXRtzBchEEE5H2fr-q1QQB-yc7SZ5NHWt4uT3CEsSsL82lJQEF_-0B-z7R0eCR_JM0sBJDiHe3Ac3XSdbk4wMzCukKRtO0M0G2GG-UAeDM_BeNchno0QjNp5k8=w766-h345-no)](https://lh3.googleusercontent.com/DHtYeKyOtH11NfO39XTaIZ4uEUGjbqCca5OFkjtU_Wyf5TWJYvFp56nO3AUpZOYIMCOGdQ4JDWf1iUqWxKrtPtLPnbqxzbaT54iieHat3kIk2re7zQGUSpOpPtrrRtyUMk9KYn8BMnO55s0nijQ3kfy2cCZ08NIBAl7NBWTIGd2OUfGW8Bo7ZL7ChwRoHpSFVf17Sh7LSVUPjcyC4cgGAemhDpdb7Yhu_6RtpMQflMLlkwi0xJayuW_3S1zNwqr1YsK-ihHGJAhgomDAY8YuMAwu3OanTYH8yXUGuFpaZIheKl3iFloNulJnIiSjiJEmiWidDg-O4d4o1i-YNFQkBfK69mD4w2lHAdZMMQeFjzUBzhJ5JXwXLXPt_kFS5KrMUUzCRzSDzG29DqlmzB_43qgaBNyEWkj9LSWNF__Kn7PU7bTdeuXRtzBchEEE5H2fr-q1QQB-yc7SZ5NHWt4uT3CEsSsL82lJQEF_-0B-z7R0eCR_JM0sBJDiHe3Ac3XSdbk4wMzCukKRtO0M0G2GG-UAeDM_BeNchno0QjNp5k8=w1570-h708-no)

-----

## 必要なライブラリ等のインストール

Cloud9 のインストールに最低限必要なのは **Python2.7以上** と **glibc-static** というyumパッケージ。  
その2つをインストールする。  
※ Node.js周りのものはCloud9インストーラが勝手に入れてくれるので、自分で入れなくても良い

まずは glibc-static 。

```sh
sudo yum install glibc-static
```

次にPython。  
少し手順が多いので下項で。


### Python2.7.9のインストール

CentOS6 の yum リポジトリには Python2.6 までしかないため、どうしてもソースからインストールする必要がある。  
また、すでに入っている Python2.6.6 はそのままにして、2.7 を別でインストールすることになる。  

いくつか調べると以下のサイト（英語）のインストール方法が一般的なようなので、基本的にこの通りにする。  
http://toomuchdata.com/2014/02/16/how-to-install-python-on-centos/

まず必須ライブラリのインストール。  

```sh
sudo yum groupinstall "Development tools"
sudo yum install wget zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel
```

上記参考サイトでは `wget` が入っていないので追加している。（後ほど使うため）  
また、ウチの環境では `yum groupinstall "Development tools"` が、以下のようなメッセージが出て動かないような感じだった。  

> Warning: Group development does not have any packages.  
> No packages in any requested group available to install or update

それでもまあ最終的にCloud9を使えてるのでよしとするw  

次にライブラリのパスを設定する。  
CentOS6 では、デフォルトで `/usr/bin/python` にパスが通っているけど、Python2.7は `/usr/local/bin/python2.7` というパスにインストールされる。  
そのためPythonライブラリ群のパスを指定する必要があるらしく、 `/etc/ld.so.conf` というファイルを編集する。  

```sh
sudo vi /etc/ld.so.conf
```

以下のように記述する。（2行目が追記した部分）  

```txt
include ld.so.conf.d/*.conf
/usr/local/lib
```

上記の設定を反映するコマンド。  

```sh
sudo /sbin/ldconfig
```

次にPythonのソースをダウンロードしてインストール。  

```sh
wget http://python.org/ftp/python/2.7.9/Python-2.7.9.tar.xz
tar xf Python-2.7.9.tar.xz
cd Python-2.7.9
./configure --prefix=/usr/local --enable-unicode=ucs4 --enable-shared
make
sudo make altinstall
```

最後の `altinstall` が、Python2.6.6 とは別にインストールするという指示らしい。  
わりと時間がかかるけど、終わったら念のためもう一度パス設定を反映する。  
（これをやらないとパスが通らないことがあった）

```sh
sudo /sbin/ldconfig
```

インストールされたか確認

```sh
python2.7 -V
# 「Python 2.7.9」と出ればOK
```


## Cloud9 SDK のインストール

手順は簡単だけど、注意点としては **root権限ではインストールできない** という点。  
`sudo -s` とか `su -` とかでrootに成っている場合は一般ユーザーに切り替える。  

その **一般ユーザーのルートディレクトリでインストールする** ので、ディレクトリ移動。  

```sh
cd ~
```

それと、もう一つ注意点としてシェルが日本語になっているとうまくいかない。  
念のため確認して英語にしておく。  

```sh
sudo vi /etc/sysconfig/i18n
```

以下のように記述

```txt
LANG="en_US.UTF-8"
```

やっと本体インストール。  
GitでSDKを `c9sdk` というディレクトリにダウンロードする。

```sh
git clone git://github.com/c9/core.git c9sdk
```

ダウンロードフォルダに移動して・・・

```sh
cd c9sdk
```

インストーラを実行

```sh
scripts/install-sdk.sh
```

これもかなり時間がかかるけど、成功すると以下のようなメッセージが出る。

> Success!
> run 'node server.js -p 8080 -a :' to launch Cloud9

`node server.js -p 8080 -a :` というコマンドで立ち上げできるよ！というメッセージだけど、今はまだ無視。  


## サブドメインでアクセスできるようにする

Cloud9を立ち上げると、そのままでは **http://XXX.XXX.XXX.XXX:8080** というようなアドレスでしかアクセスできない。  
なので、**http://c9.example.com** といったURLでアクセスできるようにする。

### Apacheの場合

```conf
<VirtualHost *:80>
    ServerName c9.example.com
    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/
    ProxyPreserveHost On
</VirtualHost>
```

### Nginxの場合

```nginx
server {
    listen       80;
    server_name  c9.example.com;

    location / {
        proxy_pass   http://127.0.0.1:8080;
    }
}
```


## Cloud9 IDE、起動！

ここまでがわりと長い・・・。  

起動コマンドは以下のような感じ。  
オプションについては[公式GitHubに説明がある](https://github.com/c9/core/#starting-cloud9)。

```sh
node ~/c9sdk/server.js -p 8080 -w ~/public/ -a username:password
```

ひとつずつ説明すると、

- **`node`** ・・・ Node.js使用コマンド
- **`~/c9sdk/server.js`** ・・・ サーバー起動スクリプト
- **`-p 8080`** ・・・ 使用するポート
- **`-w ~/public/`** ・・・ 「~/public/」以下のディレクトリがCloud9管理対象
- **`-a username:password`** ・・・ Basic認証する場合の ID:パスワード

といったコマンド。  
これで `http://c9.example.com` にアクセスするとIDEが起動するはず。  

ちなみに編集権限のないディレクトリ内のは当然編集できない。  
なので、サーバーの別ユーザーのディレクトリを編集したい場合は、そのユーザーでログインしてCloud9をインストールする必要がある。  

ちなみにIDEの設定などは `~/.c9/` というディレクトリに保存される。  
SASS とか LESS とかの [Builderスクリプト](https://cloud9-sdk.readme.io/docs/builders) とか使う場合はそこに設定ファイルを保存することになる。  

起動が確認できたら、いったんサーバーを落として（<kbd>Ctrl + C</kbd>）、下記立ち上げっぱなしにする設定に進む。


## 「node forever」で立ち上げっぱなしにする

npmが入っていない場合は入れる。  

```sh
sudo yum install npm
```

forever をグローバルインストールする。  
（グローバルである必要はない）

```
sudo npm install forever -g
```

forever を使って Cloud9 IDE を起動

```sh
forever start ~/c9sdk/server.js -w /home/kijtra/public/dev -p 8080 -a username:password
```

以下のように出れば起動中。  

```sh
info: Forever processing file: /home/example/c9sdk/server.js
```

実行中ものをの表示したい場合

```sh
forever list
```

Cloud9 IDE を停止する場合

```sh
forever stop ~/c9sdk/server.js
```

-----

以上だけど、Pythonのインストールあたりからわりと試行錯誤でやっと成功した感じ。  
[virtualenv](https://virtualenv.pypa.io/en/latest/) とか使ったりしたけど、うまくいかなかった。  
また、Cloud9自体が使っている人がほとんどいないので苦労した。  
でも [SASS](http://sass-lang.com/) や [LESS](http://lesscss.org/) 、[CofeeScript](http://coffeescript.org/) のコンパイルができて、しかも **[Emmet](http://emmet.io/)** にも対応しているのはびっくりした。  
「SublimeText Mode」なるものもあり、見た目や動作を [SublimeText](http://www.sublimetext.com/) そっくりにすることもできる。  
個人サイトなんかはすべてブラウザで完結できそう。
