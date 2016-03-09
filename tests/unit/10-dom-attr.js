
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

	const tree2 = create( 0, 'div', { className: 'root-class' }, ()=> []);

	const output = {
		op: 'UPDATE',
		node: { key: 0, path: [] },
		type: 'attr',
		attr: 'className',
		value: 'root-class'
	};

	registerSuite({
		name: '10-dom-attr',

		test: ()=> {
			const patches = diff( tree1, tree2 );

			assert.ok( patches.length !== 0, 'Expected patches not found.');
			assert.ok( patches.length === 1, 'Unexpected patches.');
			assert.deepEqual( patches[0], output, 'Unexpected Patch.');
		}
	})
});
