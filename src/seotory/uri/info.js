/**
 * url 정보를 가공하여 리턴합니다.
 * @see url/_var.js
 * @param  {[type]}
 * @return {[type]}
 */
seotory.ns( "<%=FOLDER_NAME%>.<%=FILE_NAME%>", (function ( w ) {

	var parameter = w.location.search.substring(1);
	var getParam = (function( p ){
		var tmp = {};
		var paramAry = p.split("&");
		for (var i=0 ; i<paramAry.length && p ; i++) {
			var one = paramAry[i].split("=");
			if ( one[0] && tmp[one[0]] ) {
				var a = tmp[one[0]].split(',');
				if ( one[1] )
					a.push( decodeURIComponent( one[1] ) );
				tmp[one[0]] = a.join(',');
			}
			else if ( one[0] )
				tmp[one[0]] = one[1] ? decodeURIComponent( one[1] ) : "";
		}
		return function ( name ) {
			return tmp[name];
		};
	})(parameter);

	return function () {
		return {
			full : w.location.href,
			domain : w.location.hostname,
			protocol : w.location.protocol,
			port : w.location.port,
			path : w.location.pathname,
			parameter : parameter,
			getParameter : getParam
		};
	};
})(window));