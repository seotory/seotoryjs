// jQuery 에서는 특정 모듈이 agruments.collee 를 사용시 firefox에서 작동하지 않아 선언하지 않는다.
"use strict";

// seotory 스크립트의 version 정보, package.json의 버젼과 싱크를 맞춘다.
seotory.VERSION = "<%=PKG_VERSION%>";

// 최소 util 선언
var toString = Object.prototype.toString;
function isArray ( target ) {
	return target instanceof Array;
}
function isDate ( target ) {
	return target instanceof Date && ! isNaN( target.valueOf() );
}
function isFunction ( target ) {
	return typeof target === "function";
}
function isInteger ( target ) {
	return parseInt( target, 10 ) === target;
}
function isNumber ( target ) {
	return parseFloat( target, 10 ) === target;
}
function isObject ( target ) {
	return toString.call( target ) === '[object Object]';
}
function isString ( target ) {
	return (typeof target === "string" || target instanceof String);
}
function isBoolean ( target ) {
	return target === true || target === false || toString.call( target ) === '[object Boolean]';
}


/**
 * 로그 사용 체크 여부.
 */
var log_setting = {
	use : true
}

/**
 * 메세지. console error 방지
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
seotory.log = function ( msg ) {
	if ( log_setting.use ) {
		if ( console )
			console.log( msg );
	}
};

seotory.log.use = function ( b ) {
	log_setting.use = b;
}

/**
 * seotory error 지정.
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
seotory.error = function ( msg ) {
	throw new Error( msg );
};

/**
 * namespace에 등록이 되어있는지 확인한다.
 * @param  {[type]}  namespace [description]
 * @return {Boolean}           [description]
 */
seotory.isNsExist = function ( namespace ) {
	var parts = namespace.split(".");
	var root = seotory;

	if ( parts.length > 0 && parts[0] === "seotory" )
		parts.splice(0, 1);

	for ( var i=0 ; i < parts.length ; i++ ) {
		if ( (i+1) !== parts.length ) {
			if ( ! root[parts[i]] )
				return false;
			root = root[parts[i]];
		} else if ( (i+1) === parts.length ) {
			if ( ! root[parts[i]] )
				return false;
			else
				return true;
		}
	}

	return false;
};

/**
 * seotory namespace 등록 시스템.
 * @param  {[type]} namespace [description]
 * @param  {[type]} obj       [description]
 * @param  {[type]} alias     [description]
 * @return {[type]}           [description]
 */
seotory.ns = function ( namespace, obj, alias ) {
	if ( ! isString( namespace ) )
		seotory.error("첫 번째 인자 namespace에는 string 형만 사용이 가능합니다.");

	var parts = namespace.split(".");
	var root = seotory;
	
	if ( parts.length > 0 && parts[0] === "seotory" )
		parts.splice(0, 1);

	// if ( parts.length > 0 && ' page msg dom solr user event '.indexOf( ' '+parts[0].toLowerCase()+' ' ) > -1 )
	//	seotory.error('"'+parts[0]+'" namespace는 선점되어 사용할 수 없습니다.');
	
	for ( var i=0 ; i < parts.length ; i++ ) {
		if ( (i+1) !== parts.length ) {
			if ( ! root[parts[i]] )
				root[parts[i]] = {};
			root = root[parts[i]];
		} else if ( (i+1) === parts.length ) {
			if ( ! root[parts[i]] || isFunction( root[parts[i]] ) )
				root[parts[i]] = obj;
			else if ( isObject( root[parts[i]] ) && isObject( obj ) ) {
				for ( var p in obj ) {
					if ( root[parts[i]][p] )
						seotory.error ("이미 등록되어있는 namespace입니다.");
					else
						root[parts[i]][p] = obj[p];
				}
			}
			else
				seotory.error ("이미 등록되어있는 namespace입니다.");
		}
	}

	if ( alias ) {
		if ( ! isString( alias ) )
			seotory.error("세 번째 인자 alias에는 string 형만 사용이 가능합니다.");
		if ( window[alias] )
			seotory.error("이미 등록되어있는 alias입니다.");
		else
			window[alias] = obj;
	}
};

/**
 * 해당 namespace에 프로토타입을 추가합니다!
 * @param {[type]} namespace       [description]
 * @param {[type]} prototypeObject [description]
 */
seotory.nsPrototype = function ( namespace, prototypeObject ) {
	if ( seotory.isNsExist ( namespace ) === true ) {
		var parts = namespace.split(".");
		var root = seotory;

		if ( parts.length > 0 && parts[0] === 'seotory' )
			parts.splice(0, 1);

		for ( var i=0 ; i<parts.length && root ; i++ ) {
			root = root[parts[i]];
		}

		if ( ! isObject( prototypeObject ) )
			seotory.error( "2번째 인자는 object 형만 사용이 가능합니다." );

		if ( root && typeof root === "function" )
			root.prototype = prototypeObject;
	}
};

/**
 * javascript 객체 확장!
 * @param  {[type]} from [description]
 * @param  {[type]} to   [description]
 * @return {[type]}      [description]
 */
seotory.extend = function ( from, to ) {
	if ( isObject( from ) ) return from;
	if ( from.constructor !== Object && from.constructor !== Array ) return from;
	if ( from.constructor === Date || from.constructor === RegExp || from.constructor === Function ||
		from.constructor === String || from.constructor === Number || from.constructor === Boolean )
		return new from.constructor(from);

	to = to || new from.constructor();

	for (var name in from) {
		to[name] = typeof to[name] === "undefined" ? seotory.extend(from[name], null) : to[name];
	}

	return to;
};


// 작업 예정
/**
 * [copy description]
 * @return {[type]} [description]
seotory.copy = function ( ) {

}
 */

// function 상속 구현