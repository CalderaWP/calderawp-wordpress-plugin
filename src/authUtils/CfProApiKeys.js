import {remove as deleteCookie, set as setCookie} from "es-cookie";

export default function CfProApiKeys(publicKey,token){
	this.publicKey = publicKey;
	this.token = token;

	this.setToken = (token) => {
		setCookie( 'cs-token', token );
		this.token = token;
	};
	this.setPublicKey = (publicKey) => {
		setCookie( 'cs-public', publicKey );

		this.publicKey = publicKey;
	};

	this.hasKeys  = () => {
		return this.token && this.publicKey;
	}

	this.getRequestArgs = () => {
		return {
			public: this.publicKey,
			token: this.token
		}
	}

	this.forget = () => {
		window.location.reload();
		deleteCookie('cs-token');
		deleteCookie('cs-public');

	}

}