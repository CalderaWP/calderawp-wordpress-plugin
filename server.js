const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('isomorphic-fetch')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').load();

var request = require("request");
var base64 = require('file-base64');


app.get('/api/hello', (req, res) => {
	res.send({message: 'Hi Roy'});
});
function checkToken(jwtToken) {
	// invalid token - synchronous
	try {
		var decoded = require('jsonwebtoken').verify(jwtToken, process.env.JWT_AUTH_SECRET_KEY);
		return {
			valid: true,
			data: decoded
		};
	} catch(err) {
		return {
			valid: false,
			data: err
		};
	}
}

function getEntryHtml(entryId, formId, layoutId,jwt, callback) {
	const uri = `http://localhost:8218/Layout/${layoutId}?entryId=${entryId}&formId=${formId}&jwt=${jwt}`;
	request({
		uri,
	}, (error, response, body) => {
		callback(body)
	});
}

function createPdf(entryId, formId, layoutId, jwt, callback) {
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

app.get('/api/send', (req, res) => {
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const {
		entryId,
		formId,
		jwt
	} = req.query;
	const checked = checkToken(jwt);
	if( ! checked.valid ){
		return res.status(403).send(checked.data);
	}
	const layoutId = req.query.hasOwnProperty('layoutId') ? req.query.layoutId : 162;

	getEntryHtml(entryId, formId, layoutId,jwt, (html) => {
		createPdf(entryId, formId, layoutId, jwt,(pdf) => {
			base64.encode(pdf, function (err, base64String) {
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
					.then(r => res.status(202).send({sent: true, message: 'Message Sent'}))
					.catch(e => res.status(500).send({...e, sent: false, message: 'Error'}))
			});


		})


	});


});
app.get('/pdf', (async function (req, res) {


	let {
		layoutId,
		entryId,
		formId,
		jwt
	} = req.query;


	layoutId = layoutId ? layoutId : 162;

	try{
		getEntryHtml(entryId, formId, layoutId, jwt, (body) => {
			createPdf(entryId, formId, layoutId,jwt, (pdf) => {
				res.setHeader('Content-Type', 'application/pdf');
				res.setHeader('Content-Disposition', 'attachment; filename=message.pdf');
				res.send(pdf);
			})
		});
	}catch (e) {
		res.status(500).send(e);
	}

}));

/**
 * Pass JWT login to the WordPress
 */
app.post('/proxy-login', (async function (req, res) {
	const {
		username,
		password,
	} = req.body;
	fetch('http://localhost:8218/wp-json/jwt-auth/v1/token', {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password,

		})
	}).then(r => r.json())
		.then(r => {
			res.status(200).send(r);
		})
		.catch(e => {
			res.status(e.status).send(e);
		});

}));

app.get('/forms', ((req, res) => {
	let {
		page,
		jwt
	} = req.query;
	if (isNaN(page)) {
		page = 1;
	}

	const checked = checkToken(jwt);
	if( ! checked.valid ){
		return res.status(403).send(checked.data);
	}

	fetch(`http://localhost:8218/wp-json/cf-api/v2/forms?page=${page}&jwtToken=${jwt}&full=true&details=true`, {
		headers: {'Authorization': `Bearer ${jwt}`}
	}).then(r => r.json())
		.then(forms => {
			res.send(forms)
		})
		.catch(e => res.send(e));


}));
app.get('/entries/:formId', ((req, res) => {

	let {
		page,
		jwt
	} = req.query;
	if (!page) {
		page = 1;
	}
	const {
		formId
	} = req.params;

	const checked = checkToken(jwt);
	if( ! checked.valid ){
		return res.status(403).send(checked.data);
	}

	fetch(`http://localhost:8218/wp-json/cf-api/v2/entries/${formId}?${page}&jwtToken=${jwt}`, {
		headers: {'Authorization': `Bearer ${jwt}`}
	})
		.then(r => r.json())
		.then(entries => res.send(entries))
		.catch(e => res.status(500).send(e));


}));


app.get( '/hi-roy', (req,res) =>{
	res.status(418).send(process.env);
});
try {
	app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (e) {
	console.log(e);
}
