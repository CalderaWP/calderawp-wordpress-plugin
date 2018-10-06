// @flow

export type blockAttribute =  {
	[key:string] :string,
	type: string,
	default: mixed,
	source?: string,
	selector?: string,
	attribute?: string,
	meta?: string
};


export type block = {
	slug: string,
	title: string,
	editPath: string,
	savePath: string,
	wpDependencies: Array<string>,
	attributes: blockAttribute,
	category? : string,
	icon? : string,
};

export type blocksDefinitions = {
	packageName: string,
	namespace: string,
	blocks: Array<block>
}