const wpUrls = require( './wpUrls');

describe( 'wp-json urls', () => {
	const jwt = 'TOKEN';
	const page = 1;
	test( 'getForms', () => {
		expect( wpUrls.getForms(page,jwt) ).toEqual('http://localhost:8218/wp-json/cf-api/v2/forms?page=1&jwtToken=TOKEN&full=true&details=true');
	});
	test( 'getEntries', () => {
		expect( wpUrls.getEntries(page,jwt,'cf1234') ).toEqual('http://localhost:8218/wp-json/cf-api/v2/entries/cf1234?1&jwtToken=TOKEN');
	});
	test( 'proxyLogin', () => {
		expect( wpUrls.proxyLogin() ).toEqual('http://localhost:8218/wp-json/jwt-auth/v1/token');
	});
});
