import React, {createElement, Fragment} from 'react';
import type {EditProps} from "../types";
import {findFormById} from "../findFormById";
import type {Node} from 'react'

import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntryField} from "../../controls/ChooseEntryField";
import {ChooseEntry} from "../../controls/ChooseEntry";
import BeforeControl from '../../../components/Entry/Edit/BeforeControl';
import AfterControl from '../../../components/Entry/Edit/AfterControl';

export default function (props: EditProps,): Node {
	const {
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
		setAfter,
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

	if (entryId) {
		elements.push(<ChooseEntryField
			currentEntry={entryId}
			form={form}
			onSetField={onSetField}
			instanceId={instanceId}
			entries={entries}
			entryFieldId={entryFieldId}
			key={3}

		/>);
		elements.push(
			<BeforeControl
				setBefore={setBefore}
				before={before}
				instanceId={instanceId}
				key={5}
			/>
		);
		elements.push(
			<AfterControl
				setAfter={setAfter}
				after={after}
				instanceId={instanceId}
				key={6}
			/>
		);
	}

	return createElement(Fragment, {}, elements);
}