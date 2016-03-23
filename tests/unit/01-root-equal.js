
define( require => {

	const registerSuite = require('intern!object');
	const assert = require('intern/chai!assert');
	const diff = require('intern/dojo/node!../../lib/tree-diff');

	const tree1 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: []
	};

	const tree2 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: []
	};

	registerSuite({
		name: '01-root-equal',

		test: ()=> {
			const patches = diff( tree1, tree2 );

			assert.equal(patches.length, 0, 'Unexpected patches.');
		}
	})
});
