import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import Edit from './Edit';
import Save from './Save';

import {registerStore,dispatch} from  '@wordpress/data';
import {state,store} from '@caldera-labs/state';
import * as cfApi from "@caldera-labs/api-client";
import {formsAdminApiClient} from "../../../wp-content/plugins/caldera-forms/clients/state/api/apiClients";
const {actions,selectors,reducers} = store;

const API_URL = CF_ADMIN.api.root.replace(/\/$/, "");
const NONCE = CF_ADMIN.api.nonce;

formsAdminApiClient.setNonce(NONCE);
export const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setNonce(NONCE);

function getForms(page: number): Promise<any> {
	return formsAdminApiClient.makeRequest('forms', {full: true, page});
}

function getEntries(formId: string, page: number): Promise<any> {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}

const {CALDERA_FORMS_ENTRIES_SLUG} = state;
export const entryStore = registerStore(CALDERA_FORMS_ENTRIES_SLUG,{
	reducer( state = {}, action ){
			return reducers.entriesReducer(state,action);
	},
	actions: {
		setEntries: actions.setEntries
	},
	selectors : {
		getPageOfEntries: actions.getPageOfEntries
	},
	resolvers : {
		async getEntries(state,formId,page = 1){
			const entries = await getEntries(formId,pageId);
			dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( formId,page,entries );

		}
	}
});

console.log(entryStore);




registerBlock(
	createBlockArgs(
		findBlock('entryValue',blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace

);
