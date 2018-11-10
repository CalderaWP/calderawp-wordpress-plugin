// @flow
import React, {Fragment} from 'react';
import {EntryFieldView} from '../../components/Entry/';
import type {DisplayProps} from "../../components/Entry/types";
import Grid from 'react-css-grid'


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
	if( entry.fields.hasOwnProperty(entryFieldId) ){
		entryField = entry.fields[entryFieldId];
	}
	else{
		return <Fragment/>
	}

	return(
		<Grid>
			<Fragment>{before}</Fragment>
			<EntryFieldView entryField={entryField} fieldType={'text'} />
			<Fragment>{after}</Fragment>
		</Grid>
	);




};
