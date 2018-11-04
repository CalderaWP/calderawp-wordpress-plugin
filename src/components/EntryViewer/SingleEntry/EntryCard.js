// @flow

import React, {Fragment} from 'react';

import type {Entry, EntryField} from "../../../flow-types/entryTypes";
import type {FormField_Details, FormFieldsCollection, FormType} from "../../../flow-types/formType";
import {EntryFieldView} from "../EntryFieldView";
import {EntryHeader} from "../EntryHeader";
import {getFieldFromCollection} from "../EntryHeaders";
import EntryListItem from './components/EntryListItem';

const gravatar = require('gravatar');

export default function( props: {
	entry:Entry,
	form:FormType,
	showFull: boolean,
	toggleShowFull: () => void
}) {
	const {
		entry,
		form,
		showFull,
		toggleShowFull
	} = props;
	const formFields = forms.fields;

	function AllFields(props: {order:FormFieldsCollection,formFields:FormFieldsCollection}){
		return (
			<Fragment>
				{
					Object.values(order).map(
						(field_detail:FormField_Details) => {
							let labelWith;
							let fieldType = 'text';
							const entryField = entry.fields[field_detail.id];
							try {
								const field = getFieldFromCollection(formFields,field_detail.id);
								labelWith = field.name;
								fieldType = field.type;
							}catch(e){
								labelWith = entryField.slug
							}


							return EntryListItem(entryField, labelWith, fieldType);
						});
				}

			</Fragment>
		)

	}
	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			<ul>
					{Object.values(entry.fields).map( (entryField : EntryField ) => {
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
							<div className="card" style="width: 18rem;">
								<img
									className="card-img-top"
									src={gravatar.url(entry.user.email)}
									alt="Card image cap"
								/>
									<div className="card-body">
										<h5 className="card-title">{entry.id}</h5>
									</div>
									<ul className="list-group list-group-flush">
										{Object.values(form.field_details.entryList).map(
											(field_detail:FormField_Details) => {
												let labelWith;
												let fieldType = 'text';
												const entryField = entry.fields[field_detail.id];
												try {
													const field = getFieldFromCollection(formFields,field_detail.id);
													labelWith = field.name;
													fieldType = field.type;
												}catch(e){
													labelWith = entryField.slug
												}


												return EntryListItem(entryField, labelWith, fieldType);
											})
										}
										{showFull &&
											<AllFields order={form.field_details.order} formFields={formFields}/>
										}


									</ul>
									<div className="card-body">
										<button
											onClick={toggleShowFull}
											className="card-link"
										>
											View Full Details
										</button>
										<button href="#" className="card-link">Action Two</button>
									</div>
							</div>);
						});
					}
			</ul>
		</div>
	);
}
