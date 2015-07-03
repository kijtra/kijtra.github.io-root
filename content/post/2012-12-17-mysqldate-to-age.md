---
title: "MySQLで日付から年齢を取得するストアドファンクション"
slug: "mysqldate-to-age"
date: "2012-12-17T00:00:00+09:00"
description: "MySQLのSELECT結果とかで生年月日とかの日付を年齢に換算するストアドファンクションを作ってみた。"
tag: ["MySQL", "Snippet"]
---

MySQLのSELECT結果とかで生年月日とかの日付を年齢に換算したい、なんてことないですかね。
関数（ストアドファンクション）にしてみました。

<!--more-->

```sql
DELIMITER //
DROP FUNCTION IF EXISTS `AGE`//
CREATE FUNCTION AGE( _DATE_ VARCHAR(20)) RETURNS INT(3)
LANGUAGE SQL NOT DETERMINISTIC READS SQL DATA
BEGIN
	DECLARE ymd INT(10) UNSIGNED;
	DECLARE age INT(3);
	SET ymd=CASE
		WHEN _DATE_ REGEXP '^[0-9]{10}$' THEN FROM_UNIXTIME(_DATE_,'%Y%m%d')
		WHEN _DATE_ REGEXP '^[0-9]{4}[0-9]{2}[0-9]{2}$' THEN _DATE_
		WHEN _DATE_ REGEXP '^[0-9]{4}[-/][0-9]{2}[-/][0-9]{2}$' THEN DATE_FORMAT(_DATE_,'%Y%m%d')
		WHEN _DATE_ REGEXP '^[0-9]{4}[-/][0-9]{2}[-/][0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$' THEN DATE_FORMAT(_DATE_,'%Y%m%d')
		ELSE NULL END;
	IF ymd IS NOT NULL THEN
		SET age=CAST(FLOOR((DATE_FORMAT(CURRENT_DATE(),'%Y%m%d')-ymd)/10000) AS UNSIGNED);
	ELSE
		SET age=NULL;
	END IF;
	RETURN age;
END;
//
```
