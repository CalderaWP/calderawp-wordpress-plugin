module.exports = function checkToken(jwtToken) {
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
