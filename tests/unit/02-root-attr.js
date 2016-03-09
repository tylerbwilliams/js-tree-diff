
define(function(require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	var diff = require('intern/dojo/node!../../lib/tree-diff');

	var tree1 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: []
	};

	var tree2 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { 'className': 'root-class' },
		children: []
	};

	var output = {
		op: 'UPDATE',
		node: { key: 0, path: [] },
		type: 'attr',
		attr: 'className',
		value: 'root-class'
	};

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '02-root-attr',

		test: function() {
			assert.ok( patches.length !== 0, 'Expected patches not found.');
			assert.ok( patches.length === 1, 'Unexpected patches.');
			
			assert.deepEqual( patches[0], output, 'Unexpected Patch.');
		}
	})
});
