/**
 * object의 proterty 수를 셉니다.
 * @param  {String}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	if ( typeof target != "object") return 0;
	var cnt = 0;
	for ( var p in target ) { cnt++; }
	return cnt;
});