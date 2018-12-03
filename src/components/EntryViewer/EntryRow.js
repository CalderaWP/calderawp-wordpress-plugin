// @flow

import React from 'react';
import type {Entry,EntryField} from "../../flow-types/entryTypes";
import {EntryFieldView} from "./EntryFieldView";
import {TableCell} from "./components/TableCell";

export const EntryRow = (props: {entry: Entry} ) => {
	const {entry} = props;
	const {
		id,
		fields
	} = entry;
	return (
		<tr>
			<th scope="row">{id}</th>
			{Object.values(fields).map( (entryField : EntryField ) => {
				return (
					<TableCell key={entryField.id}>
						<EntryFieldView entryField={entryField} labelWith={entryField.slug} fieldType={'text'}/>
					</TableCell>
				);
			})}
		</tr>
	);
};
