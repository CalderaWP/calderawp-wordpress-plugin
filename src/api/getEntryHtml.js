const request = require( 'request' );
module.exports = function getEntryHtml(entryId, formId, layoutId,jwt, callback) {
	const uri = `http://localhost:8218/Layout/${layoutId}?entryId=${entryId}&formId=${formId}&jwt=${jwt}`;
	request({
		uri,
	}, (error, response, body) => {
		callback(body)
	});
}
