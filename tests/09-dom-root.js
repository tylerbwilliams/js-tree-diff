
import assert from 'assert';

import diff from '../src/tree-diff';

const DEBUG = false;

const state = {
	path: []
};

const create = ( key, label, attrs, children )=> {
	const _path = [ ...state.path ];
	const _key = key;
	state.path.push( _key );
	const node = {
		key: _key,
		path: _path,
		label: label,
		attrs: attrs,
		children: children()
	}
	state.path.pop();
	return node;
};

export default function test( next ) {
	
	const tree1 = create( 0, 'div', { }, ()=> [
		
	]);

	const tree2 = create( 0, 'div', { }, ()=> [
		
	]);

	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches );
	
	assert.ok( patches.length === 0, 'Unexpected patches.');
	
	next();
}
