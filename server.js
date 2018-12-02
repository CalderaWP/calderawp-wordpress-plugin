const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require( 'isomorphic-fetch')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require("request");
var base64 = require('file-base64');

app.get( '/api/hello', (req,res) => {
	res.send({ message: 'Hi Roy' });
});

function getEntryHtml(entryId,formId,layoutId,callback){
	const uri = `http://localhost:8218/Layout/${layoutId}?entryId=${entryId}&formId=${formId}`;
	request({
		uri,
	}, (error, response, body) => {
		callback(body)
	});
}

function createPdf(entryId,formId,layoutId,callback ){
	const convertHTMLToPDF = require('pdf-puppeteer');

	try {
		getEntryHtml(entryId,formId,layoutId,(body) => {
			convertHTMLToPDF(body, pdf => {
				callback(pdf)
			})
		})

	} catch (e) {
		console.log(e);
		res.status(500).send(e);

	}
}
app.get( '/api/send', (req,res) => {
	const sgMail = require('@sendgrid/mail');
	require('dotenv').config();

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const {
		entryId,
		formId,
	} = req.query;
	const layoutId = req.query.hasOwnProperty('layoutId') ? req.query.layoutId : 162;

	getEntryHtml(entryId,formId,layoutId, (html) => {
		createPdf(entryId,formId,layoutId, (pdf) => {
			base64.encode(pdf, function(err, base64String) {

				const msg = {
					to: 'josh@calderawp.com',
					from: 'test@example.com',
					subject: 'Sending with SendGrid is Fun',
					text: 'and easy to do anywhere, even with Node.js',
					html,
					attachments: [
						{
							filename: "message.pdf",
							content: pdf.toString('base64'),
						}
					]
				};
				sgMail.send(msg)
					.then(r => res.status(202).send({sent:true,message:'Message Sent'}))
					.catch(e => res.status(500).send({...e,sent:false,message:'Error'}))
			});



		})


	});




});
app.get('/pdf',(async function(req, res) {
	const puppeteer = require('puppeteer');
	const http = require('http');

	const {
		entryId,
		formId,
	} = req.query;
		getEntryHtml(entryId, formId, layoutId, (body) => {
		createPdf(entryId,formId,layoutId, (pdf) => {
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
			res.send(pdf);
		})
	});

}));









app.listen(port, () => console.log(`Listening on port ${port}`));






