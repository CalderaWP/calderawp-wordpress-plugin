import React, {Component} from 'react';
import {TextControl,Spinner} from '@wordpress/components'

export class JwtLogin extends Component {



	constructor(props){
		super(props);
		this.state = {
			userName: '',
			password: '',
			message: '',
			loading: false
		}

		this.setUserName = this.setUserName.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getTokenViaApi = this.getTokenViaApi.bind(this);
	}



	getTokenViaApi(){
		const {
			userName,
			password
		} = this.state;
		const {
			wpApiUrl,
			onTokenReceived,
			requestTokenViaApi
		} = this.props;

		requestTokenViaApi( userName,password,
			(r) => {
				this.setState({message:"logged in",loading:false});
				onTokenReceived({
					token: r.token,
					displayName: r.user_display_name
				})
			},
			(e) => {
				if( e.hasOwnProperty('message') ){
					this.setState({message:e.message,loading:false});
				}
			}
		);
	}

	setUserName(userName){
		this.setState({userName});
	}

	setPassword(password){
		this.setState({password});
	}

	onSubmit(event){
		event.preventDefault();
		this.setState({loading: true});
		this.getTokenViaApi();
	}

	render(){
		const {
			userName,
			password,
			loading,
			message
		} = this.state;

		return (
			<form
				id={'caldera-pro-jwt-login'}
				onSubmit={this.onSubmit}
			>
				<div>
					{loading ? (
						<div>Loading...
						<Spinner/>
						</div>

					) : (
						<div className={'alert'}>{message}</div>
					)}
				</div>

			<TextControl
				value={userName}
				label={'User name'}
				onChange={this.setUserName}
				id={'caldera-pro-cfp-username'}
				disabled={loading}
			/>
			<TextControl
				value={password}
				type={'password'}
				label={'Password'}
				onChange={this.setPassword}
				id={'caldera-pro-cfp-password'}
				disabled={loading}
			/>
			<input type={'submit'} value={'Login'} />
		</form>);
	}
}
