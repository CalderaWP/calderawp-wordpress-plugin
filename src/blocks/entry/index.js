import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import {InspectorControls} from '@wordpress/editor';

import { InnerBlocks } from '@wordpress/editor';
import EntryListControls from "../../components/Entry/Edit/EntryListControls";

let allowedBlocks = [ 'core/image', 'core/paragraph' ];

const Edit = ( {
	   attributes,
	   setAttributes,
	   className,
} )  =>{
	const {
		formId,
		entryId
	} = attributes;

	const setFormId = (formId) => {
		setAttributes({formId});
	};

	const setEntryId = (entryId) => {
		setAttributes({entryId});
	};

	const editProps = {
		entryId: entryId,
		entries: entries,
		onSetEntry: setEntryId,
		formId: formId,
		forms: forms,
		form: form,
		onSetForm: setFormId,
		instanceId: id,
	};

	const elements = [];
	const controls = createElement( EntryListControls, editProps );
	if( formId && entryId ){
		elements.push(
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
			/>
		);
	}else{
		elements.push(controls);
	}

	elements.push(createElement(InspectorControls,{},controls));

	return createElement('div', {classname}, elements );
};

const Save = () => {
	return (
		<div>
			<InnerBlocks.Content />
		</div>
	);
}
registerBlock(
	createBlockArgs(
		findBlock('entry',blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace

);