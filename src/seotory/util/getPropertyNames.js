/**
 * 오브젝트의 프로퍼티 명을 배열로 반환
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	if ( ! seotory.util.isObject( target ) ) 
		seotory.error('object type이 아닙니다.');
	var r = [];
	for ( var name in target ) r.push( name );
	return r;
});