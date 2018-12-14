const getEntryHtml = require( './getEntryHtml' );
const createPdf = require( './createPdf' );
const wpUrls = require( './wpUrls');
module.exports = {
	sendMessage:(req,res) => {
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const {
			entryId,
			formId,
			jwt
		} = req.query;
		const checked = {valid:true};
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
	},
	getForms:(req,res) => {
		let {
			page,
			jwt
		} = req.query;
		if (isNaN(page)) {
			page = 1;
		}

		const checked = {valid:true};
		if( ! checked.valid ){
			return res.status(403).send(checked.data);
		}

		fetch(
			wpUrls.getForms(page,jwt),
			{}
		).then(r => r.json())
		.then(forms => {
			res.status(200).send(forms)
		})
		.catch(e => res.send(e));
	},
	getEntries: (req, res) => {

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

		const checked = {valid:true};
		if( ! checked.valid ){
			return res.status(403).send(checked.data);
		}

		fetch(wpUrls.getEntries(page,jwt,formId), {})
			.then(r => r.json())
			.then(entries => res.send(entries))
			.catch(e => res.status(500).send(e));
	},
	getPdf:(async function (req, res) {

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

	}),
	postProxyLogin: (req, res) => {
		const {
			username,
			password,
		} = req.body;
		fetch(wpUrls.proxyLogin(), {
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
				const status = r.hasOwnProperty('data') && r.data.hasOwnProperty( 'status')
				? r.data.status : 200;
				const response = r.hasOwnProperty('data') && r.data.hasOwnProperty( 'message')
				? { message: r.data.message} : {message: ''};
				res.status(status).send(response);
			})
			.catch(e => {
				res.status(e.status).send(e);
			});

	},
	getHi: (req,res) => {
		res.status(418).send({env:process.env,hi:'Roy'});
	}

}
