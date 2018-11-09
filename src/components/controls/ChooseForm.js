// @flow
import React from 'react';
import type {FormType,FormsCollection} from "../../flow-types/formType";
import type {FormChooserProps} from "../Entry/types";

export const ChooseForm = (props: FormChooserProps) => {
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
				onChange={ (event) => {props.onSetForm(event.target.value)} }
			>
				{ props.forms.map( (form: FormType) => ( <option key={form.ID} value={form.ID}>{form.name}</option>) )}
			</select>
		</div>
	);

};
