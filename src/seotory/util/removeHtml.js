/**
 * 문자열의 html을 제거한다. 뿅!
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( val ) {
	var str = val;
	str = str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
	str = str.replace(/<(no)?script[^>]*>.*?<\/(no)?script>/ig, "");
	str = str.replace(/<style[^>]*>.*<\/style>/ig, "");
	str = str.replace(/</, "&lt;");
	str = str.replace(/>/, "&gt;");
	return str;
});