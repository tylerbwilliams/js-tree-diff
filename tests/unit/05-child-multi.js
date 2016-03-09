
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
				label: 'h1',
				attrs: { },
				children: []
			},
			{
				key: 1,
				path: [ 0 ],
				label: 'p',
				attrs: { className: 'sub-header' },
				children: []
			},
			{
				key: 2,
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
				label: 'h1',
				attrs: { },
				children: []
			},
			{
				key: 1,
				path: [ 0 ],
				label: 'p',
				attrs: { className: 'sub-header' },
				children: []
			},
			{
				key: 2,
				path: [ 0 ],
				label: 'p',
				attrs: { },
				children: []
			}
		]
	};

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '05-child-multi',

		test: function() {
			assert.ok( patches.length === 0, 'Unexpected patches.');
		}
	})
});