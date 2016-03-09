
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
				key: 'sub-header',
				path: [ 0 ],
				label: 'p',
				attrs: { className: 'sub-header' },
				children: []
			},
			{
				key: 'text',
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
				key: 'text',
				path: [ 0 ],
				label: 'p',
				attrs: { },
				children: []
			},
			{
				key: 'sub-header',
				path: [ 0 ],
				label: 'p',
				attrs: { className: 'sub-header' },
				children: []
			}
		]
	};
	
	var output =  [
		{	op: 'REORDER',
			node: { key: 'sub-header', path: [Object] },
			index: 2 },
		{	op: 'REORDER',
			node: { key: 'text', path: [Object] },
			index: 1 }
	];

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '06-child-reorder',

		test: function() {
			assert.ok( !( patches.length < 2 ), 'Expected patches not found.');
			assert.ok( !( patches.length > 2 ), 'Unexpected patches.');
			
			patches.forEach(( patch, idx )=> {
				assert.ok( patch, output[idx], 'Patch invalid.');
			});
		}
	})
});
