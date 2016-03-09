
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
				label: 'div',
				attrs: { },
				children: [
					{
						key: 0,
						path: [ 0, 1 ],
						label: 'p',
						attrs: { className: 'sub-header' },
						children: [
							{
								key: 0,
								path: [ 0, 1, 0 ],
								label: 'text',
								attrs: { },
								text: 'This is a subheader paragraph.'
							}
						]
					},
					{
						key: 1,
						path: [ 0, 1 ],
						label: 'p',
						attrs: { },
						children: [
							{
								key: 0,
								path: [ 0, 1, 1 ],
								label: 'text',
								attrs: { },
								text: 'This is a content paragraph.'
							}
						]
					}
				]
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
				label: 'div',
				attrs: { },
				children: [
					{
						key: 0,
						path: [ 0, 1 ],
						label: 'p',
						attrs: { className: 'sub-header' },
						children: [
							{
								key: 0,
								path: [ 0, 1, 0 ],
								label: 'text',
								attrs: { },
								text: 'This is a subheader paragraph.'
							}
						]
					},
					{
						key: 1,
						path: [ 0, 1 ],
						label: 'p',
						attrs: { },
						children: [
							{
								key: 0,
								path: [ 0, 1, 1 ],
								label: 'text',
								attrs: { },
								text: 'This is a content paragraph.'
							}
						]
					}
				]
			}
		]
	};

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '07-deep-equal',

		test: function() {
			assert.ok( patches.length === 0, 'Unexpected patches.');
		}
	})
});
