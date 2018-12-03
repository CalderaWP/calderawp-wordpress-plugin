import createBlockName from "../../block-factory/createBlockName";
import {blocks, findBlock, nameSpace} from "../../block-factory";
import registerBlock from "../../block-factory/registerBlock";
import createBlockArgs from "../../block-factory/createBlockArgs";
import {EntryViewer} from "../../components/EntryViewer/EntryViewer";
import React, {Fragment} from "react";
import {select} from "@wordpress/data";
import {CALDERA_FORMS_ENTRIES_SLUG} from "../entryStore";
import {InspectorControls, InnerBlocks} from '@wordpress/editor';
import {FormChooserForEntriesWithSelect} from '../entryControlsWithState'
import {TextControl} from '@wordpress/components';
import {Title} from  './components/Title';
import {Display} from "./components/Display";
import {Save} from "./components/Save";

function getCurrentEntry(entries, entryId) {
	return entries.hasOwnProperty(entryId) ? entries[entryId] : {};
}

const Edit = ({attributes, setAttributes, clientId}) => {
	const {formId, page,title} = attributes;
	const setFormId = formId => setAttributes({formId});
	const setTitle = title => setAttributes({title});

	let entries = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getEntries(formId, 1) : {};
	let form = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getForm(formId) : {};
	const ChooseFormsToView = <FormChooserForEntriesWithSelect
		currentFormId={formId}
		onSetForm={setFormId}
		instanceId={clientId + '-form-chooser'}
	/>;

	const MainEditor = formId ? Display(entries,form) : ChooseFormsToView;

	return (
		<Fragment>

			{formId ? (
				<Display
					entries={entries}
					form={form}
					title={title}
					getCurrentEntry={getCurrentEntry}
				/>
			) : (
				<FormChooserForEntriesWithSelect
					currentFormId={formId}
					onSetForm={setFormId}
					instanceId={clientId + '-form-chooser'}
				/>
			)}

			<InspectorControls>
				<FormChooserForEntriesWithSelect
					currentFormId={formId}
					onSetForm={setFormId}
					instanceId={clientId + '-form-chooser'}
				/>
				<TextControl
					value={title}
					label={'Title (h2)'}
					onChange={setTitle}

				/>

			</InspectorControls>
		</Fragment>

	)
}



const blockArgs = createBlockArgs(
	findBlock('entryTable', blocks),
	nameSpace,
	Edit,
	Save
);


registerBlock(
	blockArgs, nameSpace
);





