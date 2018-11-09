/** globals CF_ADMIN */
// @flow

import React, {Fragment, createElement} from 'react';
import * as cfApi from "@caldera-labs/api-client";
import Display from "./Display";
import {
	EntryControlsEdit,
	EntryInlineEdit
} from '../../components/Entry'
import {formsAdminApiClient} from "../../../wp-content/plugins/caldera-forms/clients/state/api/apiClients";
import {findFormById} from "../../components/Entry/findFormById";
import {InspectorControls} from '@wordpress/editor';
import Controls from "../../components/Entry/Edit/Controls";

const API_URL = CF_ADMIN.api.root.replace(/\/$/, "");
const NONCE = CF_ADMIN.api.nonce;

formsAdminApiClient.setNonce(NONCE);
export const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setNonce(NONCE);

function getForms(page: number): Promise<any> {
	return formsAdminApiClient.makeRequest('forms', {full: true, page});
}

function getEntries(formId: string, page: number): Promise<any> {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}


let entry = {};
let form = {};
let entries = {};

export default function Edit(props) {
	const {attributes, setAttributes, isSelected, className, id} = props;
	const {fieldId, entryId, formId, before, after} = attributes;
	const setBefore = (before) => setAttributes({before});
	const setAfter = (after) => setAttributes({after});
	const setFieldId = (fieldId) => setAttributes({fieldId});

	const setEntryId = (entryId) => {
		setAttributes({entryId});
	};
	const setFormId = (formId) => {
		getEntries(formId, 1)
			.then(response => response.json())
			.then(response => {
				entries = Object.values(response);
				if (entries.hasOwnProperty(entryId)) {
					entry = entries[entryId];
				}
				form = findFormById(forms, formId)
				setAttributes({formId});
			}).catch(e => {
			entries = {};
			entry = {};
			setAttributes({formId});

		});
	};


	let forms = CF_ADMIN ? CF_ADMIN.forms : {};
	forms = Object.values(forms);

	if ('object' !== typeof form) {
		form  = findFormById(forms, formId)
	}

	const editProps = {
		entryId: entryId,
		entries: entries,
		onSetEntry: setEntryId,
		formId: formId,
		forms: forms,
		form: form,
		onSetForm: setFormId,
		instanceId: id,
		onSetField: setFieldId,
		fieldId: fieldId,
		entryFieldId: fieldId,
		before: before,
		after: after,
		setBefore: setBefore,
		setAfter: setAfter,
	};


	const elements = [];
	if (isSelected) {
		elements.push(createElement(EntryInlineEdit, editProps));
	} else {
		if (entryId) {
			elements.push(
				<Display
					form={form}
					currentEntryId={entryId}
					entryId={entryId}
					entry={entry}
					formId={formId}
					entryFieldId={fieldId}
					before={before}
					after={after}
				/>
			)
		}
	}

	elements.push(
		createElement(
			InspectorControls,
			{}, [
				createElement(Controls, editProps)
			]
		)
	);


	return React.createElement(Fragment, {}, elements);


};
