
export const requestTokenViaApi = (username, password, onSuccess, onError) => {
	fetch( '/proxy-login', {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password,

		})
	}).then( r => r.json() )
		.then( r => {
			onSuccess(r)
		})
		.catch( e => {
			onError(e);
		})
};
