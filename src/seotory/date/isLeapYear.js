/**
 * 윤년을 구합니다. 아하!
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( year ) {
	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
});