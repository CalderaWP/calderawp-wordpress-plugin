import {
	HelloDisplay,
	HelloControlsEdit,
	HelloInlineEdit
} from '../../components/Hello';
import {Fragment,createElement} from '@wordpress/element'
import {
	InspectorControls,
	//InnerBlocks
} from '@wordpress/editor';
const {InnerBlocks} = wp.editor;
import {registerBlockType} from '@wordpress/blocks';
import type {GutenbergEditProps} from "../types";
import React from 'react';


let fields = [
	{
		ID: 'fld10',
		label: 'Field One',
		type: 'text',
		value: 'value'
	},
	{
		ID: 'fld11',
		label: 'Field Two',
		type: 'file',
		value: 'picture'
	}
];

fields.forEach( field => {
	field.namespacedName =`something/${field.id}`
	registerBlockType( field.namespacedName, {
		title: field.label,
		// Only allow in a registered parent-block:
		parent: [ 'ibenic/parent-block' ],

	});
});




export default function Edit(props: GutenbergEditProps) {
	const {attributes, setAttributes, isSelected, className} = props;
	const {name,salutation} = attributes;
	const onChangeSalutation = (salutation) => {setAttributes({salutation})};
	const onChangeName = (name) => {setAttributes({name})};


	let allowedBlocks = [ 'core/image', 'core/paragraph' ];

	let template = [
		[ 'core/paragraph', { placeholder: 'Enter side content...' } ],
		[ 'core/paragraph', { placeholder: 'Second Content' } ]
	];
	fields.forEach( field => {
		allowedBlocks.push(field.namespacedName)
		template.push(field.namespacedName)
	});
	return (
		<div className={ className }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={template}
				templateLock={false}
			/>
		</div>
	);

}
