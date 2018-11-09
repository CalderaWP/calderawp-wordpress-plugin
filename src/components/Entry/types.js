// @flow

import type {FormsCollection, FormType} from "../../flow-types/formType";
import type {EntriesCollection, Entry} from "../../flow-types/entryTypes";

type entryId = number;
type formId = string;

export type FormChooserProps = {
	forms: FormsCollection,
	currentFormId: string,
	onSetForm: (string) => void,
	instanceId: string

}


export type EntryChooserProps = {
	entries: EntriesCollection,
	currentEntry: number,
	onSetEntry: (number) => void,
	instanceId: string
};


export type EntryFieldChooserProps = {
	currentEntry: Entry,
	form: FormType,
	onSetField: (number) => void,
	instanceId: string,
	entries:EntriesCollection,
	entryFieldId: string,
	showLabel?:boolean
};

export type EditBeforeProps ={
	setBefore: (before:string) => void,
	before:string,
	instanceId: string,
	hideLabel?: boolean
};

export type EditAfterProps ={
	setAfter: (after:string) => void,
	after:string,
	instanceId: string,
	hideLabel?: boolean

}

//EntryViewerProps
export type DisplayProps = {
	entryId: entryId,
	formId: formId,
	entryFieldId:string,
	entry: Entry,
	before:string,
	after: string,
};


export type EditProps = {
	instanceId: string,
	entryId: string,
	formId: string,
	...EditBeforeProps,
	...EditAfterProps,
	...FormChooserProps,
	...EntryChooserProps,
	...EntryFieldChooserProps
}


