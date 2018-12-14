const getEntryHtml = require( './getEntryHtml' );

module.exports = function createPdf(entryId, formId, layoutId, jwt, callback) {
	const convertHTMLToPDF = require('pdf-puppeteer');

	try {
		getEntryHtml(entryId, formId, layoutId,jwt, (body) => {
			convertHTMLToPDF(body, pdf => {
				callback(pdf)
			})
		})

	} catch (e) {
		console.log(e);
		res.status(500).send(e);

	}
}
