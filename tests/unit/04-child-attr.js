
define( require => {

	const registerSuite = require('intern!object');
	const assert = require('intern/chai!assert');
	const diff = require('intern/dojo/node!../../lib/tree-diff');

	const tree1 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: [
			{
				key: 0,
				path: [ 0 ],
				label: 'p',
				attrs: { },
				children: []
			}
		]
	};

	const tree2 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: [
			{
				key: 0,
				path: [ 0 ],
				label: 'p',
				attrs: { className: 'child-class' },
				children: []
			}
		]
	};

	const output = {
		op: 'UPDATE',
		node: { key: 0, path: [ 0 ] },
		type: 'attr',
		attr: 'className',
		value: 'child-class'
	}

	registerSuite({
		name: '04-child-attr',

		test: ()=> {
			const patches = diff( tree1, tree2 );

			assert.ok( patches.length !== 0, 'Expected patches not found.');
			assert.ok( patches.length === 1, 'Unexpected patches.');
			assert.deepEqual( patches[0], output, 'Unexpected Patch.');
		}
	})
});
