import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as cfApi from '@caldera-labs/api-client';

import {EntryViewer} from "./components/EntryViewer/EntryViewer";
import {ChooseForm} from "./components/controls/ChooseForm";
import {ChooseEntry} from "./components/controls/ChooseEntry";


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

ReactDOM.render(
	<div><App
		getForms={getForms}
		getEntries={getEntries}
	/></div>,
	document.getElementById('app')
);

module.hot.accept();