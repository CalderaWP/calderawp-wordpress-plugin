// @flow

import React, {Component, Fragment} from 'react';
import type {FormTypes,FormsCollection,KeyedFormCollection} from "../../flow-types/formTypes";
import type {Entry,EntriesCollection,EntryField, EntryFieldCollection} from "../../flow-types/entryTypes";
import {EntryRow} from "./EntryRow";
export const EntryRows = (props: {entries: EntriesCollection} ) => {
	return (
		<Fragment>
			{Object.values(props.entries).map( (entry : Entry ) => {
				return (<EntryRow entry={entry}/>)
			})}
		</Fragment>
	);
}
