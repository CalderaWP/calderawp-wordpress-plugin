import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import Edit from './Edit';
import Save from './Save';

import {registerStore} from  '@wordpress/data';
import {state,store} from '@caldera-labs/state';
const {actions,selectors,reducers} = store;
const entryStore = registerStore(state.CALDERA_FORMS_ENTRIES_SLUG,{
	reducer( state = {}, action ){
			return reducers.entriesReducer(state,action);
	},
	actions: {
		setEntries: actions.setEntries
	},
	selectors : {
		getPageOfEntries: actions.getPageOfEntries
	}
});




registerBlock(
	createBlockArgs(
		findBlock('entryValue',blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace

);
