/**
 * 문자열을 소문자로 바꿉니닷.
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( val ) {
	if ( ! seotory.util.isString(val) )
		seotory.error( "String 형이 아닙니다." );
	return val.toLowerCase();
});