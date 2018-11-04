// @flow

import React from 'react';
import type {Entry,EntriesCollection} from "../../flow-types/entryTypes";
import type {FormType} from "../../flow-types/formType";
import {EntryHeaders} from "./EntryHeaders";
import {EntryRow} from "./EntryRow";
import {EntryRows} from "./EntryRows";

type EntryViewerProps = {
	currentEntryId:number,
	entries:EntriesCollection,
	getCurrentEntry:() => Entry,
	form: FormType
};

export const EntryViewer = (props: EntryViewerProps) => {
	const {currentEntryId,entries,getCurrentEntry,form} = props;
	if( JSON.stringify(entries) === JSON.stringify({}) ){
		return <div>No Entries</div>
	}
	return(
		<table>
			<thead>
				<EntryHeaders entries={entries} formFields={form.fields}/>
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
