/** globals CF_ADMIN */
import {createElement} from '@wordpress/element';
import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import {InspectorControls, InnerBlocks} from '@wordpress/editor';
import {select} from '@wordpress/data';
import {
	ChooseEntryWithSelect,
	ChooseEntryFieldWithSelect,
	FormChooserForEntriesWithSelect
} from "../entryControlsWithState";
import {entryStore, CALDERA_FORMS_ENTRIES_SLUG} from "../entryStore";
import {ENTRY_VALUE_BLOCK_NAME} from "../entryValue";


let allowedBlocks = [
	'core/image',
	'core/paragraph',
	ENTRY_VALUE_BLOCK_NAME
];


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

	if (!entryId) {
		inlineElements.push(EntryChooser);
	}


	if (formId && entryId) {
		let template = [
			['core/paragraph', {placeholder: 'Enter side content...'}],
			['core/paragraph', {placeholder: 'Second Content'}]
		];
		const formFields = select(CALDERA_FORMS_ENTRIES_SLUG).getFormFieldsForEntry(formId);
		if ('object' === typeof formFields) {
			Object.values(formFields).forEach(formField => {
				template.push([ENTRY_VALUE_BLOCK_NAME, {
					entryId,
					formId,
					fieldId: formField.id,
					before: formField.label + ' : '
				}]);
			});
		}

		inlineElements.push(
			<InnerBlocks
				key={0}
				allowedBlocks={allowedBlocks}
				template={template}
			/>
		);
	} else {
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