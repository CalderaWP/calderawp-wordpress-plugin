import React, {createElement, Fragment} from 'react';
import type {EditProps} from "../types";
import {findFormById} from "../findFormById";
import type {Node} from 'react'

import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntry} from "../../controls/ChooseEntry";
import type {EntryFieldCollection} from "../../../flow-types/entryTypes";
import type {FormsCollection, FormType} from "../../../flow-types/formType";
export type EntryListControlProps = {
	entryId: number,
	entries: EntryFieldCollection,
	onSetEntry: (entryId:string) => void,
	formId: string,
	forms: FormsCollection,
	form: FormType,
	onSetForm: (formId) => void,
	instanceId: string,
};
export default function (props: EntryListControlProps): Node {
	const {
		entries,
		formId,
		entryId,
		onSetForm,
		onSetEntry,
		instanceId,
		forms
	} = props;
	let form = {};
	if (!props.form) {
		form = findFormById(forms, formId);
	} else {
		form = props.form;
	}

	const elements = [
		<ChooseForm
			forms={forms}
			currentFormId={formId}
			onSetForm={onSetForm}
			instanceId={instanceId}
			key={1}
		/>
	];

	if (formId) {
		elements.push(<ChooseEntry
			entries={entries}
			currentEntry={entryId}
			onSetEntry={onSetEntry}
			instanceId={instanceId}
			key={2}
		/>);
	}



	return createElement(Fragment, {}, elements);
}