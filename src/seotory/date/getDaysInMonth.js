/**
 * 해당 년, 달에서 총 일자를 구합니다.
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( year, month ) {
	return [31, (seotory.date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
});