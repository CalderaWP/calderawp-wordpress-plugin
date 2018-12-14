import React, {Component, Fragment} from 'react';

import {RichText} from '@wordpress/editor';

export class MailDataEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mailData: props.mailData
		}
		this.setMailData = this.setMailData.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
	}

	setMailData(mailData) {
		this.setState({mailData});

	}

	updateMessage(message) {
		const {mailData} = this.state;

		this.setMailData({
			...mailData,
			message
		});
	}

	render() {
		const {
			entries,
			entry,
			formFields,
			formId,
			entryId,
			onChangeMailData
		} = this.props;

		const {mailData} = this.state;
		return (
			<Fragment>

				<div className={'wp-block-columns has-2-columns'}>
					<div className={'wp-block-column'}>
						<h3>Headers</h3>
							<EntryMailData
								mailData={mailData}
								onChange={onChangeMailData}
							/>
					</div>
					<div className={'wp-block-column'}>
						<h3>Message</h3>
						<RichText
							tagName="div"
							className={'caldera-pro-message-editor'}
							value={mailData.message}
							multiline={true}
							onChange={this.updateMessage}
						/>
					</div>
				</div>


			</Fragment>
		)
	}
}
