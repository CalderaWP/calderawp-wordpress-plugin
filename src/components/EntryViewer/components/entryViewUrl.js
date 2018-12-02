export const entryViewQueryString = (entryId,formId) => {
	return `?entryId=${entryId}&formId=${formId}`;
}
export const entryViewUrl = (entryId,formId) => {
	return `http://localhost:8218/Layout/162${entryViewQueryString(entryId,formId)}`;
};