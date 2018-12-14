//import { BrowserRouter as Router, Link } from "react-router-dom";
import React, {Fragment} from 'react';

import {EntryViewer} from "../components/EntryViewer/EntryViewer";
import {ChooseForm} from "../components/controls/ChooseForm";
import {ChooseEntry} from "../components/controls/ChooseEntry";
import {JwtLogin} from "../components/Login/JwtLogin";
import {SingleEntry} from "../components/EntryViewer/SingleEntry";
import {cfProHooks} from "../App";
import {entryViewQueryString} from "../components/EntryViewer/components/entryViewUrl";
import {EntryActions} from "../components/EntryViewer/components/EntryActions";
import {EntryEmail} from "../components/EntryViewer/components/EntryEmail";
import {EntryHeaders} from "../components/EntryViewer/EntryHeaders";
import {EditEntryMailData} from "../components/EntryViewer/components/EntryMailData";
import {EntryAndMessage} from "../components/EntryAndMessage";





class Entries extends React.Component {


	constructor(props) {
		super(props);
		this.getCurrentEntry = this.getCurrentEntry.bind(this);
		this.getCurrentForm = this.getCurrentForm.bind(this);

		this.setCurrentForm = this.setCurrentForm.bind(this);
		this.setCurrentEntry = this.setCurrentEntry.bind(this);

		this.setEntriesViaApi = this.setEntriesViaApi.bind(this);
		this.setFormsViaApi = this.setFormsViaApi.bind(this);

		this.handleDownload = this.handleDownload.bind(this);
		this.handleResend = this.handleResend.bind(this);
		this.handleView = this.handleView.bind(this);
		this.handleCloseView = this.handleCloseView.bind(this);
		this.resetEntry = this.resetEntry.bind(this);

		this.setMailData = this.setMailData.bind(this);




		this.state = {
			forms: [],
			entries: {},
			currentPage: 1,
			currentEntryId: 0,
			currentFormId: props.formId ? props.formId : '',
			sendPending: false,
			message: '',
			viewOpen: '',
			mailDataUpdated: {}
		};

	}

	componentDidMount() {
		this.props.hooks.addFilter('mainMenuItems', 'cfPro', (items) => {
			return [...items, [<div>Hi Roy</div>]]
		});
		this.setFormsViaApi();
		const {currentFormId} = this.state;
		if (currentFormId) {
			this.setEntriesViaApi(currentFormId);
		}


	}

	resetEntry(){
		this.setState({currentEntryId:0,viewOpen:false})
	}

	handleView() {
		this.setState({viewOpen: true})
	}

	handleCloseView() {
		this.setState({viewOpen: false})
	}

	setEntriesViaApi(formId) {
		const {getEntries} = this.props;
		const {
			currentFormId,
			currentPage,
		} = this.state;
		const _formId = currentFormId ? currentFormId : formId;
		getEntries(_formId, currentPage)
			.then(r => r.json())
			.then(entries => this.setState({entries}))
	}

	setFormsViaApi() {
		const {getForms} = this.props;
		getForms()
			.then(r => r.json())
			.then(forms => {
				if (!Array.isArray(forms)) {
					forms = Object.values(forms);
				}
				this.setState({forms});
			});
	}

	getCurrentEntry() {
		const {
			currentEntryId,
			entries
		} = this.state;

		return entries.hasOwnProperty(currentEntryId) ? entries[currentEntryId] : {};
	};



	setMailData(mailDataUpdated){
		this.setState({mailDataUpdated});
	}

	getCurrentForm() {
		const {
			currentFormId,
			forms
		} = this.state;
		return forms.find(form => currentFormId === form.ID);
	}

	setCurrentForm(currentFormId) {
		this.setState({currentFormId: currentFormId, currentEntryId: 0});
		if ('' !== currentFormId) {
			this.setFormsViaApi();
			this.setEntriesViaApi(currentFormId);
		}
	}

	setCurrentEntry(currentEntryId) {
		this.setState({currentEntryId});
	}

