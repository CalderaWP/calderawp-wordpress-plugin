// @flow

import React, {Component, Fragment} from 'react';
import type {EntriesCollection,EntryField} from "../../flow-types/entryTypes";
export const EntryHeaders = (props: {entries: EntriesCollection} ) => {
	const {entries} = props;
	const firstEntry = Object.values(props.entries)[0];
	return (
		<tr>
			<th scope="col">ID</th>
			{Object.values(firstEntry.fields).map( (entryField : EntryField ) => {
				return (<th key={entryField.id}>{entryField.slug}</th>);
			})}
		</tr>
	);
};
