// @flow

import React, {Component, Fragment} from 'react';
import type {Entry,EntriesCollection} from "../../flow-types/entryTypes";
import {EntryHeaders} from "./EntryHeaders";
import {EntryRow} from "./EntryRow";
import {EntryRows} from "./EntryRows";
export const EntryViewer = (props: {currentEntryId:number,entries:EntriesCollection,getCurrentEntry:() => Entry}) => {
	const {currentEntryId,entries,getCurrentEntry} = props;
	if( JSON.stringify(entries) === JSON.stringify({}) ){
		return <div>No Entries</div>
	}
	return(
		<table>
			<thead>
				<EntryHeaders entries={entries}/>
			</thead>
			<tbody>
				{currentEntryId &&
					<EntryRow entry={getCurrentEntry()}/>
				}
				{!currentEntryId &&
					<EntryRows entries={entries} />
				}
			</tbody>
		</table>
	)
};
