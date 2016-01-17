// betweenjs

seotory.ns( '', function ( a, b, val ) {
	if ( isNumber(a) && isNumber(b) && isNumber(val) ) {
		if ( a <= val && val <= b )
			return true;
		else
			return false;
	} else {
		seotory.error( 'type is error' );
	}
});