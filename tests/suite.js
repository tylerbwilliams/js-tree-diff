
import util from 'util';

export function run( tests ) {
	console.log('Running Tests...');
	(function nextTest( index = 0 ) {
		if ( index >= tests.length )
			return;
		const test = tests[index];
		const testFn = require( test ).default;
		console.log(`Running Test: ${test}`);
		try {
			testFn(()=> {
				console.log(`Test Completed: ${test}`);
				nextTest( index + 1 );
			});
		} catch( err ) {
			console.error( err );
			process.exit( 0 );
		}
	})();
}
