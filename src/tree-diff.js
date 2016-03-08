
// Runs a function for each node in a tree, recursively
const each = ( node, fn )=> {
	fn( node );
	if ( node.children ) {
		node.children.forEach( child => {
			each( child, fn );
		});
	}
};

// Retrieves just the minimum info needed to identify a node
const getInfo = node => ({
	key: node.key,
	path: node.path
});

// Diff method.
const diff = module.exports = ( tree1, tree2 )=> {
	
	// Hash table contains an entry for each depth level of the new tree
	// - Each entry is a hash table that contains an entry for each full path
	const hashes = {};
	
	// Build the hashes table of hash tables.
	// - Create a new hash table for each depth
	// - Create an entry into the new hash table for the full path.
	each( tree2, node => {
		const depth = node.path.length;
		const kpath = [ ...node.path, node.key ].join('.');
		hashes[ depth ] = hashes[ depth ] || {};
		hashes[ depth ][ kpath ] = node.key;
	});
	
	// Final operations list
	const operations = [];
	
	// Matching function.
	// - Takes two arrays of nodes
	const match = ( set1, set2 )=> {
		
		// Identify the last element index of old set
		// Create a clone of the new set that we can modify in-place.
		const last = set1.length - 1;
		const temp2 = [ ...set2 ];
		
		// For each node in the old set
		for ( let i = 0; i < set1.length; ++i ) {
			const v1 = set1[i];
			const depth = v1.path.length;
			const kpath = [ ...v1.path, v1.key ].join('.');
			const dhash = hashes[ depth ] || {};
			
			// Check if there is a new node that matches the current path
			const result = dhash[ kpath ];
			
			// If not, delete the old node since the new tree doesn't have it.
			if ( result === undefined ) {
				operations.push({
					op: 'DELETE',
					node: getInfo( v1 )
				});
			}
			else {
				// Get the index of the new node from the temp set
				const tempIndex = temp2.map( v2 => v2.key ).indexOf( v1.key );
				
				// Remove the new node from the temp set
				const v2 = temp2.splice( tempIndex, 1 ).pop();
				
				// If the node labels don't match don't try to do updates.
				// - Delete the old node and insert the new one.
				if ( v1.label !== v2.label ) {
					// Delete V1 and Insert V2
					operations.push({
						op: 'DELETE',
						node: getInfo( v1 )
					});
					operations.push({
						op: 'INSERT',
						node: v2
					});
				}
				else {
					// Same Node Label...
					
					// Check the order of the nodes.
					const i2 = set2.map( v2 => v2.key ).indexOf( v1.key );
					
					// If the old index doesn't match the new one
					// - push a reorder operation, but continue checking.
					if ( i !== i2 ) {
						operations.push({
							op: 'REORDER',
							node: getInfo( v1 ),
							index: i2
						})
					}
					
					// Check attrs
					const v1Attrs = Object.keys( v1.attrs );
					const v2Attrs = Object.keys( v2.attrs );
					
					// Check the attributes of the old node
					v1Attrs.forEach( attr => {
						const idx = v2Attrs.indexOf( attr );
						// If the new node doesn't have the existing attribute
						// - Delete Attribute
						if ( idx === -1 ) {
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								attr: attr,
								value: null
							});
						}
						// If the new nodes attribute doesn't match the current
						// - Update Attribute
						else if ( v1.attrs[attr] !== v2.attrs[attr] ) {
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								attr: attr,
								value: v2.attrs[attr]
							});
						}
					});
					
					// Check the attributes of the new node
					v2Attrs.forEach( attr => {
						const idx = v1Attrs.indexOf( attr );
						// If the old node doesn't have the new attribute
						// - Create Attribute
						if ( idx === -1 ) {
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								attr: attr,
								value: v2.attrs[attr]
							});
						}
					});
					
					// Check Children
					// If the old node has children:
					// - Recursively match children
					if ( v1.children ) {
						const v1Children = v1.children || [];
						const v2Children = v2.children || [];
						match([ ...v1Children ], [ ...v2Children ]);
					}
					else {
						// Nodes with label `text` can update the `text`
						// property.  DOM Text nodes.
						if ( v1.label === 'text' && v1.text !== v2.text ) {
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'text',
								attr: 'text',
								value: v2.text
							});
						}
					}
				}
			}
			
			// If this is the last node from the old set, loop through the
			// temporary set and insert any nodes that didn't get processed.
			if ( i === last ) {
				temp2.forEach( v2 => {
					operations.push({
						op: 'INSERT',
						node: v2
					})
				});
			}
		}
	};
	
	// Kick off the matching
	match([ tree1 ], [ tree2 ]);
	
	// Return the patch operations
	return operations;
};
