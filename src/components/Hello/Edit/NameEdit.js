import React from 'react';
import type {NameEditProps} from "../types";
import {TextControl} from '@wordpress/components'
import type {Node} from 'react'

export default function (props: NameEditProps): Node {
	const {
		nameControlLabel,
		name,
		onChangeName
	} = props;
	return (
		<TextControl
			label={nameControlLabel}
			value={name}
			onChange={onChangeName}
		/>
	);
}


