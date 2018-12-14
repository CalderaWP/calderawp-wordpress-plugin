import React, {Component, Fragment} from 'react';

import {MailDataView} from "./Message/MailDataView";
import {EntryHeaders} from "./EntryViewer/EntryHeaders";
import {SingleEntry} from "./EntryViewer/SingleEntry";
import {MailDataEdit} from "./Message/MailDataEdit";

export class EntryAndMessage extends Component {

	constructor(props){
		super(props);
		this.state = {
			mailData: props.mailData,
			showEdit: false,
		};
		this.setMailData = this.setMailData.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
		this.setShowEdit = this.setShowEdit.bind(this)
	}

	setShowEdit(showEdit){
		this.setState({showEdit});
	}
	setMailData(mailData){
		this.setState({mailData});

	}

	updateMessage(message){
		const {mailData} = this.state;

		this.setMailData({
			...mailData,
			message
		});
	}

	render(){
		const {props,state} = this;
		const {
			entries,
			entry,
			formFields,
			formId,
			entryId,
		} = props;

		const {
			mailData,
			showEdit
		} = state;

		const closeMessage = props.closeMessage ? props.closeMessage : 'Close Editor';
		const openMessage = props.openMessage ? props.openMessage : 'Edit Message';
		return(
			<Fragment>
				<div>
					<div>
						<h2>Entry Data</h2>
						<EntryHeaders
							entries={entries}
						  	formFields={formFields}
						/>
						<SingleEntry
							entry={entry}
							entryId={entryId}
							formId={formId}
						/>
					</div>
					<div>
						{ mailData &&
						<Fragment>
							<h2>Primary Message</h2>
							<button
								className={'toggle-edit-view'}
								onClick={() =>this.setShowEdit(! showEdit )}
							>
								{showEdit ? (
									<Fragment>{closeMessage}</Fragment>

								) : (
									<Fragment>{openMessage}</Fragment>
								)}
							</button>
							{showEdit ? (
								<MailDataEdit
									mailData={mailData}
									onEditMessage={this.updateMessage}
									onChangeMailData={this.setMailData}
								/>

							) : (
								<MailDataView
									mailData={mailData}
								/>
							)}


						</Fragment>


						}
					</div>

				</div>

			</Fragment>
		)
	}
}
