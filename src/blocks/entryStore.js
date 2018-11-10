if( ! global._babelPolyfill ) {
	require('babel-polyfill');
}

import {registerStore,dispatch,select} from  '@wordpress/data';
import {state,store} from '@caldera-labs/state';
import * as cfApi from "@caldera-labs/api-client";
import {formsAdminApiClient} from "../../wp-content/plugins/caldera-forms/clients/state/api/apiClients";
import {SET_FORM,SET_FORMS} from "../../wp-content/plugins/caldera-forms/clients/state/actions/form";

const {actions,selectors,reducers} = store;
const {setForms,setForm} = actions;
const API_URL = 'object' === typeof CF_ADMIN ? CF_ADMIN.api.root.replace(/\/$/, "") : 'http://localhost:8218';
let forms = 'object' === typeof CF_ADMIN ? CF_ADMIN.forms : {};
forms = Object.values(forms);
const NONCE = 'object' === typeof CF_ADMIN ? CF_ADMIN.api.nonce : '12345';

formsAdminApiClient.setNonce(NONCE);
export const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setNonce(NONCE);

function _getForms(page: number): Promise<any> {
	return formsAdminApiClient.makeRequest('forms', {full: true, page});
}

function getEntries(formId: string, page: number): Promise<any> {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}

const e = forms.reduce((acc, form) => {
	console.log(acc,form);
	acc[form.ID] = {1:{}};
	return acc;
}, {});

const initialState =
	{
		...e,
		forms,
	};
export function entryStoreFactory( slug,resolvers = {} ){
	return registerStore(slug,{
		reducer( state = {forms}, action ){
			switch( action.type ){
				case SET_FORM :
					const forms = [...state.forms];
					const index = forms.findIndex( form => action.form.ID === form.ID);
					if( index > -1 ){
						forms[index] = action.form;
					}else{
						forms.push(action.forms);
					}
					return {
						...state,
						forms
					};
				case SET_FORMS :
					return {
						...state,
						forms: action.forms
					};
				default:
					return reducers.entriesReducer(state,action);

			}
			//state = reducers.formsReducer(state,action);
		},
		actions: {
			setForms,
			setForm,
			setEntries: (formId, pageNumber, entries) => actions.setEntries(formId, pageNumber, entries)
		},
		selectors : {
			getEntries(state,formId,pageNumber){
				if (state.hasOwnProperty(formId) && state[formId].hasOwnProperty(pageNumber)) {
					return state[formId][pageNumber];
				}
				return [];
			},
			getForms(state){
				return state.forms;
			},
			getForm(state,formId){
				const {forms} = state;
				const index = forms.findIndex( form => formId === form.ID);
				if( index > -1 ){
					return forms[index];
				}
				return [];
			}
		},
		resolvers
	});
}
export const {CALDERA_FORMS_ENTRIES_SLUG} = state;
export const entryStore = entryStoreFactory(CALDERA_FORMS_ENTRIES_SLUG, {
	getEntries(state,formId,pageNumber = 1){
		getEntries(formId,pageNumber).then(r => r.json() )
			.then( r => {
				console.log(r);
				dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries(formId,pageNumber,r)
			});
	},

});