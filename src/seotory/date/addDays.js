/**
 * 일자를 더해서 date 객체를 반환합니다.
 * @param  {[type]} ) {	var        date, days;	if ( arguments.length [description]
 * @return {[type]}   [description]
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( ) {

	var date, days;

	if ( arguments.length === 1 ) {
		if ( interpark.util.isNumber( arguments[0] ) ) {
			date = interpark.date.now();
			days = arguments[0];
		}
	}

	if ( arguments.length === 2 ) {
		date = arguments[0];
		days = arguments[1];
	}

	date.setDate(date.getDate() + days);
	return date;
});