/**
 * 앞뒤 공란을 제거한다.
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	return target.replace(/^\s+/g, "").replace(/\s+$/g,"");
});