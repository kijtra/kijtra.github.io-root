---
title: "旧暦や六曜など日付に関する情報を取得できるAPIを作ってみた"
date: "2015-06-19T15:08:36+09:00"
slug: "date-info-api-v1"
tag: ["Others", "Data"]
description: "指定した日付に関する様々な（「今日は何の日」的な）情報を取得するシンプルなAPIを（自分のために）作ってみた。"
---

指定した日付に関する様々な（「今日は何の日」的な）情報を取得するシンプルなAPIを（自分のために）作ってみた。  

<!--more-->

例えば「今日の六曜（大安とかそういうの）は？」といった場合、まずは旧暦の日付を求める必要がある。  
[旧暦の計算](https://ja.wikipedia.org/wiki/%E6%97%A7%E6%9A%A6#.E3.80.8C.E6.97.A7.E6.9A.A6.E3.80.8D.E3.81.AE.E8.A8.88.E7.AE.97)なんかはすごく面倒くさいため、単に六曜を表示するだけでも大掛かりっぽくなってしまう。  
しかもそういったAPIがみつからなかったので、もう作ってしまえということで。

## エンドポイント

`https://dateinfoapi.appspot.com/v1`

「http」（「s」なし）でもOK。

## リクエストパラメータ

JSONPを使用しない場合、Access-Control-Allow-Originを `*` に設定しているため直接取得できると思います。

<div class="table">
    <table>
        <thead>
            <tr>
                <th>パラメータ</th>
                <th>説明</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th class="w30">date</th>
                <td>
                    日付 （例）2015-06-19<br>
                    省略時は現在の日になります。
                    <div class="help">
                        ※ Pythonの <a href="https://dateutil.readthedocs.org/en/latest/">dateutil</a>ライブラリを使用しているので、dateutilライブラリが<a href="https://dateutil.readthedocs.org/en/latest/examples.html#parse-examples" target="_blank" rel="nofollow">パースできる形式</a>ならなんでもOKです。<br>
                        ※ 1900年以降にしか対応していません。
                    </div>
                </td>
            </tr>
            <tr>
                <th class="w30">callback</th>
                <td>
                    JSONPで取得する際に使用してください
                </td>
            </tr>
        </tbody>
    </table>
</div>

### リクエスト例

通常  
[`https://dateinfoapi.appspot.com/v1?date=2015-06-19`](https://dateinfoapi.appspot.com/v1?date=2015-06-19)  

JSONPの場合  
[`https://dateinfoapi.appspot.com/v1?date=2015-06-19&callback=function_name`](https://dateinfoapi.appspot.com/v1?date=2015-06-19&callback=function_name)


## レスポンスパラメータ

レスポンスのフォーマットはJSONのみです。値がない場合は `null` が入ります。

<div class="table">
    <table>
        <thead>
            <tr>
                <th>パラメータ</th>
                <th>型</th>
                <th>説明</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th nowrap="nowrap">century</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日が何世紀か
                    <div class="help">
                        （例）21
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">date</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の日付<small>（YYYY-MM-DD形式）</small>
                    <div class="help">
                        （例）2015-06-19
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">date_ja</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の日本語の日付<small>（YYYY年M月D日(W)形式）</small>
                    <div class="help">
                        （例）2015年6月19日(金)
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">day</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の日
                    <div class="help">
                        （例）19
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">eto</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の干支
                    <div class="help">
                        （例）未
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">eto_kana</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の干支のよみがな
                    <div class="help">
                        （例）ひつじ
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">gengo</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の元号
                    <div class="help">
                        （例）平成
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">gengo_full</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の元号に年を加えたもの
                    <div class="help">
                        （例）平成27年
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">holiday</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日が<a href="https://ja.wikipedia.org/wiki/%E5%9B%BD%E6%B0%91%E3%81%AE%E4%BC%91%E6%97%A5" target="_blank" rel="nofollow">国民の休日</a>の場合はその名称
                    <div class="help">
                        （例）みどりの日
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">julian</th>
                <td nowrap="nowrap">float</td>
                <td>
                    指定日の<a href="https://ja.wikipedia.org/wiki/%E3%83%A6%E3%83%AA%E3%82%A6%E3%82%B9%E9%80%9A%E6%97%A5" target="_blank" rel="nofollow">ユリウス日</a>
                    <div class="help">
                        （例）2457192.5
                    </div>
                </td>
            </tr>
            <tr>
                <th nowrap="nowrap">month</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の月
                    <div class="help">
                        （例）6
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">month_en</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の月の英名（すべて小文字）
                    <div class="help">
                        （例）june
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">month_ja</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の月の陰暦名
                    <div class="help">
                        （例）文月
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">month_end</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の月の月末日
                    <div class="help">
                        （例）31
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">moon</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の<a href="https://ja.wikipedia.org/wiki/%E6%9C%88%E7%9B%B8" target="_blank" rel="nofollow">月相</a>（月齢）数。0～27（28でないことに注意）の数値。
                    <div class="help">
                        （例）2
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">moon_en</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の月相の状態を英語で。<br>該当しない場合は <code>null</code>
                    <div class="help">
                        （例）New Moon
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">moon_ja</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の月相の状態を日本語で。<br>該当しない場合は <code>null</code>
                    <div class="help">
                        （例）新月
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">old_date</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日から算出した旧暦の日付<small>（YYYY-MM-DD形式）</small>
                    <div class="help">
                        （例）2015-05-04
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">old_year</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日から算出した旧暦の年
                    <div class="help">
                        （例）2015
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">old_month</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日から算出した旧暦の月
                    <div class="help">
                        （例）5
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">old_date</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日から算出した旧暦の日
                    <div class="help">
                        （例）4
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">old_leap</th>
                <td nowrap="nowrap">boolean</td>
                <td>
                    指定日から算出した旧暦が閏月かどうか
                    <div class="help">
                        （例）false
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">rokuyo</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の<a href="https://ja.wikipedia.org/wiki/%E5%85%AD%E6%9B%9C" target="_blank" rel="nofollow">六曜</a>名
                    <div class="help">
                        （例）友引
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">season_en</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の季節を英語で（全て小文字）<br>
                    <small>※季節の分け方は<a href="https://www.nhk.or.jp/bunken/summary/kotoba/gimon/194.html" target="_blank" rel="nofollow">気象庁が決めている区分</a>です。</small>
                    <div class="help">
                        （例）summer
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">season_ja</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の季節を日本語で（全て小文字）
                    <div class="help">
                        （例）夏
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">sunrise</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の日の出の時刻<small>（YYYY-MM-DD HH:MM:SS形式）</small>
                    <div class="help">
                        （例）2015-06-19 04:25:21
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">sunrise</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の日の入りの時刻<small>（YYYY-MM-DD HH:MM:SS形式）</small>
                    <div class="help">
                        （例）2015-06-19 18:59:44
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">timezone</th>
                <td nowrap="nowrap">string</td>
                <td>
                    日付計算のタイムゾーン（「JST」固定）
                    <div class="help">
                        （例）JST
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">week</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の曜日番号<small>（0＝日曜、1＝月曜...）</small>
                    <div class="help">
                        （例）5
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">week_en</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の曜日を英語で（すべて小文字）
                    <div class="help">
                        （例）friday
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">week_ja</th>
                <td nowrap="nowrap">string</td>
                <td>
                    指定日の曜日を日本語で
                    <div class="help">
                        （例）金
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">week_number</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日がその月の第何曜日かの番号。<br>
                    例えば <code>week_number</code> が「3」で <code>week_ja</code> が「金」なら「第3金曜日」
                    <div class="help">
                        （例）3
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">week_number_of_year</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の週番号（その年の最初の日曜日から数えて第何週目か）
                    <div class="help">
                        （例）24
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">year</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の西暦での年
                    <div class="help">
                        （例）2015
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">year_ja</th>
                <td nowrap="nowrap">integer</td>
                <td>
                    指定日の和暦での年
                    <div class="help">
                        （例）27
                    </div>
                </td>
            </tr>

            <tr>
                <th nowrap="nowrap">_now</th>
                <td nowrap="nowrap">json</td>
                <td>
                    リクエスト時点の日時の情報
                </td>
            </tr>
        </tbody>
    </table>
</div>


## レスポンス例

※見やすいように整形しています。実際は改行なしです。

```json
{
    "century": 21,
    "date": "2015-06-19",
    "date_ja": "2015年6月19日(金)",
    "day": 19,
    "eto": "未",
    "eto_kana": "ひつじ",
    "gengo": "平成",
    "gengo_full": "平成27年",
    "holiday": null,
    "julian": 2457192.5,
    "month": 6,
    "month_en": "june",
    "month_end": 31,
    "month_ja": "文月",
    "moon": 2,
    "moon_en": null,
    "moon_ja": null,
    "old_date": "2015-05-04",
    "old_day": 4,
    "old_leap": false,
    "old_month": 5,
    "old_year": 2015,
    "rokuyo": "友引",
    "season_en": "summer",
    "season_ja": "夏",
    "sunrise": "2015-06-19 04:25:21",
    "sunset": "2015-06-19 18:59:44",
    "timezone": "JST",
    "week": 5,
    "week_en": "friday",
    "week_ja": "金",
    "week_number": 3.0,
    "week_number_of_year": 24,
    "year": 2015,
    "year_ja": 27,
    "_now": {
        "date": "2015-06-19",
        "datetime": "2015-06-19 06:20:13",
        "day": 19,
        "hour": 6,
        "minute": 20,
        "month": 6,
        "second": 13,
        "week": 5,
        "week_en": "friday",
        "week_ja": "金",
        "year": 2015
    }
}
```


-----

## あとがき

基本的に放置したいのと、SSLが使いたかったので[Google App Engine](https://cloud.google.com/appengine/?hl=ja)を使った。  
しかも完全無料でやるために、普段はPHPなんだけど慣れないPythonで組んだので少し時間がかかったw。  

- 旧暦の計算は[銀月の符号](http://d.hatena.ne.jp/fgshun/20091127/1259302979)さんのプログラムを使った。  
  （六曜は旧暦から取得した日付から `(月 + 日) % 6` で算出）
- 祝日の取得には[Python 用祝日判定コード](http://www.h3.dion.ne.jp/~sakatsu/holiday_logic5.htm#Python)を使わせてもらった。  
  一部動かない部分があったので `import datetime` の部分を  
  `import datetime, math, sys` に変更した。
- 月相（月齢）の計算には [Astral](https://pypi.python.org/pypi/astral/0.8.1) を使った。 [PyEphem](http://rhodesmill.org/pyephem/) というのが精度がいいみたいだけどGAEでは動かなさそうだった。
- 最も苦戦したのが「指定日がその月の第何曜日か」の部分。「第○曜日が何日か」の算出はたくさん見つかるんだけど、その逆がなかなか思いつかなくてw  
  結局 `ceil((日 + 7 - 曜日) / 7)` という簡単なことだった。
