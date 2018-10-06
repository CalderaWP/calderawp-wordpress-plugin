import React from 'react';
import type {SalutationEditProps} from "../types";
import {TextControl} from '@wordpress/components'
import type {Node} from 'react'
import {componentClassName} from "../../../control-factory/componentClassName";

export default function (props: SalutationEditProps): Node {
	const {
		salutationControlLabel,
		salutation,
		onChangeSalutation
	} = props;
	return (
		<TextControl
			className={componentClassName('hello', 'salutation', 'edit')}
			label={salutationControlLabel}
			value={salutation}
			onChange={onChangeSalutation}
		/>
	);
}


