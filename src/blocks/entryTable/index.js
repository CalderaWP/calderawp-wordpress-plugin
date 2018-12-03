import createBlockName from "../../block-factory/createBlockName";
import {blocks, findBlock, nameSpace} from "../../block-factory";
import registerBlock from "../../block-factory/registerBlock";
import createBlockArgs from "../../block-factory/createBlockArgs";
import {EntryViewer} from "../../components/EntryViewer/EntryViewer";
import React from "react";
import {select} from "@wordpress/data";
import {CALDERA_FORMS_ENTRIES_SLUG} from "../entryStore";

function getCurrentEntry(entries,entryId){
	return entries.hasOwnProperty(entryId) ? entries[entryId] : {};
}
const Edit = ({attributes,setAttributes} ) => {
	const {formId,page} = attributes;
	let entries = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getEntries(formId, 1)  : {};
	let form = formId ? select(CALDERA_FORMS_ENTRIES_SLUG).getForm(formId) : {};
	return (
		<EntryViewer
			currentEntryId={0}
			entries={entries}
			getCurrentEntry={this.getCurrentEntry}
			form={form}
		/>
	)
}

const Save = ({attributes} ) =>{
	return null;
}

const blockArgs = createBlockArgs(
	findBlock('entryTable', blocks),
	nameSpace,
	Edit,
	Save
);


export const ENTRY_TABLE_BLOCK_NAME = createBlockName(nameSpace, blockArgs.slug);
let registered = false;
if (!registered) {
	registerBlock(
		blockArgs, nameSpace
	);
	registered = true;


}
