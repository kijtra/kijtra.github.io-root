---
title: "PHPで日本の祝日のJSONをGoogleカレンダーから取得する（API認証等不要）"
slug: "get-japanese-holiday-from-google"
date: "2014-11-18T10:23:00+09:00"
description: "GoogleカレンダーAPIのV2までは普通にRESTでデータが取れたんだけど、2014/11/17 にサポート終了して取れなくなったので別の方法をメモ。"
tag: ["Google"]
---

GoogleカレンダーAPIのV2までは普通にRESTでデータが取れたんだけど、2014/11/17 にサポート終了して取れなくなったので別の方法をメモ。  

<!--more-->

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

	$url = "https://www.google.com/calendar/feeds/{$calendar_id}/public/basic?start-min={$start}&start-max={$end}&max-results=30&alt=json";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ;
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
