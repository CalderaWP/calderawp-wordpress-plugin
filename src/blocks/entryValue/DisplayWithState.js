import React, {Fragment} from 'react';
import {EntryFieldView} from '../../components/Entry/';
import type {DisplayProps} from "../../components/Entry/types";
import Grid from 'react-css-grid'
import Display from './Display'
import {withSelect} from "@wordpress/data";
import {CALDERA_FORMS_ENTRIES_SLUG} from "../entryStore";
import {ChooseForm} from "../../components/controls/ChooseForm";
import type {Entry} from "../../flow-types/entryTypes";


export default withSelect( ( select,ownProps ) => {
	const { getForm, getEntry,getEntries} = select( CALDERA_FORMS_ENTRIES_SLUG );
	const {formId,entryId,entryFieldId} = ownProps;
	return {
		...ownProps,
		form: getForm( formId ),
		entry: getEntry(formId,entryId),
		entries: getEntries(formId),
	};
} )( Display );
