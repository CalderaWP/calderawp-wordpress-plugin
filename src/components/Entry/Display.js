// @flow

import React, {Fragment} from 'react';
import type {DisplayProps} from "./types";
import type {Node} from 'react'
import {EntryFieldView} from "../EntryViewer/EntryFieldView";
import Grid from "react-css-grid";

export default function (props: DisplayProps): Node {
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
}
