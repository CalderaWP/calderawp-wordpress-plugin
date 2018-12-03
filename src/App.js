//import { BrowserRouter as Router, Link } from "react-router-dom";
import React from 'react';
import Entries from "./Pages/Entries";
import "./app.css";
import {CFProLogout} from "./components/Login/CFProLogout";
import {CFProLogin} from "./components/Login/CFProKeys";



class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: props.keys.hasKeys(),
			onLogout: props.keys.forget
		};
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

	isLoggedIn(){
		return this.state.isLoggedIn;
	}

	render() {
		const {
			getForms,
			getEntries,
			keys,
		} = this.props;
		const {
			token,
			onLogout
		} = this.state;

		return (
			<div>
				<div>{this.isLoggedIn() ? 'yes' : 'no'}</div>
				<div>{token}</div>

				{this.isLoggedIn() ? (
					<div>
						<CFProLogout onLogout={onLogout}/>
						<Entries
							getForms={getForms}
							getEntries={getEntries}
						/>
					</div>

				) : (
					<CFProLogin
						onSubmit={({publicKey,token}) => {
							keys.setPublicKey(publicKey);
							keys.setToken(token);
							window.location.reload();
						}}
					/>
				)}


			</div>

		)

	}
}

export default App;
