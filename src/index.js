import 'babel-polyfill';
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as cfApi from '@caldera-labs/api-client';
import {set as setCookie, get as getCookie, remove as deleteCookie } from 'es-cookie';
import {CFProLogin} from "./components/Login/CFProKeys";
import {CFProLogout} from "./components/Login/CFProLogout";


const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';


function ApiKeys(publicKey,token){
	this.publicKey = publicKey;
	this.token = token;

	this.setToken = (token) => {
		setCookie( 'cs-token', token );
		this.token = token;
	};
	this.setPublicKey = (publicKey) => {
		setCookie( 'cs-public', publicKey );

		this.publicKey = publicKey;
	};

	this.hasKeys  = () => {
		return this.token && this.publicKey;
	}

	this.getRequestArgs = () => {
		return {
			public: this.publicKey,
			token: this.token
		}
	}

	this.forget = () => {
		window.location.reload();
		deleteCookie('cs-token');
		deleteCookie('cs-public');

	}

}

const keys = new ApiKeys(getCookie('cs-public'), getCookie('cs-token'));


const formsAdminApiClient = new cfApi.WpClient(API_URL);
formsAdminApiClient.setCorsMode(true);
const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setCorsMode(true);
function getForms(page) {
	return formsAdminApiClient.makeRequest('forms', {...keys.getRequestArgs(), full: true, page});
}

function getEntries(formId, page) {
	return entryApiClient.makeRequest(`entries/${formId}`, {...keys.getRequestArgs(), page});
}



ReactDOM.render(

	<App
		keys={keys}
		getForms={getForms}
		getEntries={getEntries}
	/>,
	document.getElementById('app')
);

module.hot.accept();