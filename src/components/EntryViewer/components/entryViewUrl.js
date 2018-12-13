export const entryViewQueryString = (entryId,formId) => {
	return `?entryId=${entryId}&formId=${formId}`;
}
export const entryViewUrl = (entryId,formId,endpoint= 'http://localhost:8218/Layout', layoutId= 162) => {
	return `${endpoint}/${layoutId}${entryViewQueryString(entryId,formId)}`;
};
