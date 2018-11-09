// @flow
import React, {Component, Fragment} from 'react';
import type {FormType,FormsCollection,KeyedFormCollection} from "./flow-types/formType";
import type {Entry,EntriesCollection} from "./flow-types/entryTypes";
import {EntryEdit,EntryDisplay} from './components/Entry'
type Props = {
	getForms: (page:number) => Promise<any>,
	getEntries: (formId:string,page:number) => Promise<any>,
	getEntry: (formId:string,entryId:number) => Promise<any>
}

type State = {
	forms: FormsCollection,
	currentFormId: string,
	entries:EntriesCollection,
	currentEntryId:number,
	entryFieldId:number
};



class Entries extends Component<Props, State> {
	state = {
		forms: [],
		currentFormId: '',
		entries: {},
		currentEntryId: 0,
		entryFieldId: 0
	};

	setCurrentFormId = (currentFormId:string) => this.setState({currentFormId});
	setCurrentEntryId = (currentEntryId:number) => this.setState({currentEntryId});
	setEntryFieldId = (entryFieldId:number) => this.setState({entryFieldId});
	componentDidMount() {
		this.props.getForms(1)
			.then((response:Response) => {return response.json();})
			.then((response:KeyedFormCollection) => {
			this.setForms(Object.values(response));
			//this.setCurrentForm('CF5bdddffe1bdd2');
		});

	}


	setCurrentForm = (currentFormId:string) =>{
		this.setCurrentFormId(currentFormId);
		this.clearEntries();
		this.getEntries(currentFormId,1);

	};


	setCurrentEntry = (currentEntryId:number) => {
		this.setCurrentEntryId(currentEntryId);
	};

	setForms = (forms:FormsCollection) => {
		this.setState({forms});
	};

	getCurrentForm = () : FormType => {


		const {currentFormId,forms} = this.state;
		if( ! currentFormId ){
			// eslint-disable-next-line no-throw-literal
			throw 'Current Form Not Set';
		}

		const formIndex = forms.findIndex( (form: FormType) => currentFormId === form.ID );
		if( -1 === formIndex ){
			// eslint-disable-next-line no-throw-literal
			throw 'Form Not Exist';
		}

		return forms[formIndex];
	};


	getCurrentEntry = () : Entry => {
		const {currentEntryId,entries} = this.state;
		if( ! currentEntryId ){
			// eslint-disable-next-line no-throw-literal
			throw 'Entry Not Set';
		}

		if( ! entries.hasOwnProperty(currentEntryId) ){
			// eslint-disable-next-line no-throw-literal
			throw 'Entry Not Set';
		}

		return entries[currentEntryId];
	};

	clearEntries = () => {
		this.setCurrentEntryId(0);
		this.setState({entries:{}});
	};

	getEntries = (formsId:string,page:number = 1)  =>{
		this.props.getEntries(formsId,page )
			.then((response:Response) => {return response.json();})
			.then((entries: EntriesCollection) =>this.setState({entries} ));
	};

	render() {
		const {forms,currentFormId,entries,currentEntryId,entryFieldId} = this.state;
		let form = {};
		try {
			form = this.getCurrentForm()
		}catch (e) {
			form = {};
		}
		return <Fragment>
			<div>
				<h3>FakeBlock</h3>
				<div>
					<EntryEdit
						entryId={currentEntryId}
						entries={entries}
						onSetEntry={this.setCurrentEntry}
						formId={currentFormId}
						forms={forms}
						onSetForm={this.setCurrentForm}
						instanceId={'fakeBlock'}
						onSetField={this.setEntryFieldId}
					/>
					<EntryDisplay
						currentEntryId={currentEntryId}
						entries={entries}
						getCurrentEntry={this.getCurrentEntry}
						form={form}
						entryFieldId={entryFieldId}
						onSetField={this.setEntryFieldId}
					/>
				</div>



			</div>





		</Fragment>
	}
}

export default Entries;
