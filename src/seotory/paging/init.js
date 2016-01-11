/**
 * 인터파크 페이징
 * - 1 page에는 first 및 prev 버튼이 나오지 않는다.
 * - 11 page 에서는 first 버튼이 나오지 않는다.
 * - last 버튼은 항상 출력하지 않는다. 
 * - totalcnt가 0일 경우 페이지를 노출하지 않는다.
 * @param  {Object}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>", (function( ) { //.<%=FILE_NAME%>

	var 
	index, indexCnt, beforeStart, afterStart, pageTotalCnt, pageStart, pageEnd,
	option = {
		range: 10,
		row: 10,
		page: 1,
		total: 0,
		strong: 0,
		btnHide: true,
		htmlHide: true,
		template: 0
	},
	html = {
		loop: '',
		loopOpen: '',
		loopClose: '',
		active: '',
		strong: '',
		btn: {
			first: '',
			last: '',
			prev: '',
			next: ''
		},
		wrap: {
			open: '',
			close: ''
		}
	},
	template = {

	},
	operation = function () {
		index = 0;
		indexCnt = 0;
		beforeStart = 0;
		afterStart = 0;
		pageTotalCnt = 0;
		pageStart = 0;
		pageEnd = 0;

		pageTotalCnt	= Math.ceil( option.total / option.row );
		pageStart		= ((Math.floor((Number(option.page) - 1) / Number(option.range)) * Number(option.range)) + 1);
		pageEnd			= (pageStart + option.range) - 1 > pageTotalCnt ? pageTotalCnt : (pageStart + option.range) - 1;
		beforeStart		= (pageStart - 1) > 0 ? (pageStart - 1) : 1;
		afterStart		= (pageEnd + 1) <= pageTotalCnt ? (pageEnd + 1) : pageTotalCnt;
		index			= Math.ceil( Math.floor((option.page-1) / option.range)+1 );
		indexCnt		= Math.floor((pageTotalCnt-1) / option.range) + 1;
	},
	makeHtml = function () {

		// 카운트 0 일시 노출 안함
		if ( option.htmlHide && option.total === 0 )
			return '';

		// 검사
		if ( ! html.loop )
			interpark.error("Template is not define.");
		
		// 데이터 확인
		if ( ! html.strong ) html.strong = html.loop;
		if ( ! html.active ) html.active = html.loop;
		
		// 연산
		operation();
		
		/**
		 * 조립 시작
		 * @type {String}
		 */
		var htmlStr = "";

		// 처음으로가기 버튼
		if ( index > 2 ) {
			if ( ! option.btnHide ) {
				htmlStr += numReplace(html.btn.first, "1");
			} else if ( option.btnHide && option.page != 1 ) {
				htmlStr += numReplace(html.btn.first, "1");
			}
		}

		// 앞으로가기 버튼
		if ( ! option.btnHide ) {
			htmlStr += numReplace(html.btn.prev, beforeStart);
		} else if ( option.btnHide && option.page > option.range ) {
			htmlStr += numReplace(html.btn.prev, beforeStart);
		}
		
		// loop wrap 시작
		htmlStr += html.loopOpen;
		
		// loop 구간
		for ( var i = pageStart ; i <= pageEnd ; i++ ) {
			if ( i == option.page )
				htmlStr += numReplace(html.active, i+"");
			else if ( i <= option.strong )
				htmlStr += numReplace(html.strong, i+"");
			else
				htmlStr += numReplace(html.loop, i+"");
		}
		
		// loop wrap 끝
		htmlStr += html.loopClose;
		
		// 뒤로가기 버튼
		if ( ! option.btnHide ) {
			htmlStr += numReplace(html.btn.next, afterStart);
		} else if ( option.btnHide && pageEnd != pageTotalCnt ) {
			htmlStr += numReplace(html.btn.next, afterStart);
		}
		
		// 끝으로 가기 버튼
		if ( indexCnt - index > 1 && pageTotalCnt < 1000 ) {
			if ( ! option.btnHide ) {
				htmlStr += numReplace(html.btn.last, pageTotalCnt);			
			} else if ( option.btnHide && pageEnd != pageTotalCnt ) {
				htmlStr += numReplace(html.btn.last, pageTotalCnt);
			}
		}
		
		// 랩핑
		htmlStr = html.wrap.open + htmlStr + html.wrap.close;
		
		return htmlStr;
	},
	numReplace = function (htmlStr, num) {
		return htmlStr ? htmlStr.replace(/\{\{NUM\}\}/g, num) : '';
	}
	;

	return {
		setHtml : function ( obj ) {
			if ( obj ) 
				html = $.extend( html, obj );
			return this;
		},
		setRow : function ( num ) {
			option.row = num;
			return this;
		},
		setPage : function ( num ) {
			option.page = num;
			return this;
		},
		setTotal : function ( num ) {
			option.total = num;
			return this;
		},
		setStrong : function ( num ) {
			option.strong = num;
			return this;
		},
		setBtnHide : function ( b ) {
			option.btnHide = b;
			return this;
		},
		setHtmlHide : function ( b ) {
			option.htmlHide = b;
			return this;
		},
		setTemplate : function ( num ) {
			option.template = num;
			this.setHtml( $.extend( html, template[option.template] ) ) ;
			return this;
		},
		getHtml : function ( ) {
			return makeHtml();
		}
	};
})());