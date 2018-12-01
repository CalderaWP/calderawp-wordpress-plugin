import React, {Component,Fragment} from 'react';
import ReactModal from "react-modal";
import {EntryRow} from "./EntryRow";
import {EntryActions} from "./components/EntryActions";
import {EntryEmail} from "./components/EntryEmail";
export class SingleEntry extends Component {
	state = {
		modalOpen:false,

	}

	constructor(props){
		super(props);
		this.setClosed = this.setClosed.bind(this);
		this.setOpened = this.setOpened.bind(this);
	}

	setClosed(){
		this.setState({modalOpen:false})
	}

	setOpened(){
		this.setState({modalOpen:true});
	}

	render(){
		const {
			modalOpen
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
				/>

				<ReactModal

					isOpen={modalOpen}

					onAfterOpen={() => {}}
					onRequestClose={() => {}}

					closeTimeoutMS={0}

					style={{ overlay: {}, content: {} }}
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