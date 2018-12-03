import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as cfApi from '@caldera-labs/api-client';


const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';
const HEADERS = {
	'X-CS-PUBLIC' : 'pub1',
	'X-CS-TOKEN' : 'aa5ed3252fb7f17ae15ba2f6afe1069256c7861c'
};

//const NONCE = false;

const formsAdminApiClient = new cfApi.WpClient(API_URL);
formsAdminApiClient.setCorsMode(true);
formsAdminApiClient.setHeaders(HEADERS);
const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setCorsMode(true);
entryApiClient.setHeaders(HEADERS);
function getForms(page) {
	return formsAdminApiClient.makeRequest('forms', {full: true, page});
}

function getEntries(formId, page) {
	return entryApiClient.makeRequest(`entries/${formId}`, {page});
}



ReactDOM.render(
	<div>
		<App
			getForms={getForms}
			getEntries={getEntries}
		/>
	</div>,
	document.getElementById('app')
);

module.hot.accept();