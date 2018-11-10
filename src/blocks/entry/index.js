/** globals CF_ADMIN */
import {createElement} from '@wordpress/element';
import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import {InspectorControls} from '@wordpress/editor';
import {ChooseEntryWithSelect,ChooseEntryFieldWithSelect,FormChooserForEntriesWithSelect} from "../entryControlsWithState";

import {InnerBlocks} from '@wordpress/editor';
import EntryListControls from "../../components/Entry/Edit/EntryListControls";
import {ChooseForm} from "../../components/controls/ChooseForm";
import {ChooseEntry} from "../../components/controls/ChooseEntry";

let allowedBlocks = ['core/image', 'core/paragraph'];

const Edit = ({
				  attributes,
				  setAttributes,
				  className,
				  id,
			  }) => {
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

	let forms = CF_ADMIN ? CF_ADMIN.forms : {};
	forms = Object.values(forms);

	const inlineElements = [];
	const inspectorControlsElements = [];

	const FormChooser = <FormChooserForEntriesWithSelect
		currentFormId={formId}
		onSetForm={setFormId}
		instanceId={id}
		key={1}
	/>;
	inspectorControlsElements.push(FormChooser);

	const EntryChooser = <ChooseEntryWithSelect
		currentEntry={entryId}
		onSetEntry={setEntryId}
		instanceId={id}
		currentFormId={formId}
		key={2}

	/>

	if( formId ){
		inspectorControlsElements.push(EntryChooser);
	}

	if( !entryId){
		inlineElements.push(EntryChooser);
	}

	if (formId && entryId) {
		inlineElements.push(
			<InnerBlocks
				key={0}
				allowedBlocks={allowedBlocks}
			/>
		);
	}else{
		inlineElements.push(FormChooser);
	}

	inlineElements.push(createElement(InspectorControls, {}, inspectorControlsElements));

	return createElement('div', {className}, inlineElements);
};

const Save = () => {
	return (
		<div>
			<InnerBlocks.Content/>
		</div>
	);
}
registerBlock(
	createBlockArgs(
		findBlock('entry', blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace
);