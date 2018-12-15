import {RenderGroup} from '@caldera-labs/components';
import React from "react";

function createConfigFields(settings,layouts,onChange) {
	const {
		layout,
		pdf_layout,
		pdf_link
	} = settings;

	const ID = 'caldera-forms-pro-layout-settings';

	/**

	 */

	const layoutOpts = [
		{
			label: '--',
			value: null
		}
	];
	Object.values(layouts).forEach(layout => {
		layoutOpts.push({
			label: layout.title,
			value: layout.ID,
		});
	});

	return [
		{
			id: ID + '-layout',
			label: 'Layout',
			desc: 'Main Message Layout',
			type: 'select',
			value: layout,
			options: layoutOpts,
			onValueChange: (layout) => {
				onChange({
					...settings,
					layout
				})
			}
		},
		{
			id: ID + '-pdf_layout',
			label: 'PDF Layout',
			desc: 'PDF Layout',
			type: 'select',
			value: pdf_layout,
			options: layoutOpts,
			onValueChange: (pdf_layout) => {
				onChange({
					...settings,
					pdf_layout
				})
			}
		},
		{
			id: ID + '-pdf_link',
			label: 'PDF Link',
			desc: 'Main Message Layout',
			type: 'checkbox',
			value: pdf_link,
			options: [
				{
					value: true,
					label: 'Enable'
				}
			],
			onValueChange: (pdf_link) => {
				onChange({
					...settings,
					pdf_link
				})
			}
		},

	];


}

export const FormLayoutSettings = ({settings,layouts,onChange}) => {
	return (
		<RenderGroup
			configFields={createConfigFields(settings,layouts,onChange)}
			className={'cf-mail-form-layout-settings'}
		/>
	)
}
