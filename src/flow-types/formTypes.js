// @flow

export type FormTypes = {
	name:string, ID:string
}

export type FormsCollection = Array<FormTypes>;


export type KeyedFormCollection = {
	[key: string]: FormTypes
};
