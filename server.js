
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('isomorphic-fetch');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').load();

const apiHandlers = require( './src/api/apiHandlers');


app.get('/api/send', apiHandlers.sendMessage );
app.get('/pdf', apiHandlers.getPdf );
app.post('/proxy-login', apiHandlers.postProxyLogin );

app.get('/forms', apiHandlers.getForms );
app.get('/entries/:formId', apiHandlers.getEntries);
app.get( '/hi-roy', apiHandlers.getHi );



try {
	app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (e) {
	console.log(e);
}
