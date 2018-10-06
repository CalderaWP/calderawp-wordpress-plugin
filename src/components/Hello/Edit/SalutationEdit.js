import React from 'react';
import type {SalutationEditProps} from "../types";
import {TextControl} from '@wordpress/components'
import type {Node} from 'react'

export default function (props: SalutationEditProps): Node {
	const {
		salutationControlLabel,
		salutation,
		onChangeSalutation
	} = props;
	return (
		<TextControl
			label={salutationControlLabel}
			value={salutation}
			onChange={onChangeSalutation}
		/>
	);
}


