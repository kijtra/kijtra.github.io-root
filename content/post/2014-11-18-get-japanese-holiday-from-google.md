---
title: "PHPで日本の祝日のJSONをGoogleカレンダーから取得する（API認証等不要）"
slug: "get-japanese-holiday-from-google"
date: "2014-11-18T10:23:00+09:00"
description: "GoogleカレンダーAPIのV2までは普通にRESTでデータが取れたんだけど、2014/11/17 にサポート終了して取れなくなったので別の方法をメモ。"
tag: ["Google"]
---

GoogleカレンダーAPIのV2までは普通にRESTでデータが取れたんだけど、2014/11/17 にサポート終了して取れなくなったので別の方法をメモ。  

<!--more-->

## 追記（2015/12/09）

これまで使えていた[GoogleカレンダーのJSONフィード](https://www.google.com/calendar/feeds/japanese__ja@holiday.calendar.google.com/public/basic)が403エラーにされてしまった模様・・・。  
しょうがないので[iCal形式のものを取得する方法を追記↓](#ical)。  

-----

先日、Googleカレンダー祝日データフィードを取得する部分でエラーが出ていたので調べてみると、[2014/11/17でサポート終了してた](https://developers.google.com/google-apps/calendar/v2/developers_guide_protocol)w。  
取得元のカレンダーIDは「**ja.japanes#holiday@group.v.calendar.google.com**」から取得してたんだけど、このカレンダーIDの情報を取得するには認証が必要になった。  
なので、執筆時点でまだパブリックに取得できる「**japanese__ja@holiday.calendar.google.com**」の方でやることにした。  
祝日を取得するためだけにGoogleのライブラリとか使って苦労したくなかったので・・・  

```php
<?php
function japan_holiday() {
    // カレンダーID
    $calendar_id = urlencode('japanese__ja@holiday.calendar.google.com');

    // 取得期間
    $start  = date("Y-01-01\T00:00:00\Z");
    $end = date("Y-12-31\T00:00:00\Z");

    $url = 'https://www.google.com/calendar/feeds/'.$calendar_id.'/public/basic';
    $url .= '?start-min='.$start;
    $url .= '&start-max='.$end;
    $url .= '&max-results=30';
    $url .= '&alt=json';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    if (!empty($result)) {
        $json = json_decode($result, true);
        if (!empty($json['feed']['entry'])) {
            $datas = array();
            foreach ($json['feed']['entry'] as $val) {
                $date = preg_replace('#\A.*?(2\d{7})[^/]*\z#i', '$1', $val['id']['$t']);
                $datas[$date] = array(
                    'date' => preg_replace('/\A(\d{4})(\d{2})(\d{2})/', '$1/$2/$3', $date),
                    'title' => $val['title']['$t'],
                );
            }
            ksort($datas);
            return $datas;
        }
    }
}
```

[一応Gistにも作った。](https://gist.github.com/kijtra/be06c07b1d416469108f)  

上記の関数を実行すると、以下のような結果で返ってくる。  

```php
<?php

array (
  20140101 =>
  array (
    'date' => '2014/01/01',
    'title' => '元日',
  ),
  20140113 =>
  array (
    'date' => '2014/01/13',
    'title' => '成人の日',
  ),
  20140211 =>
  array (
    'date' => '2014/02/11',
    'title' => '建国記念の日',
  ),
  20140321 =>
  array (
    'date' => '2014/03/21',
    'title' => '春分の日',
  ),
  20140429 =>
  array (
    'date' => '2014/04/29',
    'title' => '昭和の日',
  ),
  20140503 =>
  array (
    'date' => '2014/05/03',
    'title' => '憲法記念日',
  ),
  20140504 =>
  array (
    'date' => '2014/05/04',
    'title' => 'みどりの日',
  ),
  20140505 =>
  array (
    'date' => '2014/05/05',
    'title' => 'こどもの日',
  ),
  20140506 =>
  array (
    'date' => '2014/05/06',
    'title' => 'みどりの日 振替休日',
  ),
  20140721 =>
  array (
    'date' => '2014/07/21',
    'title' => '海の日',
  ),
  20140915 =>
  array (
    'date' => '2014/09/15',
    'title' => '敬老の日',
  ),
  20140923 =>
  array (
    'date' => '2014/09/23',
    'title' => '秋分の日',
  ),
  20141013 =>
  array (
    'date' => '2014/10/13',
    'title' => '体育の日',
  ),
  20141103 =>
  array (
    'date' => '2014/11/03',
    'title' => '文化の日',
  ),
  20141123 =>
  array (
    'date' => '2014/11/23',
    'title' => '勤労感謝の日',
  ),
  20141124 =>
  array (
    'date' => '2014/11/24',
    'title' => '勤労感謝の日 振替休日',
  ),
  20141223 =>
  array (
    'date' => '2014/12/23',
    'title' => '天皇誕生日',
  ),
)
```

<a name="ical" id="ical"></a>
## iCal形式のものから取得する追記（2015/12/09）

JSON形式が取得できなかった際、iCal形式のものを使うしかない。  
iCal形式は `start-date` など日付の指定ができないけど、Googleのものは前後3年分が取得できる模様。  

以下の関数で、戻ってくる結果の配列はJSONのものと同じ。

```php
<?php
function japan_holiday_ics() {
    // カレンダーID
    $calendar_id = urlencode('japanese__ja@holiday.calendar.google.com');

    $url = 'https://calendar.google.com/calendar/ical/'.$calendar_id.'/public/full.ics';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    if (!empty($result)) {
        $items = $sort = array();
        $start = false;
        $count = 0;
        foreach(explode("\n", $result) as $row => $line) {
            // 1行目が「BEGIN:VCALENDAR」でなければ終了
            if (0 === $row && false === stristr($line, 'BEGIN:VCALENDAR')) {
                break;
            }

            // 改行などを削除
            $line = trim($line);

            // 「BEGIN:VEVENT」なら日付データの開始
            if (false !== stristr($line, 'BEGIN:VEVENT')) {
                $start = true;
            } elseif ($start) {
                // 「END:VEVENT」なら日付データの終了
                if (false !== stristr($line, 'END:VEVENT')) {
                    $start = false;

                    // 次のデータ用にカウントを追加
                    ++$count;
                } else {
                    // 配列がなければ作成
                    if (empty($items[$count])) {
                        $items[$count] = array('date' => null, 'title' => null);
                    }

                    // 「DTSTART;～」（対象日）の処理
                    if(0 === strpos($line, 'DTSTART;VALUE')) {
                        $date = explode(':', $line);
                        $date = end($date);
                        $items[$count]['date'] = $date;
                        // ソート用の配列にセット
                        $sort[$count] = $date;
                    }

                    // 「SUMMARY:～」（名称）の処理
                    elseif(0 === strpos($line, 'SUMMARY:')) {
                        list($title) = explode('/', substr($line, 8));
                        $items[$count]['title'] = trim($title);
                    }
                }
            }
        }

        // 日付でソート
        $items = array_combine($sort, $items);
        ksort($items);

        return $items;
    }
}
```

[一応Gistにも作った。](https://gist.github.com/kijtra/be06c07b1d416469108f#file-japan_holiday_ics-php)  

ちなみにMozillaが提供してる日本の休日iCalも同じように取得できる。  
`https://www.mozilla.org/projects/calendar/caldata/JapanHolidays.ics`  
こちらは祝日名が「振替休日 / Furikae kyūjitsu / Substitute Holiday」とかなってるので、上記の関数でスラッシュ区切りの対応もしてる感じ。
