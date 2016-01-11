/**
 * 쿠키를 삭제합니다. 
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( name ) {
	document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});