
const each = ( node, fn )=> {
	fn( node );
	if ( node.children ) {
		node.children.forEach( child => {
			each( child, fn );
		});
	}
};

const getInfo = node => ({
	key: node.key,
	path: node.path
});

const diff = module.exports = ( tree1, tree2 )=> {
	
	const hashes = {};
	
	each( tree2, node => {
		const depth = node.path.length;
		const kpath = [ ...node.path, node.key ].join('.');
		hashes[ depth ] = hashes[ depth ] || {};
		hashes[ depth ][ kpath ] = node.key;
	});
	
	const operations = [];
	
	const match = ( set1, set2 )=> {
		
		const last = set1.length - 1;
		const temp2 = [ ...set2 ];
		
		for ( let i = 0; i < set1.length; ++i ) {
			const v1 = set1[i];
			const depth = v1.path.length;
			const kpath = [ ...v1.path, v1.key ].join('.');
			const dhash = hashes[ depth ] || {};
			const result = dhash[ kpath ];
			
			if ( result === undefined ) {
				operations.push({
					op: 'DELETE',
					node: getInfo( v1 )
				});
			}
			else {
				const tempIndex = temp2.map( v2 => v2.key ).indexOf( v1.key );
				const v2 = temp2.splice( tempIndex, 1 ).pop();
				
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
					
					// Check order
					const i2 = set2.map( v2 => v2.key ).indexOf( v1.key );
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
					
					v1Attrs.forEach( attr => {
						const idx = v2Attrs.indexOf( attr );
						if ( idx === -1 ) {
							// Delete Attribute
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								key: attr,
								value: null
							});
						}
						else if ( v1.attrs[attr] !== v2.attrs[attr] ) {
							// Update Attribute
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								key: attr,
								value: v2.attrs[attr]
							});
						}
					});
					
					v2Attrs.forEach( attr => {
						const idx = v1Attrs.indexOf( attr );
						if ( idx === -1 ) {
							// Create Attribute
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'attr',
								key: attr,
								value: v2.attrs[attr]
							});
						}
					});
					
					// Check Children
					if ( !v1.children ) {
						// Text nodes can update.
						if ( v1.label === 'text' && v1.text !== v2.text ) {
							operations.push({
								op: 'UPDATE',
								node: getInfo( v1 ),
								type: 'text',
								value: v2.text
							});
						}
					}
					else {
						// Recursively match children
						const v1Children = v1.children || [];
						const v2Children = v2.children || [];
						match([ ...v1Children ], [ ...v2Children ]);
					}
				}
			}
			
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
	
	match([ tree1 ], [ tree2 ]);
	
	return operations;
};
