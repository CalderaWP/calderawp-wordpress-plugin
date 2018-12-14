import React from 'react';
import ReactQuill from 'react-quill';
import {EditEntryMailData} from "../EntryViewer/components/EditEntryMailData";
export const MailDataEdit = ({
	onChangeMailData,
	mailData,
	onEditMessage
}) => (
	<div className={'wp-block-columns has-2-columns'}>
		<div className={'wp-block-column'}>
			<h3>Headers</h3>
				<EditEntryMailData
					mailData={mailData}
					onChange={onChangeMailData}
				/>
		</div>
		<div className={'wp-block-column'}>
			<h3>Message</h3>
			<ReactQuill
				value={mailData.message}
				onChange={onEditMessage}
			/>
		</div>
	</div>
);
