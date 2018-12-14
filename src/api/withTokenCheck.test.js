const withTokenCheck = require( './withTokenCheck' );
import { Response } from 'jest-express/lib/response';

describe( 'withTokenCheck', () => {
	let response;


	beforeEach(() => {
		response = new Response();
	});

	afterEach(() => {
		response.resetMocked();
	});

	it( 'sends 403 if token invalid', () => {
		withTokenCheck({}, response, jest.fn(), jest.fn(() => {return {
			valid: false,
			data: 'fail'
		}}))
		expect(response.status).toBeCalledWith(403);
		expect(response.send).toHaveBeenCalled()
	});

	it( 'Dispatches request if token valid', () => {
		const handler = jest.fn()
		withTokenCheck({}, response, handler, jest.fn(() => {return {
			valid: true,
			data: 'pass'
		}}))
		expect(handler).toHaveBeenCalled()
	});
});
