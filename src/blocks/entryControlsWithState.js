import {entryStore,CALDERA_FORMS_ENTRIES_SLUG} from "./entryStore";
import {withSelect} from '@wordpress/data';
import {ChooseForm} from "../components/controls/ChooseForm";
import {ChooseEntry} from "../components/controls/ChooseEntry";
import {ChooseEntryField} from "../components/controls/ChooseEntryField";

export const FormChooserForEntriesWithSelect = withSelect( ( select,ownProps ) => {
	const { getForms } = select( CALDERA_FORMS_ENTRIES_SLUG );

	return {
		...ownProps,
		forms: getForms( ),
	};
} )( ChooseForm );


export const ChooseEntryWithSelect = withSelect( ( select,ownProps ) => {
	const { getEntries } = select( CALDERA_FORMS_ENTRIES_SLUG );
	const {currentFormId} = ownProps;
	
	return {
		...ownProps,
		entries: getEntries(currentFormId,1 ),
	};
} )( ChooseEntry );


export const ChooseEntryFieldWithSelect = withSelect( ( select,ownProps ) => {
	const { getEntries } = select( CALDERA_FORMS_ENTRIES_SLUG );
	const {formId} = ownProps;
	return {
		...ownProps,
		entries: getEntries(formId,1 ),
	};
} )( ChooseEntryField );