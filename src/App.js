import React from 'react';
//import { BrowserRouter as Router, Link } from "react-router-dom";
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




class App extends React.Component {
	state = {
		forms: [],
		entries: {},
		currentPage: 1,
		currentEntryId: '2',
		currentFormId: 'CF5be77c7b45877'
	};

	constructor(props){
		super(props);
		this.getCurrentEntry = this.getCurrentEntry.bind(this);
		this.getCurrentForm = this.getCurrentForm.bind(this);

		this.setCurrentForm = this.setCurrentForm.bind(this);
		this.setCurrentEntry = this.setCurrentEntry.bind(this);

		this.setEntriesViaApi = this.setEntriesViaApi.bind(this);
		this.setFormsViaApi = this.setFormsViaApi.bind(this);
	}

	componentDidMount() {
		this.setFormsViaApi();
		this.setEntriesViaApi();


	}

	setEntriesViaApi(){
		const {
			currentFormId,
			currentPage,
		} = this.state;
		getEntries(currentFormId, currentPage)
			.then(r => r.json())
			.then(entries => this.setState({entries}))
	}

	setFormsViaApi(){
		getForms()
			.then(r => r.json())
			.then(forms => {
				if (!Array.isArray(forms)) {
					forms = Object.values(forms);
				}
				this.setState({forms});
			});
	}

	getCurrentEntry(){
		const {
			currentEntryId,
			entries
		} = this.state;
		return entries.hasOwnProperty(currentEntryId) ? entries[currentEntryId] : {};
	};

	getCurrentForm(){
		const {
			currentFormId,
			forms
		} = this.state;
		return forms.find( form => currentFormId === form.ID );
	}

	setCurrentForm(currentFormId){
		this.setState({currentFormId,currentEntryId: 0});
		if( '' !== currentFormId ){
			this.setFormsViaApi();
			this.setEntriesViaApi();
		}
	}

	setCurrentEntry(currentEntryId){
		this.setState({currentEntryId});
	}

	render() {
		const {
			currentEntryId,
			currentFormId,
			entries,
			forms
		} = this.state;
		if( JSON.stringify(entries) === JSON.stringify({}) ){
			return <div>No Entries</div>
		}
		const form = this.getCurrentForm();
		const currentEntry = this.getCurrentEntry();

		return (
			<div>
				<div>
					<ChooseForm
						forms={forms}
						currentFormId={currentFormId}
						onSetForm={this.setCurrentForm}
						instanceId={'entry-viewer-form-chooser-in-app'}
					/>
					<ChooseEntry
						entries={entries}
						currentEntry={currentEntry}
						onSetEntry={this.setCurrentEntry}
						instanceId={'entry-viewer-entry-chooser-in-app'}
						form={form}
					/>
				</div>
				<EntryViewer
					currentEntryId={currentEntryId}
					entries={entries}
					getCurrentEntry={this.getCurrentEntry}
					form={form}
				/>
			</div>
		)

	}
}

export default App;
