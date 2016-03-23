
define( require => {

	const registerSuite = require('intern!object');
	const assert = require('intern/chai!assert');
	const diff = require('intern/dojo/node!../../lib/tree-diff');

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

	registerSuite({
		name: '11-huge-tree',

		test: ()=> {
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

			assert.ok( true, 'I don\'t know what goes here...');
		}
	})
});
