// @flow
import React from 'react';
import type {Entry,EntriesCollection} from "../../flow-types/entryTypes";


export const ChooseEntry = (props: {entries:EntriesCollection, currentEntry: number, onChange: (number) => void, instanceId: string } ) =>{
	const id = 'caldera-forms-entry-chooser-' + props.instanceId;
	let options = [
		{
			label:'--',
			value: null
		}
	];

	if( JSON.stringify(props.entries)!= JSON.stringify({})){
		Object.values(props.entries).map( (entry: Entry) => {
			if( 'object' !== typeof  entry ){
				return;
			}
			options.push( {
				value:entry.id,
				label:entry.id
			});
		});
	}
	return <div>
		<label
			htmlFor={id}
		>
			Choose Entry
		</label>
		<select
			id={ id }
			className={'caldera-forms-entry-chooser'}
			value={ props.currentEntry }
			onChange={ (event) => {props.onChange(parseInt( event.target.value,10 ))} }
		>
			{ options.map( (option: {value:number,label:sring|number}) => ( <option key={option.value} value={option.value}>{option.label}</option>) )}
		</select>
	</div>
};
