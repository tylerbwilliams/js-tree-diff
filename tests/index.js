
require('babel-register');

const suite = require('./suite');

suite.run([
	'./01-root-equal',
	'./02-root-attr',
	'./03-child-equal',
	'./04-child-attr',
	'./05-child-multi',
	'./06-child-reorder',
	'./07-deep-equal',
	'./08-deep-inequal',
	'./09-dom-root',
	'./10-dom-attr',
	'./11-huge-tree'
]);

// const util = require('util');
// const diff = require('../src/tree-diff');

// const tree1 = {
// 	key: 0,
// 	path: [],
// 	label: 'div',
// 	attrs: { },
// 	children: [
// 		{
// 			key: 0,
// 			path: [ 0 ],
// 			label: 'ul',
// 			attrs: { },
// 			children: [
// 				{
// 					key: 'H',
// 					path: [ 0, 0 ],
// 					label: 'li',
// 					attrs: { },
// 					children: [
// 						{
// 							key: 0,
// 							path: [ 0, 0, 'H' ],
// 							label: 'text',
// 							attrs: { },
// 							text: 'Hello'
// 						}
// 					]
// 				},
// 				{
// 					key: 'W',
// 					path: [ 0, 0 ],
// 					label: 'li',
// 					attrs: { },
// 					children: [
// 						{
// 							key: 0,
// 							path: [ 0, 0, 'W' ],
// 							label: 'text',
// 							attrs: { },
// 							text: 'World'
// 						}
// 					]
// 				}
// 			]
// 		}
// 	]
// };

// const tree2 = {
// 	key: 0,
// 	path: [],
// 	label: 'div',
// 	attrs: { },
// 	children: [
// 		{
// 			key: 0,
// 			path: [ 0 ],
// 			label: 'ul',
// 			attrs: { },
// 			children: [
// 				{
// 					key: 'H',
// 					path: [ 0, 0 ],
// 					label: 'li',
// 					attrs: { className: 'german' },
// 					children: [
// 						{
// 							key: 0,
// 							path: [ 0, 0, 'H' ],
// 							label: 'text',
// 							attrs: { },
// 							text: 'Hallo'
// 						}
// 					]
// 				},
// 				{
// 					key: 'W',
// 					path: [ 0, 0 ],
// 					label: 'li-other',
// 					attrs: { className: 'german' },
// 					children: [
// 						{
// 							key: 0,
// 							path: [ 0, 0, 'W' ],
// 							label: 'text',
// 							attrs: { },
// 							text: 'Welt'
// 						}
// 					]
// 				}
// 			]
// 		}
// 	]
// };

// const patches = diff( tree1, tree2 );
// const output = util.inspect( patches, { depth: 10 });
// console.log( output );
