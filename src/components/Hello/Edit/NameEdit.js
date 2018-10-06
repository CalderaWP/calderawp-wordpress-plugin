import React from 'react';
import type {NameEditProps} from "../types";
import {TextControl} from '@wordpress/components'
import type {Node} from 'react';
import {componentClassName} from "../../../control-factory/componentClassName";

export default function (props: NameEditProps): Node {
	const {
		nameControlLabel,
		name,
		onChangeName
	} = props;
	return (
		<TextControl
			className={componentClassName('hello', 'name', 'edit')}
			label={nameControlLabel}
			value={name}
			onChange={onChangeName}
		/>
	);
}


