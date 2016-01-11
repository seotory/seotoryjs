/**
 * 객체의 클론을 만들어냅니다.! deep copy 합니다아! cost 매우 큽니다아!!!
 * 지금은 seotory.extend를 이용하지만 좋은 것이 있다면 추천 바랍니다!
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	// JSON.parse(JSON.stringify(obj)) << 이런 방법도 있으나 Date 객체를 생성하지 못함.
	return seotory.extend( target, {} );
});