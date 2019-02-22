# vue-duoguo
This is a multi language plugin for Vue.js that help you load different language string file automatically. Include vue-duoguo.js after and just Vue.js 2.x, vue-duoguo don`t need other packages, so if your page only include Vue.js but not VueX / vue-router / others ... vue-duoguo can still work correctly, espeically develop on ES5 javascript.
<br>
(Chinese) 這是一個多國語言套件給 Vue.js 用來幫助你載入語言檔並替換文字。只需引入 vue-duoguo.js 於 Vue.js 之後並不需要搭配其他套件，特別適合 ES5 時代開發者。

## Requirements
- Vue ^2.0.0

## Include
```html
//Include Vue.js before vue-duoguo.js
<script type="text/javascript" src="./lib/vue.js"></script>
<script type="text/javascript" src="./lib/vue-duoguo.js"></script>
```

## Mode and Type
The vue-duoguo plugin support 2 mode to load multi language string:
- file: file in the server, maybe js or json.
- obj: object variable in the code, if you give path an object variable.

and then file mode support 2 type of string file:
- js: javascript file (*.js)
- json: json file (*.json)

(Chinese) vue-duoguo 支援兩種模式: 讀檔案或讀變數。讀檔案又可支援兩種字串檔格式: .js檔及 .json 檔。

## Demo site
Click the links to check examples and used products of vue-duoguo:

* [Load javascript string example](https://melixyen.github.io/vue-duoguo/index.html)
* [(Used Products) Taiwan bus smart stop QR Code creator Web App](http://melixyen.github.io/railtime/busp.html#/)

## Setup
Before your program inititated, it mean before body onload, document.readyState not complete, call the method **VueDuoGuo.setConfig({ ... })** to setup your multi language file path and replace name rule.
<br>
(Chinese) 請在初始化前執行 **VueDuoGuo.setConfig({ ... })** 設定您的多國語言檔案路徑與檔名規則。

#### Setup method example
String in javascript file:
```javascript
VueDuoGuo.setConfig({
	lang: 'en',
	path: "./lang_js",
	filename: "{lang}.js",
	global: "_LANG",
	autoload: true,
	autoCallback: function(opt, langString){
		initFn();
	}
})
```

String in json file:
```javascript
VueDuoGuo.setConfig({
	lang: "en",
	path: "./lang_json",
	filename: "{lang}.json",
	global: "_LANG",
	autoload: true,
	autoCallback: function(opt, langString){
		initFn();
	}
})
```

String in object variable:
```javascript
const _ALL_LANG = {
    en: {
        str1: "Hello",
        str2: "World",
        str3: "Basic"
    },
    cht: {
        str1: "你好",
        str2: "世界"
    }
};

VueDuoGuo.setConfig({
    lang: "en",
    baseLang: "en",
	path: _ALL_LANG,
	global: "_LANG",
	autoload: true,
	autoCallback: function(){
		initFn();
	}
})
```

#### Config
Name | Type | Description
-----|------|-------------
lang |string|Default display language key value.
baseLang |string|Optional, a language key value. Like the object variable example, *cht* without str3, so when user change to cht, vue-duoguo will use **en.str3** to fill **cht.str3** automatically.
path|string<br>object|If it is a string, vue-duoguo will combine with filename to load file. If it is an object variable, vue-duoguo will use to be the full language source.
filename|string|Optinal, Language string filename maybe en.js, cht.js ... please set it like **{lang}.js** let **{lang}** to be a replacement string. lang_en_min.js can write with lang_{lang}_min.js
autoload|boolean|Optinal, If you want vue-duoguo load language file on setConfig completed please set value to **true**. Default is false.
autoCallback|function|Optinal, A callback function when autoload is true and string file loaded.
global|string|Language global variable name, for json or object variable. If value is **"_LANG"**, vue-duoguo will save language object to **window["_LANG"]** (window._LANG).
component|string|Optinal, sync language object every Vue.component data variable.
localStorage|string|Optinal, binding a localStorage item name, when language changed will do **localStorage.setItem(name, lang)**. Note: if this value is exist, vue-duoguo will use the lang value to replace config.lang when auto load language file, because it mean the user ever change to some language.
type|string|Optional, default will be empty and vue-duoguo can auto detect your file ext name is js or json.But sometimes, your language maybe load by a PHP url like */lang/export.php?lang=en*, you need set a type to tell vue-duoguo what format is it.
beforehange|function|Optional, event callback when language file loaded and before call Vue component update.
changed|function|Optional, event callback after language file loaded and Vue component updated.
#### 設定參數 (Chinese api doc)
Name | Type | Description
-----|------|-------------
lang |string|初始值為何種語系.
baseLang |string|Optional, 基礎語系。如前例，*cht* 沒有 str3，所以當切換成cht時，vue-duoguo 將使用 **en.str3** 補上 **cht.str3**。
path|string<br>object|若是 string, vue-duoguo 將會和 filename 合組成路徑載入語言檔。若是 object 變數，vue-duoguo 會直接把它視為完整的語言來源進行操作。
filename|string|Optinal, 檔名可能像 en.js, cht.js ... 請填入類似 **{lang}.js** 字串讓 **{lang}** 作為變數名稱替換。lang_en_min.js 可以寫為 lang_{lang}_min.js
autoload|boolean|Optinal, 如果設成 **true** 會在設定完成時自動幫您第一次載入語言檔。預設是 false。
autoCallback|function|Optinal, 一個 callback function 給 autoload 為 true 並載入完成時呼叫，可以用來呼叫初始化程式。
global|string|全域變數名稱，給 json 或 object variable 載完後存放資料。例如值是 **"_LANG"**，vue-duoguo 會將數據存在 **window["_LANG"]** (window._LANG).
component|string|Optinal, 會將字串物件以這個名字傳入每一個 Vue.component 的 data 內
localStorage|string|Optinal, 綁定一個 localStorage item name，當切換語系時將執行 **localStorage.setItem(name, lang)**。請注意: 若有值，vue-duoguo 將使用這個 key 替換 config.lang 的值作為 auto load 要載入的語系檔，因為這代表使用者曾經選擇過。
type|string|Optional, 預設是空的因為 vue-duoguo 可以自動偵測副檔名是 js 或 json。不過有時候語言檔可能是載入自 PHP url 例如 */lang/export.php?lang=en*，此時必需設定 type 來告知 vue-duoguo 這是什麼格式。
beforehange|function|Optional, 事件，在語言檔載入完成後但畫面尚未更新前觸發執行。
changed|function|Optional, 事件，語系替換後觸發執行。

#### Special example
```javascript
//Load by PHP file format `/lang/export.php?lang=en`
VueDuoGuo.setConfig({
    path: '/lang/',
    filename: 'export.php?lang={lang}',
    type: 'json'
})

