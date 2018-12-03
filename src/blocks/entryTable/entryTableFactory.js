import React from 'react';
import ReactDOM from 'react-dom';
import * as cfApi from '@caldera-labs/api-client';
import Entries from "../../Pages/Entries";

const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';
//const NONCE = false;

const formsAdminApiClient = new cfApi.WpClient(API_URL);
formsAdminApiClient.setCorsMode(true);
const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setCorsMode(true);

function getForms(page) {
	return formsAdminApiClient.makeRequest('forms', {full: true, page});
}

function getEntries(formId, page) {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}


export const entryTableFactory = (formId, element) => {
	return ReactDOM.render(
		<Entries getForms={getForms} getEntries={getEntries} formId={formId}/>,
		element
	)
}