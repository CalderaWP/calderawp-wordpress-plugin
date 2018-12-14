
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('isomorphic-fetch');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').load();

const apiHandlers = require( './src/api/apiHandlers');
const withTokenCheck = require( './src/api/withTokenCheck');
const checkToken = require( './src/api/checkToken');

function secureRoute(req,res,handler){
	const jwt = req.query.jwt ? req.query.jwt : req.params.jwt;
	return withTokenCheck(req,res,handler,checkToken(jwt))
}


app.get('/api/send', (req,res) => secureRoute(req,res,apiHandlers.sendMessage ));
app.get('/pdf', (req,res) => secureRoute(req,res,apiHandlers.getPdf ));
app.post('/proxy-login', (req,res) => {
	return  apiHandlers.postProxyLogin(req,res);
} );

app.get('/forms', (req,res) => secureRoute(req,res,apiHandlers.getForms ) );
app.get('/entries/:formId', (req,res) => secureRoute(req,res,apiHandlers.getEntries ));
app.get( '/hi-roy', apiHandlers.getHi );



try {
	app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (e) {
	console.log(e);
}
