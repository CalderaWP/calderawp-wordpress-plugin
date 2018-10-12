import {
	HelloDisplay,
	HelloControlsEdit,
	HelloInlineEdit
} from '../../components/Hello';
import {Fragment,createElement} from '@wordpress/element'
import {InspectorControls} from '@wordpress/editor'
import type {GutenbergEditProps} from "../types";
import React from 'react';

export default function(props: GutenbergEditProps) {
	const {attributes, setAttributes, isSelected, className} = props;
	const {name,salutation} = attributes;
	const onChangeSalutation = (salutation) => {setAttributes({salutation})};
	const onChangeName = (name) => {setAttributes({name})};
	if( isSelected ){
		return(
			<Fragment>
				<InspectorControls>
					<HelloControlsEdit
						name={name}
						salutation={salutation}
						onChangeSalutation={onChangeSalutation}
					/>
				</InspectorControls>
				<HelloInlineEdit
					name={name}
					salutation={salutation}
					onChangeName={onChangeName}
				/>
			</Fragment>
		);
	}

	return <HelloDisplay
		name={name}
		salutation={salutation}
	/>

}