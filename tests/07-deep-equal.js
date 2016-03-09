
import assert from 'assert';

import diff from '../src/tree-diff';

const DEBUG = false;

export default function test( next ) {
	
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

	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches );
	
	assert.ok( patches.length === 0, 'Unexpected patches.');
	
	next();
}