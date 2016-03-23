
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

	const tree1 = create( 0, 'div', { }, ()=> []);

	const tree2 = create( 0, 'div', { }, ()=> []);

	registerSuite({
		name: '09-dom-root',

		test: ()=> {
			const patches = diff( tree1, tree2 );

			assert.ok( patches.length === 0, 'Unexpected patches.');
		}
	})
});
