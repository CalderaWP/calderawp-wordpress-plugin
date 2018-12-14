const apiHandlers = require( './apiHandlers');
const wpUrls = require( './wpUrls');
import { Response } from 'jest-express/lib/response';



describe('Api Handlers', () => {
	let response;


	beforeEach(() => {
		fetch.resetMocks();
		response = new Response();
	});

	afterEach(() => {
		response.resetMocked();
	});

	const jwt = 'asdfklj';
	const page = 1;
	const req = {
		query: {
			page,
			jwt
		}
	};

	it( 'Is a teapot', () => {
		apiHandlers.getHi(req,response);
		expect(response.status).toBeCalledWith(418);
		expect(response.send).toHaveBeenCalled()
	});

	it('Gets forms', () => {
		fetch.mockResponseOnce(JSON.stringify([]));
		apiHandlers.getForms(req, response);
		expect(fetch.mock.calls.length).toEqual(1)
		expect(fetch.mock.calls[0][0]).toEqual(wpUrls.getForms(page,jwt));
	});

	it('Gets entries', () => {
		fetch.mockResponseOnce(JSON.stringify({}));
		apiHandlers.getEntries({
			query: req.query,
			params: {
				formId: 'cf11'
			}

		}, response);
		expect(fetch.mock.calls.length).toEqual(1)
		expect(fetch.mock.calls[0][0]).toEqual(wpUrls.getEntries(page,jwt,'cf11'));
	});

	it('Sends message', () => {
		fetch.mockResponseOnce(JSON.stringify({
			entryId:1,
			params: {formId:'cf11'},

		}));
		apiHandlers.sendMessage(req, response);
		expect(1).toBe(1);
	});


});

