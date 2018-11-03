// @flow

export type EntryField = {
	id: number,
	entry_id: number,
	field_id: string,
	slug: string,
	value: string|number|boolean|Array<string|number|boolean>
}
export type EntryFieldCollection = {
	[key: string]: EntryField,
};

export type Entry = {
	form_id: string,
	id: number,
	user: {
		name: string,
		email:string,
	},
	fields: EntryFieldCollection
}


export type EntriesCollection = {
	[key: number]: Entry,
}
