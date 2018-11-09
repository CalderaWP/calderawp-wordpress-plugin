// @flow

import React from 'react';
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
				return (
					<TableCell key={entryField.id}>
						<EntryFieldView entryField={entryField} labelWith={entryField.slug}/>
					</TableCell>
				);
			})}
		</tr>
	);
};
