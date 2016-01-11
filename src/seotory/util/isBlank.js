/**
 * 문자가 공백인지를 체크합니다.
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	if ( ! seotory.util.isString( target ) ) 
		seotory.error( 'String 타입이 아닙니다.' );
	return target.replace(/\s/ig, '') === '';
});