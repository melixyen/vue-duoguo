(function(){

var DD = {};

DD.initFn = function(){
	Vue.component('top-btn', {
		template: document.getElementById('tpl_topBtn'),
		data: function(){
			return {
				flagShowEn: true,
				flagShowCht: true,
				flagShowJp: true
			}
		},
		methods: {
			changeLang: function(lang){
				Vue.duoguo.change(lang, function(){
					DD.pop.pop();
				});
			}
		}
	});
	Vue.component('type_tell', {
		template: document.getElementById('type_tell')
	});
	DD.topVM = new Vue({
		el: '#top'
	});


	var aryColor = [
		{color:'red', string: 'str004', mode: 1, article: ['str017','str018','str019']},
		{color:'green', string: 'str006', mode: 2, cmp: 'cmp-form'},
		{color:'blue', string: 'str005', mode: 1, article: ['str010','str011']},
		{color:'yellow', string: 'str007', mode: 1, article: ['str012','str013']},
		{color:'orange', string: 'str008', mode: 2, cmp: 'cmp-html'},
		{color:'purple', string: 'str009', mode: 1, article: ['str027','str028','str029','str030','str031']}
	]
	
	Vue.component('cmp-html', {
		template: '<div>' +
			'<div class="formCmp"><h2> {{ _LANG.str014 }} </h2></div>' +
			'<div v-html="printHTML(\'str015\')"></div>' +
			'<br>' +
			'<div v-html="printHTML(\'str016\')"></div>' +
		'</div>',
		methods: {
			printHTML: function(str){
				var html = _LANG[str];
				html = html.replace('<h2>','<h3 style="display:inline;">').replace('</h2>', '</h3>');
				html = html.replace('<a href=','<a style="color:#22D;" href=');
				return html;
			}
		}
	});

	Vue.component('cmp-form', {
		template: '<div>' +
			'<div class="formCmp"><h2> {{ _LANG.str022 }} </h2></div>' +
			'<div class="formCmp"><input type="text" v-bind:placeholder="_LANG.str023" style="width:90%; max-width:600px;"></div>' +
			'<div class="formCmp">' +
				'<select style="max-width:600px;">' +
					'<option v-for="opt in select1" v-bind:value="opt"> {{ _LANG[opt] }} </option>' +
				'</select>' +
			'</div>' +
		'</div>',
		data: function(){return {
			intpu1: '',
			select1: ['str024','str025','str026']
		}}
	});
	Vue.component('cmp-info', {
		props: ['colorbox'],
		template: '<div>' +
			'<div class="colorText">{{_LANG[colorbox.string]}}</div>' +
			'<div v-html="printArticle()"></div>' +
			'<cmp-form v-if="(colorbox.mode==2 && colorbox.cmp==\'cmp-form\')"></cmp-form>' +
			'<cmp-html v-if="(colorbox.mode==2 && colorbox.cmp==\'cmp-html\')"></cmp-html>' +
		'</div>',
		methods: {
			printArticle: function(){
				var cb = this.colorbox;
				var rt = '';
				if(cb.article){
					var ar = cb.article.map(function(c){
						return '<p>' + _LANG[c] + '</p>';
					})
					rt += ar.join('');
				}
				return '<article>' + rt + '</article>';
			}
		}
	});

	var mainArea = Vue.compile(
		'<div id="main">' +
			'<div id="colorBar" class="colorBar">' +
				'<div class="colorBtn" v-for="(cb, idx) in aryColor" v-bind:style="getBtnStyle(cb)" v-on:click="clickColor(cb)">{{ _LANG[cb.string] }}</div>' +
			'</div>' +
			'<div id="infoSect" class="infoSect">' +
				'<div v-show="(showPanel!=\'\')" v-bind:style="getCmpInfoOutStyle()">' +
					'<cmp-info v-bind:key="cb.color" v-bind:colorbox="cb" class="cmpInfo" v-for="(cb, idx) in aryColor" v-if="(showPanel==cb.color)"></cmp-info>' +
				'</div>' +
			'</div>' +
			'<div v-if="(showPanel==\'\')" style="margin: 20px 10px;">{{ _LANG.str032 }}</div>' +
		'</div>'
	);
	DD.main = new Vue({
		staticRenderFns: mainArea.staticRenderFns,
		render: mainArea.render,
		el: '#main',
		data: {
			aryColor: aryColor,
			showPanel: ""
		},
		methods: {
			clickColor: function(cb){
				this.showPanel = cb.color;
			},
			getBtnStyle: function(cb){
				var opa = (this.showPanel==cb.color) ? 'opacity:1;' : '';
				return 'background-color:' + cb.color + ';' + opa + '"';
			},
			getCmpInfoOutStyle: function(){
				return "border-color:" + this.showPanel + ';"';
			}
		}
	});

	var popArea = Vue.compile(
		'<div id="pop" v-bind:class="getShowClass()">' +
			'<div class="content">' +
				'<span class="text">{{ _LANG.str021 }}</span>' +
			'</div>' +
		'</div>'
	)
	DD.pop = new Vue({
		staticRenderFns: popArea.staticRenderFns,
		render: popArea.render,
		el: '#pop',
		data: {
			flagShow: false,
			intShowNumber: 0
		},
		methods: {
			getShowClass: function(){
				return (this.flagShow) ? 'show' : '';
			},
			show: function(){this.flagShow = true;},
			hide: function(){this.flagShow = false;},
			pop: function(){
				var me = this;
				clearTimeout(me.intShowNumber);
				if(this.flagShow){
					me.hide();
					setTimeout(function(){
						me.pop();
					},100)
					return false;
				}
				this.flagShow = true;
				me.intShowNumber = setTimeout(function(){
					me.hide();
				}, 5000);
			}
		}
	});
}

window.DD = DD;

})()