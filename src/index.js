import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as cfApi from '@caldera-labs/api-client';
import {set as setCookie, get as getCookie, remove as deleteCookie } from 'es-cookie';
import Jwt from "./authUtils/Jwt";



const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';
const auth = new Jwt();



const formsAdminApiClient = new cfApi.WpClient(API_URL);
formsAdminApiClient.setCorsMode(true);
const entryApiClient = new cfApi.EntriesClient(API_URL);
entryApiClient.setCorsMode(true);
async function getForms(page) {
	return fetch(`/forms?page=${page}&jwt=${auth.getToken()}`);
}

async function getEntries(formId, page) {
	return fetch(`/entries/${formId}?page=${page}&jwt=${auth.getToken()}`);

}


const isLoggedIn =  auth.getToken();


ReactDOM.render(
	<App
		jwt={auth.getToken()}
		onJwtToken={({token,displayName}) => {
			auth.setDisplayName(displayName);
			auth.setToken(token);
			window.location.reload();
		}}
		onLogout={() => {
			auth.forget();
			window.location.reload();
		}}
		isLoggedIn={isLoggedIn}
		getForms={getForms}
		getEntries={getEntries}
	/>,
	document.getElementById('app')
);

module.hot.accept();