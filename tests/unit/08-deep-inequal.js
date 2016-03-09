
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

	const tree2 = {
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
				attrs: { className: 'main' },
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
								text: 'This is an updated subheader paragraph.'
							}
						]
					},
					{
						key: 1,
						path: [ 0, 1 ],
						label: 'span',
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
	
	const output = [
		{	op: 'UPDATE',
			node: { key: 1, path: [ 0 ] },
			type: 'attr',
			attr: 'className',
			value: 'main' },
		{	op: 'UPDATE',
			node: { key: 0, path: [ 0, 1, 0 ] },
			type: 'text',
			attr: 'text',
			value: 'This is an updated subheader paragraph.' },
		{	op: 'DELETE', node: { key: 1, path: [ 0, 1 ] } },
		{	op: 'INSERT',
			node: {
				key: 1,
				path: [ 0, 1 ],
				label: 'span',
				attrs: {},
				children: [
					{	key: 0,
						path: [ 0, 1, 1 ],
						label: 'text',
						attrs: {},
						text: 'This is a content paragraph.' }
				]
			}
		}
	];

	registerSuite({
		name: '08-deep-inequal',

		test: ()=> {
			const patches = diff( tree1, tree2 );

			const actual = patches.length;
			const expected = output.length;

			assert.ok( !( actual < expected ), 'Expected patches not found.');
			assert.ok( !( actual > expected ), 'Unexpected patches.');

			patches.forEach(( patch, idx )=> {
				assert.ok( patch, output[idx], 'Patch invalid.');
			});
		}
	})
});
