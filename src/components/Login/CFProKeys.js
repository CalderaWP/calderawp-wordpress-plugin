import React, {Component} from 'react';
import {TextControl} from '@wordpress/components'
import sha1 from  'locutus/php/strings/sha1';

export class CFProLogin extends Component {



	constructor(props){
		super(props);
		this.state = {
			publicKey: '',
			secretKey: '',
			token: ''
		}

		this.createToken = this.createToken.bind(this);
		this.setPublicKey = this.setPublicKey.bind(this);
		this.setSecretKey = this.setSecretKey.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	createToken(){
		const {
			publicKey,
			secretKey
		} = this.state;
		return sha1(publicKey + secretKey);

	}

	setPublicKey(publicKey){
		this.setState({publicKey});
	}

	setSecretKey(secretKey){
		this.setState({secretKey});
	}

	onSubmit(event){
		event.preventDefault();
		const {onSubmit} = this.props;
		const {publicKey}= this.state;
		onSubmit({
			publicKey,
			token: this.createToken()
		})
	}

	render(){
		const {
			publicKey,
			secretKey
		} = this.state;

		return (
			<form
				id={'caldera-pro-login'}
				onSubmit={this.onSubmit}
			>
			<TextControl
				value={publicKey}
				label={'Caldera Forms Pro Public Key'}
				onChange={this.setPublicKey}
				id={'caldera-pro-cfp-public'}
			/>
			<TextControl
				value={secretKey}
				label={'Caldera Forms Pro Secret Key'}
				onChange={this.setSecretKey}
				id={'caldera-pro-cfp-secret'}
			/>
			<input type={'submit'} value={'Login'} />
		</form>);
	}
}