const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require( 'isomorphic-fetch')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require("request");

app.get( '/api/hello', (req,res) => {
	res.send({ message: 'Hi Roy' });
});


app.get('/pdf',(async function(req, res) {
	const puppeteer = require('puppeteer');
	const http = require('http');
	const convertHTMLToPDF = require('pdf-puppeteer');
	try {
		const {
			entryId,
			formId,
		} = req.query;
		const layoutId = req.query.hasOwnProperty( 'layoutId') ? req.query.layoutId : 162;
		const uri = `http://localhost:8218/Layout/${layoutId}?entryId=${entryId}&formId=${formId}`;
		request({
			uri,
		}, (error, response, body) => {
			convertHTMLToPDF(body, pdf => {
				res.setHeader('Content-Type', 'application/pdf');
				res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
				res.send(pdf);
			}).catch(err => {
				console.log(err);
				res.status(500).send('An errors occurred');
			});
		});



	} catch (e) {
		console.log(e);
		res.status(500).send(e);

	}

}));


app.listen(port, () => console.log(`Listening on port ${port}`));






