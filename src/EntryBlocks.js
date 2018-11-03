// @flow
import React, {Component, Fragment} from 'react';
import type {FormTypes,FormsCollection,KeyedFormCollection} from "./flow-types/formTypes";
import type {Entry,EntriesCollection,EntryField, EntryFieldCollection} from "./flow-types/entryTypes";
import {EntryViewer} from "./components/EntryViewer/EntryViewer";

export const ChooseForm = (props: {forms: FormsCollection, currentFormId: string, onChange: (string) => void }) => {
	return (
		<div>
			<label>Choose Form</label>
		<select
			className={'caldera-forms-form-chooser'}
			value={ props.currentFormId }
			onChange={ (event) => {props.onChange(event.target.value)} }
		>
			{ props.forms.map( (form: FormTypes) => ( <option key={form.ID} value={form.ID}>{form.name}</option>) )}
		</select>
		</div>
	);

};

export const ChooseEntry = (props: {entries:EntriesCollection, currentEntry: number, onChange: (number) => void } ) =>{
	return <div>
		<label>Choose Entry</label>
		<select
			className={'caldera-forms-entry-chooser'}
			value={ props.currentEntry }
			onChange={ (event) => {props.onChange(parseInt( event.target.value,10 ))} }
		>
			{ Object.values(props.entries).map( (entry: Entry) => ( <option key={entry.id} value={entry.id}>{entry.id}</option>) )}
		</select>
	</div>
};












type Props = {}

type State = {
	forms: FormsCollection,
	currentFormId: string,
	entries:EntriesCollection,
	currentEntryId:number
};



class EntryBlocks extends Component<Props, State> {
	state = {
		forms: [],
		currentFormId: '',
		entries: {},
		currentEntryId: 0
	};

	setCurrentFormId = (currentFormId:string) => this.setState({currentFormId});
	setCurrentEntryId = (currentEntryId:number) => this.setState({currentEntryId});
	componentDidMount() {
		fetch('http://localhost:8218/wp-json/cf-api/v2/forms?full=true' )
			.then(response => response.json())
			.then((response:KeyedFormCollection) => {
			this.setForms(Object.values(response));
			this.setCurrentForm('CF5bdddffe1bdd2');
		});
	}

	setCurrentForm = (currentFormId:string) =>{
		this.setCurrentFormId(currentFormId);
		this.getEntries(currentFormId,1);
	};


	setCurrentEntry = (currentEntryId:number) => {
		this.setCurrentEntryId(currentEntryId);
	};

	setForms = (forms:FormsCollection) => {
		this.setState({forms});
	};

	getCurrentEntry = () : Entry => {
		const {currentEntryId,entries} = this.state;
		if( ! currentEntryId ){
			throw 'Entry Not Set';
		}

		if( ! entries.hasOwnProperty(currentEntryId) ){
			throw 'Entry Not Set';
		}

		return entries[currentEntryId];
	}

	getEntries = (formsId:string,page:number = 1)  =>{
		const entries = require( './entries/CF5bddddffe1bdd2.json');
		this.setState({entries});

	};

	render() {
		const {forms,currentFormId,entries,currentEntryId} = this.state;
		return <div><p>a</p>
			<ChooseForm forms={forms} currentFormId={currentFormId} onChange={this.setCurrentForm}/>
			<ChooseEntry entries={entries} currentEntry={currentEntryId} onChange={this.setCurrentEntry}/>


			{currentFormId &&
				<EntryViewer currentEntryId={currentEntryId} entries={entries} getCurrentEntry={this.getCurrentEntry}/>
			}

		</div>
	}
}

export default EntryBlocks;
