import React, {Fragment} from 'react';
import type {EditProps} from "../types";
import type {Node} from 'react'
import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntry} from "../../controls/ChooseEntry";
import {ChooseEntryField} from "../../controls/ChooseEntryField";
import BeforeControl from './BeforeControl';
import AfterControl from './AfterControl';
//import {EntryFieldView} from "../../EntryViewer/EntryFieldView";
//import Grid from 'react-css-grid'
//import Display from "../../../blocks/entryValue/Display";
import ReactHoverObserver from 'react-hover-observer';


export default function (props: EditProps): Node {
	const {forms, entries, formId, entryId, onSetForm, onSetEntry, instanceId, onSetField, entryFieldId,before,after,setBefore,setAfter} = props;
	const form = forms.find(form => formId === form.ID);
	if (!formId) {
		return <ChooseForm
			forms={forms}
			currentFormId={formId}
			onSetForm={onSetForm}
			instanceId={instanceId}
		/>
	}

	if( ! entryId ){
		return <ChooseEntry
			entries={entries}
			currentEntry={entryId}
			onSetEntry={onSetEntry}
			instanceId={instanceId}
		/>
	}

	let entryField = null;
	if (entryId && ! entryFieldId) {

		const entry = entries.hasOwnProperty(entryId) ? entries[entryId] : null;
		if (entry) {
			entryField = entry.fields[entryFieldId];

		}

		return (
			<ChooseEntryField
				currentEntry={entryId}
				form={form}
				onSetField={onSetField}
				instanceId={instanceId}
				entries={entries}
				entryFieldId={entryFieldId}
			/>
		)

	}

	if( entryFieldId ){
		return (
			<Fragment>

			<span>
				<BeforeControl
					setBefore={setBefore}
					before={before}
					instanceId={instanceId}
					hideLabel={true}
				/>
			</span>

				<span>
				<ChooseEntry
					entries={entries}
					currentEntry={entryId}
					onSetEntry={onSetEntry}
					instanceId={instanceId}
				/>
			</span>

				<span>
				<AfterControl
					setAfter={setAfter}
					after={after}
					instanceId={instanceId}
					hideLabel={true}

				/>
			</span>

			</Fragment>
		);

	}


}


