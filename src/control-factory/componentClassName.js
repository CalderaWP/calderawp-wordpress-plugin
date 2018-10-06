// @flow
export const componentClassName = (familyName:string,name:string,context:string) => {
	return `caldera-${name}-${familyName}-${context}`;
};