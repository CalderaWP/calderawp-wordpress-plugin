// @flow

import React, {Fragment} from 'react';
import type {DisplayProps} from "./types";
import type {Node} from 'react'
import {componentClassName} from "../../control-factory/componentClassName";
import {EntryViewer} from "../EntryViewer/EntryViewer";
import {Spinner} from '@wordpress/components'

export default function( props: DisplayProps) : Node {
	const {
		currentEntryId,
		entries,
		getCurrentEntry,
		form
	} = props;

	if( ! currentEntryId ){
		return <Spinner/>
	}
	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			<EntryViewer
				currentEntryId={currentEntryId}
				entries={entries}
				getCurrentEntry={getCurrentEntry}
				form={form}/>
		</div>
	);
}
