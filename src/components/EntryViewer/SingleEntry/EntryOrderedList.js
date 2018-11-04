// @flow

import React, {Fragment} from 'react';

import type {Entry, EntryField} from "../../../flow-types/entryTypes";
import type {FormType} from "../../../flow-types/formType";
import {EntryFieldView} from "../EntryFieldView";
import {EntryHeader} from "../EntryHeader";
import {getFieldFromCollection} from "../EntryHeaders";
import EntryListItem from './components/EntryListItem';


export default function( props: {entry:Entry,form:FormType })  {
	const {
		entry,
		form
	} = props;


	return (
		<div
			className={'ff'}
		>
			<ul>
				{Object.values(entry.fields).map( (entryField:entryField)=> {
					let labelWith;
					let fieldType = 'text';

					try {
						const field = getFieldFromCollection(formFields,entryField.field_id);
						labelWith = field.name;
						fieldType = field.type;
					}catch(e){
						labelWith = entryField.slug
					}


					return EntryListItem(entryField, labelWith, fieldType);

				})}
			</ul>
		</div>
	);
}
