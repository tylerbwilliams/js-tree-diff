
import assert from 'assert';

import diff from '../src/tree-diff';

const DEBUG = false;

export default function test( next ) {
	
	const tree1 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { },
		children: []
	};

	const tree2 = {
		key: 0,
		path: [],
		label: 'div',
		attrs: { 'className': 'root-class' },
		children: []
	};

	const output = {
		op: 'UPDATE',
		node: { key: 0, path: [] },
		type: 'attr',
		attr: 'className',
		value: 'root-class'
	};

	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches );
	
	assert.ok( patches.length !== 0, 'Expected patches not found.');
	assert.ok( patches.length === 1, 'Unexpected patches.');
	
	assert.deepEqual( patches[0], output, 'Unexpected Patch.');
	
	next();
}
