
define(function(require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	var diff = require('intern/dojo/node!../../lib/tree-diff');

	var state = {
		path: []
	};

	var create = ( key, label, attrs, children )=> {
		var _path = [ ...state.path ];
		var _key = key;
		state.path.push( _key );
		var node = {
			key: _key,
			path: _path,
			label: label,
			attrs: attrs,
			children: children()
		}
		state.path.pop();
		return node;
	};

	var tree1 = create( 0, 'div', { }, function(){ return []; });

	var tree2 = create( 0, 'div', { }, function(){ return []; });

	var patches = diff( tree1, tree2 );

	registerSuite({
		name: '09-dom-root',

		test: function() {
			assert.ok( patches.length === 0, 'Unexpected patches.');
		}
	})
});
