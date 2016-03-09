
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
		attrs: { },
		children: []
	};

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '01-root-equal',

		test: function() {
			assert.equal(patches.length, 0, 'Unexpected patches.');
		}
	})
});
