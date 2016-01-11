/**
 * 월을 더해서 Date 객체를 반환합니다.
 * javascript의 setMonth() 메소드에는 에러가 있습니닷.. 
 * 그러므로 아래와 같이 처리합니다.
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( ) {

	var date, months;

	if ( arguments.length === 1 ) {
		if ( isNumber( arguments[0] ) ) {
			date = seotory.date.now();
			months = arguments[0];
		}
	}

	if ( arguments.length === 2 ) {
		date = arguments[0];
		months = arguments[1];
	}

	var day = date.getDate();
	date.setDate(1);
	date.setMonth(date.getMonth() + months);
	date.setDate(Math.min(day, seotory.date.getDaysInMonth( date.getFullYear(), date.getMonth() + 1)));
	return date;
});