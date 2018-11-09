// @flow
import React, {Fragment} from 'react';
import type {Entry, EntriesCollection} from "../../flow-types/entryTypes";
import type {FormType} from "../../flow-types/formType";
import {getFieldFromCollection} from "../EntryViewer/EntryHeaders";
import type {EntryFieldChooserProps} from "../Entry/types";
import classNames from "classnames";


export const ChooseEntryField = (props: EntryFieldChooserProps) => {
	const {
		hideLabel,
		currentEntry,
		instanceId,
		form,
		onSetField,
		entryFieldId
	} = props;
	const formFields = {
		...form.field_details.entry_list,
		...form.field_details.order
	};
	const className = 'caldera-forms-entry-field-chooser';
	const id = className + '-' + instanceId;

	let options = [
		{
			label: '--',
			value: null
		}
	];


	if ('object' === typeof formFields && JSON.stringify(formFields) !== JSON.stringify({})) {
		Object.values(formFields).forEach((field: { ID: string, name: string, type: string }) => {
			if ('object' === typeof  field) {
				options.push({
					value: field.id,
					label: field.label
				});
			}

		});
	}
	return (
		<Fragment>
			<label
				htmlFor={id}
				className={classNames({
					'sr-only': hideLabel,
					'screen-reader-text': hideLabel,
				})}
			>
				Choose Field
			</label>
			<select
				id={id}
				className={className}
				value={entryFieldId}
				onChange={(event) => {
					onSetField(event.target.value)
				}}
			>
				{options.map((option: { value: number, label: sring | number }) => (
					<option key={option.value} value={option.value}>{option.label}</option>))}
			</select>
		</Fragment>

	);
};
