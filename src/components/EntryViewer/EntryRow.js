// @flow

import React, {Component, Fragment} from 'react';
import type {Entry,EntryField} from "../../flow-types/entryTypes";
import {EntryFieldView} from "./EntryFieldView";

export const TableCell = (props) =>{
	return <td>{props.children}</td>
};

export const EntryRow = (props: {entry: Entry} ) => {
	const {entry} = props;
	return (
		<tr>
			<th scope="row">{entry.id}</th>
			{Object.values(entry.fields).map( (entryField : EntryField ) => {
				return (<TableCell><EntryFieldView entryField={entryField}/></TableCell>);
			})}
		</tr>
	);
};
