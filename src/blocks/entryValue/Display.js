// @flow
import React, {Fragment} from 'react';
import type {GutenbergSaveProps} from "../types";
import {EntryFieldView,EntryDisplay} from '../../components/Entry/';

import {state} from "@caldera-labs/state";
import type {DisplayProps} from "../../components/Entry/types";
import {entryApiClient} from "./Edit";
import Grid from 'react-css-grid'

function getEntry( formId:string,entryId:number): Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}/${entryId}`);
}



export default function Display(props:DisplayProps) {
	const {
		entryId,
		formId,
		entryFieldId,
		entry,
		before,
		after
	} = props;

	if( ! formId || ! entryId || ! entryFieldId ){
		return <Fragment/>
	}
	let entryField = {};
	if( entry.hasOwnProperty(entryFieldId) ){
		//id or datestamp
		entryField = {value: entry[entryFieldId]};
	}
	else if( ! entry.hasOwnProperty('fields') || ! entry.fields.hasOwnProperty(entryFieldId)){
		return <Fragment/>
	}else{
		entryField = entry.fields[entryFieldId];
	}

	return(
		<Grid>
			<Fragment>{before}</Fragment>
			<EntryFieldView entryField={entryField} fieldType={'text'} />
			<Fragment>{after}</Fragment>
		</Grid>
	);




};
