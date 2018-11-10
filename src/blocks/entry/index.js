/** globals CF_ADMIN */
import {createElement} from '@wordpress/element';
import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import React from 'react';
import {InspectorControls, InnerBlocks} from '@wordpress/editor';
import {select} from '@wordpress/data';
import {
	ChooseEntryWithSelect,
	ChooseEntryFieldWithSelect,
	FormChooserForEntriesWithSelect
} from "../entryControlsWithState";
import {entryStore, CALDERA_FORMS_ENTRIES_SLUG} from "../entryStore";
import {ENTRY_VALUE_BLOCK_NAME} from "../entryValue";


let ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	ENTRY_VALUE_BLOCK_NAME
];


const Edit = ({
  attributes,
  setAttributes,
  className,
  id,
  isSelected
}) => {
	let TEMPLATE = [
		[ 'core/columns', {}, [
			[ 'core/column', {}, [
				[ 'core/image' ],
			] ],
			[ 'core/column', {}, [
				[ 'core/paragraph', { placeholder: 'Enter side content...' } ],
			] ],
		] ],
		[ENTRY_VALUE_BLOCK_NAME, {entryId: 1, formId: 'CF5bde22b646ed0', fieldId: 'fld_9970286'}],
	];


	if (!isSelected) {
		return <InnerBlocks
			className={className}
			template={ TEMPLATE }
			allowed={ALLOWED_BLOCKS}
		/>;
	}

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

	if (formId) {
		inspectorControlsElements.push(EntryChooser);
	}


	if (formId && entryId) {
		const formFields = select(CALDERA_FORMS_ENTRIES_SLUG).getFormFieldsForEntry(formId);
		if ('object' === typeof formFields) {
			Object.values(formFields).forEach(formField => {

				TEMPLATE.push([ENTRY_VALUE_BLOCK_NAME, {
					entryId,
					formId,
					fieldId: formField.id,
					before: formField.label + ' : '
				}]);

			});
		}

	} else {
		if (formId) {
			inlineElements.push(EntryChooser);
		} else {
			inlineElements.push(FormChooser);
		}
	}

	inlineElements.push(createElement(InspectorControls, {}, inspectorControlsElements));
	const innerBlocks = <InnerBlocks
		className={className}
		template={ TEMPLATE }
		allowed={ALLOWED_BLOCKS}
	/>;
	inlineElements.push( innerBlocks );
	return createElement('div', {className}, inlineElements);
};

function Display(className) {
	return (
		<div className={className}>
			<p>11</p>
			<InnerBlocks.Content/>
		</div>
	);
}

const Save = ({className}) => {
	return Display(className);
};

registerBlock(
	createBlockArgs(
		findBlock('entry', blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace
);