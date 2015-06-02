---
title: "Elasticsearch で update する時に配列に値を追加する"
slug: "elasticsearch-add-array-value-with-update"
date: "2014-05-24T00:17:00+09:00"
description: "Elasticsearchで、ドキュメントのフィールドが配列（連想配列）の場合に、そのフィールドの配列に値を追加したい。"
tag: ["Elasticsearch"]
---

Elasticsearchで、ドキュメントのフィールドが配列（連想配列）の場合に、そのフィールドの配列に値を追加したい。  

<!--more-->

参考にしたのは [Elasticsearch公式サイト](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/docs-update.html)。

## 単純な配列の場合

例としてインデックス名「 **sample** 」、タイプ名「 **mytype** 」で作成。

```sh
$ curl -XPUT 'http://localhost:9200/sample' -d '(下のJSON)'
```

```json
{
    "mappings": {
        "mytype": {
            "_source": {
                "enabled": true
            },
            "properties": {
                "name": {
                    "type": "string"
                },
                "tags": {
                    "type": "string" <「string」で良い
                }
            }
        }
    }
}
```

### まずは普通にデータを入れる

```sh
$ curl -XPUT 'http://localhost:9200/sample/mytype/1' -d '(下のJSON)'
```

```json
{
    "name": "データ1",
    "tags": ["hoge"] <ここに値を追加したい
}
```

### updateしてみる (失敗例)

```sh
$ curl -XPOST 'http://localhost:9200/sample/mytype/1/_update' -d '{"tags": ["fuga"]}'
```

上記でupdate後に検索してみると、結果は以下のように、「tags」に指定した値が単純に置き換わってしまう。

```json
{
   "hits": {
      "total": 1,
      "max_score": 1,
      "hits": [
         {
            "_index": "sample",
            "_type": "mytype",
            "_id": "1",
            "_score": 1,
            "_source": {
               "name": "データ1",
               "tags": ["fuga"] <「hoge」は残らない
            }
         }
      ]
   }
}
```



### 解決策

この場合は「 `script` 」という機能を使って、JavaScriptで配列に追加することができる。  
さらに、「 `upsert` 」という機能で、未登録のドキュメントなら新規登録扱いにできる。  
（MySQLでいう ON DUPLICATE KEY UPDATE ）

```sh
$ curl -XPOST 'http://localhost:9200/sample/mytype/1/_update' -d '(下のJSON)'
```

```json
{
  "params" : {
    "val" : "fuga"
  },
  "script" : "ctx._source.tags += val",
  "upsert": {
    "name": "データ1",
    "tags": ["fuga"]
  }
}
```

`params` で設定したキーのもの(上記では `val` )が、 `script` 内で使えるようになっている。  
（JavaScriptだけど `push()` ではなく `+=` な点に注意）  
ドキュメントがない場合は `upsert` に設定したものが挿入される。  
なので、最初にデータを入れておく必要はない。  

その結果、以下のようになる。

```json
{
   "hits": {
      "total": 1,
      "max_score": 1,
      "hits": [
         {
            "_index": "sample",
            "_type": "mytype",
            "_id": "1",
            "_score": 1,
            "_source": {
               "name": "データ1",
               "tags": [
                   "hoge",
                   "fuga" <追加できた
               ]
            }
         }
      ]
   }
}
```

<br><br>

## 重複しないようにしたい

前述のように `upsert` を繰り返していると、配列に同じ値がどんどん入ってしまいがち。  
その場合、連想配列にする。（他の方法がわからなかった）  

※これは連想配列にする必要はなかった。 [下に追記あり](#added1)

フィールドに連想配列を入れるには、マッピングで `object` に設定する必要がある。

```sh
$ curl -XPUT 'http://localhost:9200/sample' -d '(下のJSON)'
```

```json
{
    "mappings": {
        "mytype": {
            "_source": {
                "enabled": true
            },
            "properties": {
                "name": {
                    "type": "string"
                },
                "tags": {
                    "type": "object" <ここが最初と違う
                }
            }
        }
    }
}
```

そして upsert する

```sh
$ curl -XPOST 'http://localhost:9200/sample/mytype/1/_update' -d '(下のJSON)'
```

```json
{
  "params" : {
    "val" : "hoge"
  },
  "script" : "ctx._source.tags[val] = val",
  "upsert": {
    "name": "データ1",
    "tags": {
      "hoge": "hoge"
    }
  }
}
```

`ctx._source.tags[val] = val` の部分で同じ値は上書きするようにしてる。  

さらに upsert (「tags」に「fuga」を追加) を2回やってみる

```sh
$ curl -XPOST 'http://localhost:9200/sample/mytype/1/_update' -d '(下のJSON)'
```

```json
{
  "params" : {
    "val" : "fuga"
  },
  "script" : "ctx._source.tags[val] = val",
  "upsert": {
    "name": "データ1",
    "tags": {
      "fuga": "fuga"
    }
  }
}

//もっかい同じデータ
{
  "params" : {
    "val" : "fuga"
  },
  "script" : "ctx._source.tags[val] = val",
  "upsert": {
    "name": "データ1",
    "tags": {
      "fuga": "fuga"
    }
  }
}
```

その結果、以下のようになる。

```json
{
   "hits": {
      "total": 1,
      "max_score": 1,
      "hits": [
         {
            "_index": "sample",
            "_type": "mytype",
            "_id": "1",
            "_score": 1,
            "_source": {
               "name": "データ1",
               "tags": {
                   "hoge": "hoge",
                   "fuga": "fuga" <重複せず追加できた
               }
            }
         }
      ]
   }
}
```

ちなみに **特定の配列だけ削除** する方法は不明・・・。  
update時に連想配列の値を null にしたり、JavaScriptの `delete` 使ったりしてみたけど無理だった。  
データ取得 -> 値を削除 -> 上書きupdateするしかなさそう。  

- - -

<a name="added1"></a>
## 追記：配列が重複登録されない方法あった

インデックス作成

```sh
$ curl -XPUT 'http://localhost:9200/sample' -d '(下のJSON)'
```

```json:インデックス作成
{
    "mappings": {
        "mytype": {
            "_source": {
                "enabled": true
            },
            "properties": {
                "name": {
                    "type": "string"
                },
                "tags": {
                    "type": "string" <「string」で良い
                }
            }
        }
    }
}
```

<br>update (insert)

```sh
$ curl -XPOST 'http://localhost:9200/sample/mytype/1/_update' -d '(下のJSON)'
```

```json
{
  "params" : {
    "val" : "hoge"
  },
  "script" : "if(ctx._source.tags.indexOf(val)==-1){ctx._source.tags+=val}",
  "upsert": {
    "name": "データ1",
    "tags": {
      "hoge": ["hoge"]
    }
  }
}
```

JavaScript部分で `indexOf` 使って配列を検索できるっぽいので、見つかれば入れない、なければ入れる。  
連想配列にしなくてもこれでいけた。

<br>以下はファセット検索の例

```sh
$ curl -XGET 'http://localhost:9200/sample/mytype/_search?search_type=count' -d '(下のJSON)'
```

```json
{
  "facets": {
      "ids": {
          "terms": {
              "field" : "tags",
              "size": 10,
              "order" : "count"
          }
      }
  }
}
```

```json
{
  "facets": {
    "ids": {
       "_type": "terms",
       "missing": 0,
       "total": 3,
       "other": 0,
       "terms": [
          {
             "term": "hoge",
             "count": 2
          },
          {
             "term": "fuga",
             "count": 1
          }
       ]
    }
  }
}
```
