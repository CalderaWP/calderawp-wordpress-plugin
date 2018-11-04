// @flow

import type {FormsCollection, FormType} from "../../flow-types/formType";
import type {EntriesCollection, Entry} from "../../flow-types/entryTypes";

type entryId = number;
type formId = string;

export type FormChooserProps = {
	formId: formId,
	forms: FormsCollection,
	onSetForm: (formId:string)=> void

}


export type EntryChooserProps = {
	entryId:entryId,
	entries: EntriesCollection,
	onSetEntry: (entryId:number)=> void


};

//EntryViewerProps
export type DisplayProps = {
	currentEntryId:number,
	entries:EntriesCollection,
	getCurrentEntry:() => Entry,
	form: FormType
};



export type EditProps = {
	instanceId: string,
	entryId:entryId,
	formId:formId,
	...FormChooserProps,
	...EntryChooserProps
}


