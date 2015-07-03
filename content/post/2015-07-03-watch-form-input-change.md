---
date: "2015-07-03T16:20:45+09:00"
slug: "watch-form-input-change"
tag: ["jQuery", "JavaScript", "Form"]
title: "ページ移動時にフォームの内容に変更があれば警告を出すアレ"
description: "ページの移動や更新の時、フォームの入力内容に変更があった場合に警告を出すjQueryプラグインをシンプルに作ってみた。"
---

ページの移動や更新の時、フォームの入力内容に変更があった場合に「**移動してよろしいですか？**」みたいな警告が出るのをたまに見る。（アレなんか名前があるのかな…？）  
jQueryでシンプルに作れそうだったので作ってみた。

<!--more-->

```js
(function($) {
    // 警告のメッセージ
    var message = '入力内容が一部変更済みです';

    // 対象フォーム格納用jQueryオブジェクト
    var forms = $();

    // デフォルト値
    var defaults = '';

    // window.beforeunload適用済みかどうかのフラグ
    var initialized = false;

    // フォームでのSubmit時だけは警告を出さないためのフラグ
    var submit = false;

    // プラグイン本体
    $.fn.watchInputChange = function(options) {
        var form = this;

        $(function() {
            // Submit時にフラグを立てる
            form.on('submit.wic', function() {
                submit = true;
                // Ajaxフォームの場合はonBeforeUnloadが動かないので
                // 0.5秒後に元に戻す（ビミョー実装）
                setTimeout(function() {
                    submit = false;
                }, 500);
            });

            // 対象フォームをjQueryオブジェクトに追加
            forms = forms.add(form);

            // デフォルト値をセット
            defaults = forms.serialize();

            // window.beforeunload適用（初回のみ）
            if (!initialized) {
                initialized = true;
                $(window).on('beforeunload.wic', function() {
                    // フォームでのSubmitの場合は無視
                    if (submit) {
                        submit = false;
                        return;
                    }

                    // 対象フォームの現データとデフォルト値を比較
                    if (forms.serialize() !== defaults) {
                        // 違いがあればメッセージ表示
                        return message;
                    }
                });
            }
        });

        return forms;
    };
})(jQuery);
```

`onBeforeUnload` で旧フォーム内容と比較してるだけ。  
使い方は以下のようなかんじ。

```html
<form>
    ...フォーム内容...
</form>

<form>
    ...複数フォームもOK...
</form>

<script src="jQueryのパス"></script>
<script>
$('form').watchInputChange();
</script>
```


ページを離れるケースとしては

- リンクで遷移
- 戻るボタン
- リロード
- ウインドウまたはタブを閉じる
- フォーム送信

といったところなんだけど、フォーム送信で発火するとウザいので onSubmit 時にフラグを立ててなんとかする必要があった。  
しかもAjax仕様のフォームの場合、ページ遷移がなくフラグが立ったままになってしまうため、 `setTimeout` で強引に戻してる・・・  
このあたりはうまい方法が思いつかなかった。  

あとたぶんIE9以上なら大丈夫だと思う。  
IE8以下はたしか onBeforeUnload が効かなかったような。
