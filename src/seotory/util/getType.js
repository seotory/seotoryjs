/**
 * 객체의 타입이 무엇인지 밝혀내자!
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( target ) {
	if ( target === null ) return "null";

	var t = typeof target;
	if ( t != "object" ) return t;

	var c = Object.prototype.toString.apply( target );
	c = c.substring( 8, c.length - 1 );

	if ( c != "Object" ) return c;

	if ( target.constructor === Object ) return c;

	if ( "classname" in target.constructor.prototype && typeof target.constructor.prototype.classname === "string" )
		return target.constructor.prototype.classname;

	return "<unknown type>";
});