	handleResend() {
		const {
			jwt
		} = this.props;
		this.setState({sendPending: true, message: ''});
		fetch('/api/send?jwt=' + jwt )
			.then(r => r.json())
			.then(r => {
				if (r.sent) {
					this.setState({sendPending: false, message: r.message});
				}

				setTimeout(() => {
					this.setState({message: ''});
				}, 2000);
			})
			.catch(e => {
				this.setState({sendPending: false, message: e.message});

			})
	}

	handleDownload() {
		const {
			jwt
		} = this.props;
		const {
			currentEntryId,
			currentFormId,
		} = this.state;
		const url = 'http://localhost:5000/pdf' + entryViewQueryString(currentEntryId, currentFormId) + '?jwt=' + jwt;
		window.open(url, '_blank');
		window.open(url);
	}

	/**
	 * Adjust menus before component updates
	 *
	 * @param nextProps
	 * @param nextState
	 */
	componentWillUpdate(nextProps, nextState){
		const {
			addMenuItem,
			removeMenuItem
		} = this.props;

		const {
			currentEntryId,
			currentFormId,
			viewOpen
		} = nextState;

		const ENTRY_ACTIONS_KEY = 'entryActions';
		const CLOSE_BUTTON_KEY  = 'closeEntry';
		if( currentEntryId ){

			addMenuItem(ENTRY_ACTIONS_KEY, <EntryActions
				key={ENTRY_ACTIONS_KEY}
				entryId={currentEntryId}
				formId={currentFormId}
				onView={this.handleView}
				onDownload={this.handleDownload}
				onResend={this.handleResend}
			/>);

		}else{
			removeMenuItem(ENTRY_ACTIONS_KEY );
		}

		if( currentEntryId || viewOpen ){
			addMenuItem(CLOSE_BUTTON_KEY, <button
					key={CLOSE_BUTTON_KEY}
					onClick={this.resetEntry}
				>
					Close
				</button>
			);
		}else{
			removeMenuItem(CLOSE_BUTTON_KEY );
		}


	}


	render() {
		const {
			currentEntryId,
			currentFormId,
			entries,
			forms,
			viewOpen,
		} = this.state;



		const form = this.getCurrentForm();
		const currentEntry = this.getCurrentEntry();

		if (!form) {
			return (
				<div>
					<ChooseForm
						forms={forms}
						currentFormId={currentFormId}
						onSetForm={this.setCurrentForm}
						instanceId={'entry-viewer-form-chooser-in-app'}
					/>
				</div>
			);
		}


		if (viewOpen) {
			return (
				<Fragment>
					<EntryEmail
						entryId={currentEntryId}
						formId={currentFormId}
					/>
				</Fragment>
			);
		}

		const mailData = entries.hasOwnProperty(currentEntryId) && entries[currentEntryId].hasOwnProperty( 'mailData' )
			? entries[currentEntryId].mailData
			: false;


		return (
			<div>

				<Fragment>
					{!currentEntryId &&
						<Fragment>
							<ChooseForm
								forms={forms}
								currentFormId={currentFormId}
								onSetForm={this.setCurrentForm}
								instanceId={'entry-viewer-form-chooser-in-app'}
							/>
							<ChooseEntry
								key={'choose-entry'}

								entries={entries}
								currentEntry={currentEntry}
								onSetEntry={this.setCurrentEntry}
								instanceId={'entry-viewer-entry-chooser-in-app'}
								form={form}
							/>
						</Fragment>
					}

				</Fragment>
				<Fragment>
					{!currentEntryId ? (
						<Fragment>
							<EntryViewer
								currentEntryId={currentEntryId}
								entries={entries}
								getCurrentEntry={this.getCurrentEntry}
								form={form}
							/>
						</Fragment>

					) : (
						<Fragment>
							<EntryAndMessage
								entries={entries}
								entry={this.getCurrentEntry()}
								formFields={form.fields}
								formId={currentFormId}
								entryId={currentEntryId}
								mailData={mailData}
							/>

						</Fragment>


					)}
				</Fragment>


			</div>

		);
	}

}

export default Entries;


