module.exports = function getEntryHtml(entryId, formId, layoutId,jwt, callback) {
	const uri = `http://localhost:8218/Layout/${layoutId}?entryId=${entryId}&formId=${formId}&jwt=${jwt}`;
	fetch({
		uri,
	}).then(r => callback(r))
		.catch(e => console.log(e) );
}
