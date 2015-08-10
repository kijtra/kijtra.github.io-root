---
title: "Windows 10 で自分の開発環境が動くのか試す"
date: "2015-06-05T17:34:27+09:00"
slug: "windows10-app-operation-check"
description: "Windows10にアップデートしたとして、自分の最低限の開発環境が維持できるのか一応試してみた。"
tag: ["Others"]
---

Windows 10 にアップデートしたとして、自分の最低限の開発環境が維持できるのか一応試してみた。  

<!--more-->

試したWindows 10 は以下。

- [Windows 10 Insider Preview (x86) - ビルド 10074](http://windows.microsoft.com/ja-jp/windows/preview-iso-update-1504)（のISOファイル）
- [VirtualBox](https://www.virtualbox.org) 4.3.28

VirtualBoxで動かす手順は以下のページを参考にさせてもらいました。  

> [Windows10 テクニカルプレビューをVirtualBoxにインストールする方法](http://whois.hatenablog.com/entry/2015/03/27/113645)

※個人的な最低限のアプリのみ。  
※OKかどうかは単に「起動した」という時点までの確認。  
※**結局のところ動かないものはなさそうだった。**


### 追記（2015/08/10）

実際にWindows10にアップグレードして数日が経ったけど、以下全てのアプリケーションは特に問題なく動いている。  



## **[Sublime Text 2](http://www.sublimetext.com/2) ver 2.0.2** ・・・ **OK**

[Package Control](https://packagecontrol.io/)入れて[SFTPプラグイン](https://packagecontrol.io/packages/SFTP)入れるまで確認。  
何度かPackage Controlの警告っぽいのが出たけど動く。  
[![Windows10でのSublime Text 2](https://lh3.googleusercontent.com/rlDwFPV0cyDgkFKY6eedYMNTJU9be7cU_SkStAia8Ko=w689-h575-no)](https://lh3.googleusercontent.com/rlDwFPV0cyDgkFKY6eedYMNTJU9be7cU_SkStAia8Ko=w689-h575-no)


## **[Sublime Text 3](http://www.sublimetext.com/3) build 3083** ・・・ **OK**

[Package Control](https://packagecontrol.io/)入れて[SFTPプラグイン](https://packagecontrol.io/packages/SFTP)入れるまで確認。  
[![Windows10でのSublime Text 3](https://lh3.googleusercontent.com/IAU-ymYV-Pzy0AaloYlioT50g2p2iBX2oZ2IZqeQEH4=w692-h578-no)](https://lh3.googleusercontent.com/IAU-ymYV-Pzy0AaloYlioT50g2p2iBX2oZ2IZqeQEH4=w692-h578-no)

## **[Atom](http://atom.io) ver 0.205** ・・・ **OK**

起動まで確認。  
[![Windows10でのAtom](https://lh3.googleusercontent.com/PE1Kx20NQytqB-BogsGwgbmzaaPo1wO_S-lJiHQYTzk=w891-h679-no)](https://lh3.googleusercontent.com/PE1Kx20NQytqB-BogsGwgbmzaaPo1wO_S-lJiHQYTzk=w891-h679-no)


## **[Git for Windows](http://atom.io) ver 1.9.5** ・・・ **OK**

起動まで確認。  
[![Windows10でのGit for Windows](https://lh3.googleusercontent.com/tB_fEPPJfWyUvjlSFUln7re5iiOK3qHQFyPxZRD-rnE=w683-h492-no)](https://lh3.googleusercontent.com/tB_fEPPJfWyUvjlSFUln7re5iiOK3qHQFyPxZRD-rnE=w683-h492-no)


## **[XAMPP](http://www.chiark.greenend.org.uk/~sgtatham/putty/index.html) ver 3.2.1** ・・・ **OK**

Apache、MySQL起動まで確認。  
[![Windows10でのXAMPP](https://lh3.googleusercontent.com/fmLzKFaDmkGn0ArPD9GrmvvOiHv3r90Fh0v7mt5GK-M=w768-h506-no)](https://lh3.googleusercontent.com/fmLzKFaDmkGn0ArPD9GrmvvOiHv3r90Fh0v7mt5GK-M=w768-h506-no)

## **[秀丸エディタ](http://hide.maruo.co.jp/software/hidemaru.html) ver 8.52** ・・・ **OK**

まだバリバリ愛用中w　起動まで確認。  
[![Windows10での秀丸エディタ](https://lh3.googleusercontent.com/-kS4svYzhHsn-lqlZtXEaJKqtrVWreptSLmkdXSxKdM=w841-h559-no)](https://lh3.googleusercontent.com/-kS4svYzhHsn-lqlZtXEaJKqtrVWreptSLmkdXSxKdM=w841-h559-no)

## **[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/index.html) ver 0.64** ・・・ **OK**

起動して特定ホストに接続するまで確認。  
[![Windows10でのPuTTY](https://lh3.googleusercontent.com/PKuwq_6BhwaK5YfULoKfaisLVZ0ryb271Yoo2jGlUOE=w493-h415-no)](https://lh3.googleusercontent.com/PKuwq_6BhwaK5YfULoKfaisLVZ0ryb271Yoo2jGlUOE=w493-h415-no)


## **[WinSCP](http://winscp.net/eng/docs/lang:jp) ver 5.7.3** ・・・ **OK**

起動して特定サーバーに接続するまで確認。  
[![Windows10でのWinSCP](https://lh3.googleusercontent.com/wOJsRmjExknKKw5jJJI1lW9ErAcq8SALuc2rZmWcz_E=w663-h458-no)](https://lh3.googleusercontent.com/wOJsRmjExknKKw5jJJI1lW9ErAcq8SALuc2rZmWcz_E=w663-h458-no)


## **[HeidiSQL](http://www.heidisql.com/) ver 9.2** ・・・ **OK**

起動して特定サーバーに接続するまで確認。あんまり使ってる人いないかもだけど。  
[![Windows10でのHeidiSQL](https://lh3.googleusercontent.com/NaJ_AeuE6MV7R1phMQapW56EsbLwfHFLoB6O8TgH4_s=w722-h452-no)](https://lh3.googleusercontent.com/NaJ_AeuE6MV7R1phMQapW56EsbLwfHFLoB6O8TgH4_s=w722-h452-no)


## **その他（[OneGet](https://oneget.org) にて）**

Windows 10 からはパッケージマネージャとして「OneGet」が標準装備。  
デフォルトではプロバイダに[Chocolatey](https://chocolatey.org/)がないので、[ここの説明](https://github.com/OneGet/oneget/wiki/cmdlets)にしたがって組み込んで、プログラミング系のものを入れてみた。  
[![Windows10でのOneGetの結果](https://lh3.googleusercontent.com/g04zjpoKj7A7Md-LQUgvp5oUGmMoS0PKKHwdtIAWqpA=w716-h443-no)](https://lh3.googleusercontent.com/g04zjpoKj7A7Md-LQUgvp5oUGmMoS0PKKHwdtIAWqpA=w716-h443-no)

-----

Windows 10 自体は（VirtualBox上だけど）わりとサクサク動く感じだった。  
IEに取って代わったSpartanは本当にWebのブラウズのみ特化した感じ。  
Windowsストア（β）はまだまだ業務系アプリが少なくて今のところ用なしだった。  
あとは、シャットダウン系のボタンがなぜか「仕事率」という名前だったり、  
Windowsボタン（画面左下のやつ）が効かなくなったり、  
Spartanがいつのまにか終了してたり、  
ダウンロードファイルの検証に10分ほどかかったり（で結局ダウンロードできなかったり）、  
各種アプリがなかなか起動しなかったり（PowerShellの起動に5分ほどかかった）  
・・・といったところがあったので、まだ不安なところもあるかな・・・
