/**
 * date format입니닷.
 * @param  {Array}  ) {	var        weekName [description]
 * @return {[type]}   [description]
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", (function() {

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

	var zf = function ( val ) {
		if ( isNumber( val ) )
			return zf( val+"" );
		if ( isString( val ) )
			return val.length === 1 ? "0"+val : val;
	};

	var format = function ( mask, d ) {
		return mask.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
			switch ($1) {
				case "yyyy": return d.getFullYear();
				case "yy": return zf(d.getFullYear() % 1000);
				case "MM": return zf(d.getMonth() + 1);
				case "dd": return zf(d.getDate());
				case "E": return weekName[d.getDay()];
				case "HH": return zf(d.getHours());
				case "hh": return zf((d.getHours() % 12) ? d.getHours() % 12 : 12);
				case "mm": return zf(d.getMinutes());
				case "ss": return zf(d.getSeconds());
				case "a/p": return d.getHours() < 12 ? "오전" : "오후";
				default: return $1;
			}
		});
	};

	return function ( mask, date ) {

		if ( ! mask || ! isString( mask ) )
			seotory.error( '첫 번째 인자는 String 형태만 사용이 가능합니다.' );

		if ( ! date )
			date = seotory.date.now();

		return format(mask, date);
	};
})());