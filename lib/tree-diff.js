'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = diff;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Runs a function for each node in a tree, recursively
var each = function each(node, fn) {
	fn(node);
	if (node.children) {
		node.children.forEach(function (child) {
			each(child, fn);
		});
	}
};

// Retrieves just the minimum info needed to identify a node
var getInfo = function getInfo(node) {
	return {
		key: node.key,
		path: node.path
	};
};

// Diff method.
function diff(tree1, tree2) {

	// Hash table contains an entry for each depth level of the new tree
	// - Each entry is a hash table that contains an entry for each full path
	var hashes = {};

	// Build the hashes table of hash tables.
	// - Create a new hash table for each depth
	// - Create an entry into the new hash table for the full path.
	each(tree2, function (node) {
		var depth = node.path.length;
		var kpath = [].concat(_toConsumableArray(node.path), [node.key]).join('.');
		hashes[depth] = hashes[depth] || {};
		hashes[depth][kpath] = node.key;
	});

	// Final operations list
	var operations = [];

	// Matching function.
	// - Takes two arrays of nodes
	var match = function match(set1, set2) {

		// Identify the last element index of old set
		// Create a clone of the new set that we can modify in-place.
		var last = set1.length - 1;
		var temp2 = [].concat(_toConsumableArray(set2));

		// For each node in the old set

		var _loop = function _loop(i) {
			var v1 = set1[i];
			var depth = v1.path.length;
			var kpath = [].concat(_toConsumableArray(v1.path), [v1.key]).join('.');
			var dhash = hashes[depth] || {};

			// Check if there is a new node that matches the current path
			var result = dhash[kpath];

			// If not, delete the old node since the new tree doesn't have it.
			if (result === undefined) {
				operations.push({
					op: 'DELETE',
					node: getInfo(v1)
				});
			} else {
				(function () {
					// Get the index of the new node from the temp set
					var tempIndex = temp2.map(function (v2) {
						return v2.key;
					}).indexOf(v1.key);

					// Remove the new node from the temp set
					var v2 = temp2.splice(tempIndex, 1).pop();

					// If the node labels don't match don't try to do updates.
					// - Delete the old node and insert the new one.
					if (v1.label !== v2.label) {
						// Delete V1 and Insert V2
						operations.push({
							op: 'DELETE',
							node: getInfo(v1)
						});
						operations.push({
							op: 'INSERT',
							node: v2
						});
					} else {
						(function () {
							// Same Node Label...

							// Check the order of the nodes.
							var i2 = set2.map(function (v2) {
								return v2.key;
							}).indexOf(v1.key);

							// If the old index doesn't match the new one
							// - push a reorder operation, but continue checking.
							if (i !== i2) {
								operations.push({
									op: 'REORDER',
									node: getInfo(v1),
									index: i2
								});
							}

							// Check attrs
							var v1Attrs = Object.keys(v1.attrs);
							var v2Attrs = Object.keys(v2.attrs);

							// Check the attributes of the old node
							v1Attrs.forEach(function (attr) {
								var idx = v2Attrs.indexOf(attr);
								// If the new node doesn't have the existing attribute
								// - Delete Attribute
								if (idx === -1) {
									operations.push({
										op: 'UPDATE',
										node: getInfo(v1),
										type: 'attr',
										attr: attr,
										value: null
									});
								}
								// If the new nodes attribute doesn't match the current
								// - Update Attribute
								else if (v1.attrs[attr] !== v2.attrs[attr]) {
										operations.push({
											op: 'UPDATE',
											node: getInfo(v1),
											type: 'attr',
											attr: attr,
											value: v2.attrs[attr]
										});
									}
							});

							// Check the attributes of the new node
							v2Attrs.forEach(function (attr) {
								var idx = v1Attrs.indexOf(attr);
								// If the old node doesn't have the new attribute
								// - Create Attribute
								if (idx === -1) {
									operations.push({
										op: 'UPDATE',
										node: getInfo(v1),
										type: 'attr',
										attr: attr,
										value: v2.attrs[attr]
									});
								}
							});

							// Check Children
							// If the old node has children:
							// - Recursively match children
							if (v1.children) {
								var v1Children = v1.children || [];
								var v2Children = v2.children || [];
								match([].concat(_toConsumableArray(v1Children)), [].concat(_toConsumableArray(v2Children)));
							} else {
								// Nodes with label `text` can update the `text`
								// property.  DOM Text nodes.
								if (v1.label === 'text' && v1.text !== v2.text) {
									operations.push({
										op: 'UPDATE',
										node: getInfo(v1),
										type: 'text',
										attr: 'text',
										value: v2.text
									});
								}
							}
						})();
					}
				})();
			}

			// If this is the last node from the old set, loop through the
			// temporary set and insert any nodes that didn't get processed.
			if (i === last) {
				temp2.forEach(function (v2) {
					operations.push({
						op: 'INSERT',
						node: v2
					});
				});
			}
		};

		for (var i = 0; i < set1.length; ++i) {
			_loop(i);
		}
	};

	// Kick off the matching
	match([tree1], [tree2]);

	// Return the patch operations
	return operations;
};