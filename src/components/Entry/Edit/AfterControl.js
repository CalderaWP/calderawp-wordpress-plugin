import React, {Fragment} from 'react';
import {TextControl} from '@wordpress/components'
import type {Node} from 'react';
import {componentClassName} from "../../../control-factory/componentClassName";
import type {EditAfterProps} from "../types";

export default function (props: EditAfterProps): Node {
	const {
		after,
		setAfter,
		instanceId,
		hideLabel
	} = props;

	const label = 'Text After Value';
	const className = componentClassName('entryValue', 'after', 'edit')
	const id = className + '-' + instanceId;

	if( hideLabel ){
		return(
			<Fragment>
				<label
					className="sr-only screen-reader-text"
					htmlFor={id}
				>
					{ label }
				</label>
				<input
					type="text"
					value={after}
					onChange={setAfter}
					id={id}
				/>
			</Fragment>
		)
	}


	return (
		<TextControl
			className={className}
			label={label}
			id={id}
			value={after}
			onChange={setAfter}
		/>
	);
}


