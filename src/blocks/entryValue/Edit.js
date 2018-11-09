// @flow

import React, {Fragment,createElement} from 'react';
import * as cfApi from "@caldera-labs/api-client";
import {dispatch} from '@wordpress/data'
import {state} from "@caldera-labs/state";
import Display from "./Display";
import {
	EntryEdit,
	EntryFieldView
} from  '../../components/Entry'
import {InspectorControls} from "@wordpress/editor";

import {formsAdminApiClient} from "../../../wp-content/plugins/caldera-forms/clients/state/api/apiClients";
import type {FormType} from "../../flow-types/formType";


const API_URL = CF_ADMIN.api.root.replace(/\/$/, "");
const NONCE = CF_ADMIN.api.nonce;

formsAdminApiClient.setNonce(NONCE);
//formsAdminApiClient.setCorsMode(true);
export const entryApiClient =  new cfApi.EntriesClient(API_URL );
//entryApiClient.setCorsMode(true);
entryApiClient.setNonce(NONCE);

function getForms(page:number) : Promise<any>{
	return formsAdminApiClient.makeRequest( 'forms', {full:true,page});
}


function getEntries(formId:string,page:number) : Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}`, {page});
}





let entry = {};
let form = {};
let entries = {};

function setEntries(entries,formId,PageNumber){
	dispatch( state.CALDERA_FORMS_ENTRIES_SLUG ).setEntries(entries,formId,PageNumber );
}


export function findFormById(forms, formId) {
	return forms.find((__form: FormType) => formId === __form.ID);
}

export default function Edit(props) {
	const {attributes, setAttributes, isSelected, className,id} = props;
	const {fieldId,entryId,formId,before,after} = attributes;
	const setBefore = (before) => setAttributes({before});
	const setAfter = (after) => setAttributes({after});
	const setFieldId = (fieldId) => setAttributes({fieldId});

	const setEntryId = (entryId) => {
		setAttributes({entryId});
	};
	const setFormId = (formId) => {
		getEntries(formId,1)
			.then(response => response.json() )
			.then( response  => {
				entries = Object.values(response);
				if( entries.hasOwnProperty(entryId)){
					entry = entries[entryId];
				}
				form = findFormById(forms, formId)
				setEntries(entries,formId,1);
				setAttributes({formId});
			}).catch(e => {
				entries = {};
				entry = {};
				setAttributes({formId});

			});
	};

	let forms = CF_ADMIN ? CF_ADMIN.forms : {};
		forms = Object.values(forms);

		if('object' !==typeof form ){
			form = form = findFormById(forms, formId)
		}
	if( isSelected ) {
		return <EntryEdit
			entryId={entryId}
			entries={entries}
			onSetEntry={setEntryId}
			formId={formId}
			forms={forms}
			form={form}
			onSetForm={setFormId}
			instanceId={id}
			onSetField={setFieldId}
			fieldId={fieldId}
			entryFieldId={fieldId}
			before={before}
			after={after}
			setBefore={setBefore}
			setAfter={setAfter}

		/>
	}




	if (entryId) {
		return <Display
			form={form}
			currentEntryId={entryId}
			entryId={entryId}
			entry={entry}
			formId={formId}
			entryFieldId={fieldId}
			before={before}
			after={after}
		/>
	}
	return <Fragment/>


};
