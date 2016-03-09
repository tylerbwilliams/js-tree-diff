
define(function(require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	var diff = require('intern/dojo/node!../../lib/tree-diff');

	var tree1 = {
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

	var tree2 = {
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

	var output = {
		op: 'UPDATE',
		node: { key: 0, path: [ 0 ] },
		type: 'attr',
		attr: 'className',
		value: 'child-class'
	}

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '04-child-attr',

		test: function() {
			assert.ok( patches.length !== 0, 'Expected patches not found.');
			assert.ok( patches.length === 1, 'Unexpected patches.');
			
			assert.deepEqual( patches[0], output, 'Unexpected Patch.');
		}
	})
});
