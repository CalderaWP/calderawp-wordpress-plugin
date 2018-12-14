module.exports = {
	getForms:(page,jwt) => {
		return `http://localhost:8218/wp-json/cf-api/v2/forms?page=${page}&jwtToken=${jwt}&full=true&details=true`;
	},
	getEntries: (page,jwt,formId) => {
		return `http://localhost:8218/wp-json/cf-api/v2/entries/${formId}?${page}&jwtToken=${jwt}`;
	},
	proxyLogin: () => {
		return 'http://localhost:8218/wp-json/jwt-auth/v1/token'
	}
}
