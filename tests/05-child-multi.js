
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

	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches );
	
	assert.ok( patches.length === 0, 'Unexpected patches.');
	
	next();
}
