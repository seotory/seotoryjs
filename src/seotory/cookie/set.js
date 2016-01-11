/**
 * 쿠키를 셋팅합니다.
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {Date}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", function ( name, val, time, path ) {
	var d = new Date();
	d.setTime(d.getTime() + time);
	document.cookie = name + "=" + val + "; expires=" + d.toUTCString() + "; path=" + (path || '/');
});