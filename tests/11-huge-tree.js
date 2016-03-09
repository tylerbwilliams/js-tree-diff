
import assert from 'assert';

import diff from '../src/tree-diff';

const DEBUG = true;

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

const createText = ( key, text )=> {
	const _path = [ ...state.path ];
	const _key = key;
	state.path.push( _key );
	const node = {
		key: _key,
		path: _path,
		label: 'text',
		attrs: { },
		text: text
	}
	state.path.pop();
	return node;
};

export default function test( next ) {
	
	const createBigTree = ( depth, attrName )=> {
		if ( depth === 0 ) return [];
		return [
			create( 0, 'h1', { title: 'My Title' }, ()=> [
				createText( 0, 'This is a title.')
			]),
			create( 1, 'p', { className: attrName }, ()=> [
				createText( 0, 'This is a sub-title paragraph.')
			]),
			create( 2, 'p', { }, ()=> createBigTree( depth - 1, attrName ))
		]
	};
	
	const tree1 = create( 0, 'div', { className: 'root-class' },
		()=> createBigTree( 1000, 'attr1'));
	
	const tree2 = create( 0, 'div', { className: 'root-class' },
		()=> createBigTree( 1000, 'attr2'));
	
	const now = Date.now();
	const patches = diff( tree1, tree2 );
	DEBUG && console.log( patches.slice( 0,10 ));
	DEBUG && console.log('# Patches:', patches.length );
	DEBUG && console.log('Timing:', Date.now() - now );
	
	next();
}
