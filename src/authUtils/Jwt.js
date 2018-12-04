import {remove as deleteCookie, set as setCookie,get as getCookie} from "es-cookie";

export default function Jwt(token,displayName){
	this.token = token;
	this.displayName = displayName;
	const PREFIX = 'cfprojwt-';
	const TOKEN = PREFIX + '-token';
	const DISPLAY_NAME = PREFIX + '-display-name'
	this.setDisplayName = displayName => {
		setCookie(DISPLAY_NAME,displayName);
		this.displayName = displayName;
	};
	this.setToken = token => {
		setCookie(TOKEN,token);
		this.token = token;
	};

	this.forget = () => {
		deleteCookie(DISPLAY_NAME);
		deleteCookie(TOKEN);
	}
	this.getToken = () => {
		if( this.token){
			return this.token;
		}
		const _token = getCookie(TOKEN);
		if( _token ){
			this.setToken(_token);
			return this.token;

		}

	};
	this.getDisplayName = () => {
		if( this.displayName){
			return this.displayName;
		}
		const _displayName = getCookie(DISPLAY_NAME);
		if( _displayName ){
			this.setDisplayName(_displayName);
			return this.displayName;

		}

	};

}