// @flow

import React from 'react';
import type {EntriesCollection,EntryField} from "../../flow-types/entryTypes";
import type {FormFieldsCollection,FormField} from "../../flow-types/formType";
import {EntryHeader} from "./EntryHeader";

export function getFieldFromCollection( fields: FormFieldsCollection, fieldId:string ) : FormField {
	if( ! fields.hasOwnProperty(fieldId) ){
		// eslint-disable-next-line no-throw-literal
		throw 'Can not find field';
	}
	return fields[fieldId];
};


export const EntryHeaders = (props: {
	entries: EntriesCollection,
	formFields: FormFieldsCollection}
) => {
	const {formFields} = props;
	const firstEntry = Object.values(props.entries)[0];
	return (
		<tr>
			<th scope="col">ID</th>
			{Object.values(firstEntry.fields).map( (entryField : EntryField ) => {
				let labelWith;
				let fieldType = 'text';

				try {
					const field = getFieldFromCollection(formFields,entryField.field_id);
					labelWith = field.name;
					fieldType = field.type;
				}catch(e){
					labelWith = entryField.slug
				}


				return (
					<th key={entryField.id}>
						<EntryHeader entryField={entryField} labelWith={labelWith} fieldType={fieldType}/>
					</th>);
			})}
		</tr>
	);
};
