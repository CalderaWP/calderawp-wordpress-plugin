// @flow

import React from 'react';
import type {Entry,EntryField} from "../../flow-types/entryTypes";
import {EntryFieldView} from "./EntryFieldView";
import {TableCell} from "./components/TableCell";
import {EntryActions} from "./components/EntryActions";

export const EntryRow = (props: {entry: Entry} ) => {
	const {entry} = props;
	const {
		id,
		fields,
		form_id
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
