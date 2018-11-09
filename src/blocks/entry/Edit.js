// @flow
import React, {Fragment} from 'react';
import type {GutenbergEditProps} from "../types";
import {InspectorControls} from "@wordpress/editor";
import {EntryEdit,
	EntryDisplay,
	EntryInlineEdit,
	EntryControlsEdit
} from '../../components/Entry';
import * as cfApi from "@caldera-labs/api-client";
import type {KeyedFormCollection} from "../../flow-types/formType";

const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';
const NONCE = false;
const formsAdminApiClient = new cfApi.WpClient(API_URL );
formsAdminApiClient.setCorsMode(true);
const entryApiClient =  new cfApi.EntriesClient(API_URL );
entryApiClient.setCorsMode(true);

function getForms(page:number) : Promise<any>{
	return formsAdminApiClient.makeRequest( 'forms', {full:true,page});
}

function getEntries(formId:string,page:number) : Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}`, {page});
}

function getEntry( formId:string,entryId:number): Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}/${entryId}`);
}


export default function Edit(props: GutenbergEditProps) {
	const {attributes, setAttributes, isSelected, className,id} = props;
	const {entryId,formId} = attributes;
	const setEntryId = (entryId) => setAttributes({entryId});
	const setFormId = (formId) => setAttributes({formId});
	let forms= {};
	let form = forms.hasOwnProperty(formId) ? forms[formId] : {};
	getForms(1)
		.then((response:Response) => {return response.json();})
		.then((response:KeyedFormCollection) => {
				forms = response;
				form = forms.hasOwnProperty(formId) ? forms[formId] : {};
		});

	let entries = {};
	if( isSelected ){
		return(
			<Fragment>
				<InspectorControls>
					<EntryControlsEdit
						instanceId={id}
						entryId={entryId}
						formId={formId}
						entries={getEntries(formId,1)}
						onSetForm={setFormId()}
						onSetEntry={setEntryId}
					/>
				</InspectorControls>
					<EntryInlineEdit
						instanceId={id}
						entryId={entryId}
						formId={formId}
						entries={getEntries(formId,1)}
						onSetForm={setFormId()}
						onSetEntry={setEntryId}
					/>
			</Fragment>
		);
	}

	return <EntryDisplay
		currentEntryId={entryId}
		entries={entries}
		getCurrentEntry={entries[entryId]}
		form={form}
	/>
};
