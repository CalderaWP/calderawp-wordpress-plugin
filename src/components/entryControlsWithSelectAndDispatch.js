import {entryStore,CALDERA_FORMS_ENTRIES_SLUG} from "../blocks/entryStore";
import {withSelect,withDispatch} from '@wordpress/data';

import {ChooseForm} from  "./controls/ChooseForm";
import {ChooseEntry} from "./controls/ChooseEntry";
import {ChooseEntryField} from "./controls/ChooseEntryField";


export const FormChooserForEntriesWithSelect = withSelect( ( select,ownProps ) => {
	const {
		getForms,
		getPreviewFormId
	} = select( CALDERA_FORMS_ENTRIES_SLUG );

	return {
		...ownProps,
		forms: getForms( ),
		currentFormId: getPreviewFormId()
	};
} )( ChooseForm );




export const ChooseEntryWithSelect = withSelect( ( select,ownProps ) => {
	const {
		getPreviewEntryId,
		getPreviewFormId,
		getForms,
		getEntries
	} = select( CALDERA_FORMS_ENTRIES_SLUG );


	return {
		...ownProps,
		entries: getEntries(),
		forms: getForms(),
		currentFormId: getPreviewFormId(),
		currentEntry: getPreviewEntryId(),

	};
} )( ChooseEntry );


export const ChooseEntryFieldWithSelect = withSelect( ( select,ownProps ) => {
	const {
		getPreviewEntryId,
		getPreviewFormId,
		getForms,
		getEntries
	} = select( CALDERA_FORMS_ENTRIES_SLUG );
	const {
		entryFieldId
	} = ownProps;

	return {
		...ownProps,
		entries: getEntries(),
		forms: getForms(),
		currentFormId: getPreviewFormId(),
		currentEntry: getPreviewEntryId(),
		entryFieldId

	};
} )( ChooseEntryField );


