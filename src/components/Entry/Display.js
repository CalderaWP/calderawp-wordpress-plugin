// @flow

import React, {Fragment} from 'react';
import type {DisplayProps} from "./types";
import type {Node} from 'react'
import {componentClassName} from "../../control-factory/componentClassName";
import {EntryViewer} from "../EntryViewer/EntryViewer";

import {Spinner} from '@wordpress/components'
import {EntryFieldView} from "../EntryViewer/EntryFieldView";
import {getFieldFromCollection} from "../EntryViewer/EntryHeaders";
import type {Entry, EntryField} from "../../flow-types/entryTypes";

export default function (props: DisplayProps): Node {
	const {
		entryId,
		formId,
		entryFieldId,
		entry,
		before,
		after
	} = props;
	if (!entryId) {
		return <Fragment/>
	}

	const entryFieldViewProps = (entry:Entry,entryFieldId:string) => {
		let fieldType = 'text';
		let entryField  = {};
		if (entryFieldId) {
			entryField = entry.hasOwnProperty('fields' ) && entry.fields.hasOwnProperty(entryFieldId) ? entry.fields[entryFieldId] : null;
			if (entryField) {
				fieldType = entryField.type;
			}
		}

		return {
			fieldType,
			entryField,
		}
	};




	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			{entryFieldId &&
				<Fragment><Fragment>{before}</Fragment><EntryFieldView {...entryFieldViewProps()} /><Fragment>{after}</Fragment></Fragment>
			}

		</div>
	);
}
