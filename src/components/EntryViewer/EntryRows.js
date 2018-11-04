// @flow

import React, {Fragment} from 'react';
import type {Entry,EntriesCollection} from "../../flow-types/entryTypes";
import {EntryRow} from "./EntryRow";
export const EntryRows = (props: {entries: EntriesCollection} ) => {
	return (
		<Fragment>
			{Object.values(props.entries).map( (entry : Entry ) => {
				return (<EntryRow
					entry={entry}
					key={entry.id}
				/>)
			})}
		</Fragment>
	);
}
