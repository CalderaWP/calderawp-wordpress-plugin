// @flow

export type NameDisplayProps = {
	name: string,

}
export type SalutationDisplayProps = {
	salutation: string

}
export type DisplayProps = {
	...NameDisplayProps,
	...SalutationDisplayProps
};

export type NameEditProps = {
	...NameDisplayProps,
	nameControlLabel: string,
	onChangeName: (name:string) => void,
};

export type SalutationEditProps = {
	...SalutationDisplayProps,
	salutationControlLabel: string,
	onChangeSalutation: (salutation:string) => void,
}

export type EditProps = {
	...DisplayProps,
	...NameEditProps,
	...SalutationEditProps
}


