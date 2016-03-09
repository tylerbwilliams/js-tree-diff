
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

	const createText = ( key, text )=> {
		var _path = [ ...state.path ];
		var _key = key;
		state.path.push( _key );
		var node = {
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

		test: function() {
			var createBigTree = function( depth, attrName ) {
				if ( depth === 0 ) return [];
				return [
					create( 0, 'h1', { title: 'My Title' }, function() {
						return [
							createText( 0, 'This is a title.')
						];
					}),
					create( 1, 'p', { className: attrName }, function() {
						return [
							createText( 0, 'This is a sub-title paragraph.')
						];
					}),
					create( 2, 'p', { }, ()=> createBigTree( depth - 1, attrName ))
				]
			};
			
			var tree1 = create( 0, 'div', { className: 'root-class' },
				function(){return createBigTree( 1000, 'attr1'); });
			
			var tree2 = create( 0, 'div', { className: 'root-class' },
				function(){return createBigTree( 1000, 'attr2'); });
			
			var now = Date.now();
			var patches = diff( tree1, tree2 );

			assert.ok(true, 'I don\'t know what goes here...');
		}
	})
});
