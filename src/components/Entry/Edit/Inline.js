// @flow
import React, {Fragment} from 'react';
import type {EditProps} from "../types";
import type {Node} from 'react'
import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntry} from "../../controls/ChooseEntry";
import {ChooseEntryField} from "../../controls/ChooseEntryField";
import BeforeControl from './BeforeControl';
import AfterControl from './AfterControl';


type Props = {
	...EditProps,
	ChooseEntryField?: * => React$Element<*>
}

export type InlineEditorForEntryValue = {
	setBefore: (before: string) => void,
	setAfter: (after: string) => void,
	before: string,
	after: string,
	getChooseEntryField: () => React$Element<*>,
	instanceId: string,

};

export function EntryValueInlineEditor(props: InlineEditorForEntryValue) {
	const {
		before,
		after,
		setAfter,
		setBefore,
		instanceId,
		getChooseEntryField
	} = props;

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
					{getChooseEntryField()}
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


export default function (props: Props): Node {
	const {
		forms,
		entries,
		formId,
		entryId,
		onSetForm,
		onSetEntry,
		instanceId,
		onSetField,
		entryFieldId,
		before,
		after,
		setBefore,
		setAfter
	} = props;
	if ('undefined' === typeof forms) {
		return <Fragment/>
	}

	const form = forms.find(form => formId === form.ID);
	if (!formId) {
		return <ChooseForm
			forms={forms}
			currentFormId={formId}
			onSetForm={onSetForm}
			instanceId={instanceId}
		/>
	}

	if (!entryId) {
		return <ChooseEntry
			entries={entries}
			currentEntry={entryId}
			onSetEntry={onSetEntry}
			instanceId={instanceId}
		/>
	}

	let entryField = null;

	function getChooseEntryField() {
		if (props.ChooseEntryField) {
			return props.ChooseEntryField;
		}
		const hideLabel = entryFieldId && entryFieldId.length;
		return <ChooseEntryField
			currentEntry={entryId}
			form={form}
			onSetField={onSetField}
			instanceId={instanceId}
			entries={entries}
			entryFieldId={entryFieldId}
			hideLabel={hideLabel}
		/>;
	}

	if (entryId && !entryFieldId) {

		const entry = entries.hasOwnProperty(entryId) ? entries[entryId] : null;
		if (entry) {
			entryField = entry.fields[entryFieldId];

		}
		return (
			getChooseEntryField()
		)

	}


	if (entryFieldId) {
		return EntryValueInlineEditor({
			...props,
			getChooseEntryField
		});

	}


}


