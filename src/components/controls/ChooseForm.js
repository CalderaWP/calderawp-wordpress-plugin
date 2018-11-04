// @flow
import React from 'react';
import type {FormType,FormsCollection} from "../../flow-types/formType";

export const ChooseForm = (props: {forms: FormsCollection, currentFormId: string, onChange: (string) => void, instanceId: string }) => {
	const id = 'caldera-forms-form-chooser-' + props.instanceId;
	return (
		<div>
			<label
				htmlFor={id}
			>
				Choose Form
			</label>
			<select
				id={id}
				className={'caldera-forms-form-chooser'}
				value={ props.currentFormId }
				onChange={ (event) => {props.onChange(event.target.value)} }
			>
				{ props.forms.map( (form: FormType) => ( <option key={form.ID} value={form.ID}>{form.name}</option>) )}
			</select>
		</div>
	);

};
