// @flow


export type FormField = {
	ID: string,
	name: string,
	type: string,
};
export type FormFieldsCollection = {
	[key: string]: FormField

};

export type FormField_Details = {
	id: string,
	label: string
};

export type FormType = {
	name:string,
	ID:string,
	fields: FormFieldsCollection,
	field_details: {
		entry_list: 	FormFieldsCollection,
		order: 	FormFieldsCollection,

	}
};

export type FormsCollection = Array<FormType>;


export type KeyedFormCollection = {
	[key: string]: FormType
};
