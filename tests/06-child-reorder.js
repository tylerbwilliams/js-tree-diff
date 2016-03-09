
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
	
	const output =  [
		{	op: 'REORDER',
			node: { key: 'sub-header', path: [Object] },
			index: 2 },
		{	op: 'REORDER',
			node: { key: 'text', path: [Object] },
			index: 1 }
	];

	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches );
	
	assert.ok( !( patches.length < 2 ), 'Expected patches not found.');
	assert.ok( !( patches.length > 2 ), 'Unexpected patches.');
	
	patches.forEach(( patch, idx )=> {
		assert.ok( patch, output[idx], 'Patch invalid.');
	});
	
	next();
}
