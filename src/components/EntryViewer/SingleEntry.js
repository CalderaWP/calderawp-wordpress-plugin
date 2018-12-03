import React, {Component, Fragment} from 'react';
import ReactModal from "react-modal";
import {EntryRow} from "./EntryRow";
import {EntryActions} from "./components/EntryActions";
import {EntryEmail} from "./components/EntryEmail";
import {
	entryViewQueryString
} from "./components/entryViewUrl";

export class SingleEntry extends Component {


	constructor(props) {
		super(props);
		this.setClosed = this.setClosed.bind(this);
		this.setOpened = this.setOpened.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleResend = this.handleResend.bind(this);
		this.state =  {
			modalOpen: false,
			sendPending: false,
			message: ''

		}
	}

	setClosed() {
		this.setState({modalOpen: false})
	}

	setOpened() {
		this.setState({modalOpen: true});
	}

	handleResend() {
		this.setState({sendPending: true, message: ''});
		fetch('/api/send')
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
			formId,
			entryId,
		} = this.props;
		const url = 'http://localhost:5000/pdf' + entryViewQueryString(entryId, formId);
		window.open(url, '_blank');
		window.open(url);
	}


	render() {
		const {
			modalOpen,
			sendPending,
			message
		} = this.state;
		const {
			formId,
			entryId,
			entry
		} = this.props;
		return (
			<Fragment>
				<EntryRow
					entry={entry}
				/>
				<EntryActions
					entryId={entryId}
					formId={formId}
					onView={this.setOpened}
					onDownload={this.handleDownload}
					onResend={this.handleResend}
				/>
				{
					sendPending &&
					<span>Spinner</span>

				}

				{
					message &&
					<span>{message}</span>

				}

				<ReactModal

					isOpen={modalOpen}

					onAfterOpen={() => {
					}}
					onRequestClose={() => {
					}}

					closeTimeoutMS={0}

					style={{overlay: {}, content: {}}}
					/*
					  String indicating how the content container should be announced to screenreaders
					*/
					contentLabel="Example Modal"
					portalClassName="ReactModalPortal"

					overlayClassName="ReactModal__Overlay"

					className="ReactModal__Content"

					bodyOpenClassName="ReactModal__Body--open"

					htmlOpenClassName="ReactModal__Html--open"

					ariaHideApp={true}
					shouldFocusAfterRender={true}
					/*
					  Boolean indicating if the overlay should close the modal
					*/
					shouldCloseOnOverlayClick={true}

					shouldCloseOnEsc={true}
					shouldReturnFocusAfterClose={true}

					/*
					  Additional aria attributes (optional).
					*/
					aria={{
						labelledby: "heading",
						describedby: "full_description"
					}}

				>
					<Fragment>
						<EntryEmail
							entryId={entryId}
							formId={formId}
						/>
						<button
							onClick={this.setClosed}
						>
							Close
						</button>

					</Fragment>

				</ReactModal>
			</Fragment>
		)
	}
}