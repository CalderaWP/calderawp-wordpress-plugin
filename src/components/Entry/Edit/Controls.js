import React, {createElement,Fragment} from 'react';
import type {EditProps} from "../types";
import {findFormById} from "../../../blocks/entryValue/Edit";
import type {Node} from 'react'

import Inline from "./Inline";
import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntryField} from "../../controls/ChooseEntryField";
import {ChooseEntry} from "../../controls/ChooseEntry";
import {
	EntryBeforeEdit,
	EntryAfterEdit
} from '../../../components/Entry';
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
	return <p>Controls</p>;
	if( ! props.form ){
		form = findFormById( forms,formId);
	}else{
		form = props.form;
	}

	const elements = [
		<ChooseForm
			forms={forms}
			currentFormId={formId}
			onSetForm={onSetForm}
			instanceId={instanceId}
		/>
	];

	if( formId ){
		elements.push(<ChooseEntry
			entries={entries}
			currentEntry={entryId}
			onSetEntry={onSetEntry}
			instanceId={instanceId}
		/>);
	}

	if( entryId ){
		elements.push(<ChooseEntryField
			currentEntry={entryId}
			form={form}
			onSetField={onSetField}
			instanceId={instanceId}
			entries={entries}
			entryFieldId={entryFieldId}
		/>);
	}

	if( entryId ){
		elements.push(
			<EntryBeforeEdit
				before={before}
				setBefore={setBefore}
			/>
		);
		elements.push(
			<EntryAfterEdit
				after={after}
				setAfter={setAfter}
			/>
		);
	}

	return createElement( Fragment, {},elements );
}