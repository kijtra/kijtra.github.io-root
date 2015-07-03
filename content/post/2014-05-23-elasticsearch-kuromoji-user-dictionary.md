---
title: "Elasticsearch の Kuromoji でユーザー辞書を使うメモ"
slug: "elasticsearch-kuromoji-user-dictionary"
date: "2014-05-23T00:08:00+09:00"
description: "Elasticsearchでの形態素解析はKuromoji一択だけど、やや辞書が貧弱な部分もあるのでユーザー辞書で補う必要がある。"
tag: ["Elasticsearch"]
---

Elasticsearchでの形態素解析はKuromoji一択だけど、やや辞書が貧弱な部分もあるのでユーザー辞書で補う必要がある。

<!--more-->

例えば東京に「西国分寺駅」という駅があるけど、「西国分寺」で形態素解析すると「西」「国分寺」で分かれる。
読みも「サイコクブンジ」となってしまう。（正しくは「ニシコクブンジ」）
これはいただけない。

## 参考になったサイト
- [elasticsearch-analysis-kuromojiでユーザ辞書の利用方法](http://johtani.jugem.jp/?eid=123)
- [Elasticsearch 日本語で全文検索 その２](https://medium.com/hello-elasticsearch/833a0704e44b)

## 環境

- CentOS 6.4
- Elasticsearch 1.1.1
  - kuromoji 2.0.0

<br><br>

## 辞書ファイルの作成

まず辞書ファイルを作成。
普通のテキストファイルで、文字コードは **UTF-8**。拡張子は自由。
ここでは例として「my_jisho.dic」とした。

### **辞書ファイルの置き場所**

ファイルの保存先は
`/etc/elasticsearch/my_jisho.dic`
でいけた。
これはもしかしたら Elasticsearch **1.1.1** だからかも。

<small><i class="fa fa-info-circle fa-lg"></i> 他のサイト等を見ると「(Elasticsearchホーム)/cofig/my_jisho.dic」と書いているところも多かったので、はじめそこに置いてみたんだけどインデックス作成時に「/etc/elasticsearch/ に置け」とエラーが出た。</small>

### **辞書ファイルの書き方**

ファイルの中身はCSV形式で、以下の並びで書く。

```csv
単語,形態素解析後の単語,読み,品詞
```

「形態素解析後の単語」は、半角スペースで分けると分かち書きされる。

<i class="fa fa-lightbulb-o"></i> 「東京スカイツリー」の例

```csv
東京スカイツリー,東京 スカイツリー,トウキョウ スカイツリー,カスタム名詞
```

<i class="fa fa-lightbulb-o"></i> 「西国分寺」の例

```csv
西国分寺,西国分寺,ニシコクブンジ,駅名
```

<br><br>

## インデックスへの設定

サンプル用のインデックス作成

```sh
$ curl -XPUT 'http://localhost:9200/example/' -d '(下のjson)'
```

```json
{
  "settings": {
    "analysis": {
      "tokenizer": {
        "kuromoji": {
          "type": "kuromoji_tokenizer",
          "user_dictionary": "my_jisho.dic" <ここに辞書ファイル
        }
      },
      "analyzer": {
        "kuromoji_analyzer": {
          "tokenizer": "kuromoji",
          "type": "custom",
          "filter": [
            "kuromoji_baseform",
            "pos_filter",
            "greek_lowercase_filter",
            "cjk_width"
          ]
        },
        "yomigana_analyzer": {
          "tokenizer": "kuromoji",
          "type": "custom",
          "filter": [
            "katakana_readingform",
            "cjk_width"
          ]
        }
      }
    }
  }
}
```

解析してみる

```sh
$ curl -XGET 'http://localhost:9200/example/_analyze?analyzer=kuromoji_analyzer' -d '西国分寺'
```

```json
{
   "tokens": [
      {
         "token": "西国分寺",
         "start_offset": 2,
         "end_offset": 6,
         "type": "word",
         "position": 1
      }
   ]
}
```

加えて読み仮名の確認

```sh
$ curl -XGET 'http://localhost:9200/example/_analyze?analyzer=yomigana_analyzer' -d '西国分寺'
```

```json
{
   "tokens": [
      {
         "token": "ニシコクブンジ",
         "start_offset": 2,
         "end_offset": 6,
         "type": "word",
         "position": 1
      }
   ]
}
```

できた。  

駅名とかはどっかでデータがほしいけど、読み仮名までサポートしてるデータは無料では配布されてない。
あと有用そうなのとしては病名とかかなあ。
