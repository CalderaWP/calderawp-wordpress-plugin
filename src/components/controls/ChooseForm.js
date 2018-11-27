// @flow
import React from 'react';
import type {FormType,FormsCollection} from "../../flow-types/formType";
import type {FormChooserProps} from "../Entry/types";
import classNames from 'classnames';
export const ChooseForm = (props: FormChooserProps) => {
	const id = 'caldera-forms-form-chooser-' + props.instanceId;
	return (
		<div>
			<label
				className={classNames({'sr-only': false})}
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
				{<option key={'null-opt'}> -- </option>}
				{ props.forms.map( (form: FormType) => ( <option key={form.ID} value={form.ID}>{form.name}</option>) )}
			</select>
		</div>
	);

};
