# js-tree-diff
JSON Graph Tree Diffing Module

## About
This module provides a function to diff two JSON Graph Trees and results in a list of patch operations.

An example of the output follows:

    const tree1 = {
        key: 0,
        path: [],
        label: 'div',
        attrs: { },
        children: [
            {
                key: 0,
                path: [ 0 ],
                label: 'p',
                attrs: { },
                children: []
            }
        ]
    };

    const tree2 = {
        key: 0,
        path: [],
        label: 'div',
        attrs: { },
        children: [
            {
                key: 0,
                path: [ 0 ],
                label: 'p',
                attrs: { className: 'child-class' },
                children: []
            }
        ]
    };

    console.log( diff( tree1, tree2 ));
    // [{
    //     op: 'UPDATE',
    //     node: { key: 0, path: [ 0 ] },
    //     type: 'attr',
    //     attr: 'className',
    //     value: 'child-class'
    // }];

A JSON Graph Tree is a JSON Object of nodes in the following formats:

    `type standard node`: {
        key: `<string>`,
        path: [ `<string>` ],
        label: `<string>`,
        attrs: { `<string>`: `<string>` },
        children: [
            `<node>`
        ]
    }

    `type leaf node`: {
        key: `<string>`,
        path: [ `<string>` ],
        label: `<string>`,
        attrs: { `<string>`: `<string>` },
        text: `<string>`
    }

Provided two `tree`s, the output of the diffing function is a list of patch operations:

    `type patch`: {
        op: `<string:operation>`,
        node: {
            key: `<string>`,
            path: [ `<string>` ]
        }
    }

Supported operations include:

- `DELETE`
- `INSERT` - The `node` attribute contains the entire `<node>`
- `REORDER` - The attribute `index: <int>` is provided
- `UPDATE` - The attributes `type: <string>`, `attr: <string>`, and `value: <string>` are provided

## Install

( Not published yet )
`$ npm install --save js-tree-diff`

## Development

### Setup

`$ npm install`

### Tests

`$ npm run tests`

### Build ( pre-publish only )

`$ npm run build`
