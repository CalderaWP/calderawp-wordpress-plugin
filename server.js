const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get( '/api/hello', (req,res) => {
	res.send({ message: 'Hi Roy' });
});

app.route('/pdf').post(async function(req, res) {
	const puppeteer = require('puppeteer');
	const http = require('http');
	const convertHTMLToPDF = require('pdf-puppeteer');
	convertHTMLToPDF(req.body, pdf => {
		res.setHeader('Content-Type', 'application/pdf');
		res.send(pdf);
	}).catch(err => {
		console.log(err);
		res.status(500).send('An error occurred');
	});
});


app.listen(port, () => console.log(`Listening on port ${port}`));






