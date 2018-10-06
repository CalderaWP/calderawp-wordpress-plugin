import "babel-polyfill"
import {
	HelloDisplay,

} from '../../components/Hello';
import {Fragment,createElement} from '@wordpress/element';
import React from 'react';
import type {GutenbergSaveProps} from "../types";

export default function (props: GutenbergSaveProps) {
	const {attributes} = props;
	const {name,salutation} = attributes;

	return <HelloDisplay
		name={name}
		salutation={salutation}
	/>

}