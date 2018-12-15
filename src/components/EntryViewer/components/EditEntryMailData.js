import {RenderGroup} from '@caldera-labs/components';
import React, {Fragment} from 'react';
const ID = 'cf-mail-headers-edit';


function createConfigFields(mailData, onChange) {
	const {
		recipients,
		subject,
		replyto,
		from_name,
		html
	} = mailData;


	return [
		{
			'id': ID + '-from',
			'label': 'From (reply-to)',
			'desc': 'Reply-to email address',
			'type': 'email',
			'description': false,
			value: replyto,
			onValueChange: (from) => {
				onChange({
					...mailData,
					from
				})
			}

		},
		{
			'id': ID + '-from_name',
			'label': 'Name email is sent from',
			'desc': 'Comma separated list of recipients.',
			'type': 'text',
			'description': false,
			value: from_name,
			onValueChange: (from_name) => {
				onChange({
					...mailData,
					from_name
				})
			}

		},
		{
			'id': ID + '-recipients',
			'label': 'Recipients',
			'desc': 'Comma separated list of recipients.',
			'type': 'text',
			'description': false,
			value: recipients,
			onValueChange: (recipients) => {
				onChange({
					...mailData,
					recipients
				})
			}
		},
		{
			'id': ID + '-subject',
			'label': 'Message Subject',
			'type': 'text',
			'description': false,
			value: subject,
			onValueChange: (subject) => {
				onChange({
					...mailData,
					subject
				})
			}

		},
		{
			'id': ID + '-html',
			'type': 'dropdown',
			'label': 'Content type',
			'description': 'Choose content type, default is HTML',
			options: [
				{
					label: 'HTML',
					value: 'false'
				},
				{
					label: 'Plain Text',
					value: 'true'
				}
			],
			value: html,
			onValueChange: (html) => {
				onChange({
					...mailData,
					html
				})
			}
		}
	];


}


export const EditEntryMailData = (
	{ mailData,
	  onChange,
}) => {


	return (
		<Fragment>
			<RenderGroup
				configFields={createConfigFields(mailData, onChange)}
				className={'cf-mail-headers-edit'}
			/>

		</Fragment>
	)
};