//Load by service uri `/api/export/lang/en/json`
VueDuoGuo.setConfig({
    path: '/api/export/lang/',
    filename: '{lang}/json',
    type: 'json'
})
```

## Method
#### change: function
vue-duoguo provides a solution replace language file and do not need to set special key or function in the template, you can write easily like:
```html
	<div class="topFlex">
		<div class="langBtn" v-on:click="changeLang('en')">{{_LANG.str001}}</div>
		<div class="langBtn" v-on:click="changeLang('cht')">{{_LANG.str002}}</div>
		<div class="langBtn" v-on:click="changeLang('jp')">{{_LANG.str003}}</div>
	</div>
```
```javascript
Vue.component('cmp-form', {
    template: '<div>' +
        '<top-flex></top-flex>' +
		'<div class="formCmp"><h2> {{ _LANG.str022 }} </h2></div>' +
		'<div class="formCmp"><input type="text" v-bind:placeholder="_LANG.str023"></div>' +
		'<div class="formCmp">' +
			'<select style="max-width:600px;">' +
				'<option v-for="opt in select1" v-bind:value="opt"> {{ _LANG[opt] }} </option>' +
			'</select>' +
		'</div>' +
	'</div>',
	data: function(){return {
		intpu1: '',
		select1: ['str024','str025','str026']
    }},
    methods: {
        changeLang: function(){
            Vue.duoguo.change("cht");
        }
    }
});
```
and when you call **Vue.duoguo.change('lang')**, all component will update string to new language.

(Chinese) vue-duoguo 提供一個多國語系解決方案，不需要設定特殊的 key 或使用 function 包住字串，請照平常的寫法寫到模板即可，如常讓 {{ 變數 }} 顯示你的字串，切換語言時呼叫 **Vue.duoguo.change('lang')** 即可幫您搞定。

<br>

When user change language, please call method like:
```javascript
// No callback
Vue.duoguo.change("cht");

// Callback
Vue.duoguo.change("jp", function(event, string){
    if(event.status == VueDuoGuo.CONST_STATE_SUCCESS){
        alert(_LANG.ALREADY_CHANGE_LANGUAGE);
    }else if(event.status == VueDuoGuo.CONST_STATE_FAIL){
        alert(_LANG.COMMON_FAIL);
    }
});
```
(Chinese) 呼叫範例

<br>

#### update:function
If you rewrite some language variable like **_LANG.str001 = "Hello Work..."** and you just want do update, you can call:
```javascript
Vue.duoguo.update();
```
(Chinese) 因故重設部分語言變數內容時，您可只呼叫 update。

#### getLanguageString:function
Return an object that is now used language variable.
<br>
(Chinese) 回傳目前用的語言檔物件變數
```javascript
var lang = Vue.duoguo.getLanguageString();
//lang = {str1:"Hello", str2:"World", str3:"Earth", ...}
```

Thanks for read
===

Why her name is vue-duoguo ? DuoGuo means **multiple country** in Chinese, usually refers to multi language in web design. So VueDuoGuo means `Support multi language in Vue.js` .