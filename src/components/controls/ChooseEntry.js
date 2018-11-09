// @flow
import React, {Fragment} from 'react';
import type {Entry,EntriesCollection} from "../../flow-types/entryTypes";
import type {EntryChooserProps} from "../Entry/types";


export const ChooseEntry = (props: EntryChooserProps) =>{
	const id = 'caldera-forms-entry-chooser-' + props.instanceId;
	let options = [
		{
			label:'--',
			value: null
		}
	];

	if( JSON.stringify(props.entries)!== JSON.stringify({})){
		Object.values(props.entries).forEach( (entry: Entry) => {
			if( 'object' === typeof  entry ){
				options.push( {
					value:entry.id,
					label:entry.id
				});
			}

		});
	}
	return <Fragment>
		<label
			htmlFor={id}
		>
			Choose Entry
		</label>
		<select
			id={ id }
			className={'caldera-forms-entry-chooser'}
			value={ props.currentEntry }
			onChange={ (event) => {props.onSetEntry( event.target.value)} }
		>
			{ options.map( (option: {value:number,label:string|number}) => ( <option key={option.value} value={option.value}>{option.label}</option>) )}
		</select>
	</Fragment>
};
