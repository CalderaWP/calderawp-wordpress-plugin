// @flow


export type FormField = {
	ID: string,
	name: string,
	type: string,
}
export type FormFieldsCollection = {
	[key: string]: FormField

}

export type FormType = {
	name:string,
	ID:string,
	fields: FormFieldsCollection,
}

export type FormsCollection = Array<FormType>;


export type KeyedFormCollection = {
	[key: string]: FormType
};
