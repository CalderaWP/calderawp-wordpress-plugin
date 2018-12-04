//import { BrowserRouter as Router, Link } from "react-router-dom";
import React from 'react';
import Entries from "./Pages/Entries";
import "./app.css";
import {CFProLogout} from "./components/Login/CFProLogout";
import {CFProLogin} from "./components/Login/CFProKeys";
import {JwtLogin} from "./components/Login/JwtLogin";


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: false,
			onLogout: () => {}
		};
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

	isLoggedIn(){
		return this.props.isLoggedIn;
	}

	render() {
		const {
			getForms,
			getEntries,
			keys,
			onJwtToken
		} = this.props;
		const {
			onLogout
		} = this.state;



		return(
			<div>
				{this.isLoggedIn() ? (
					<div>
						<CFProLogout onLogout={onLogout}/>
						<Entries
							getForms={getForms}
							getEntries={getEntries}
						/>
					</div>

				) : (
					<JwtLogin
						onTokenReceived={onJwtToken}
					/>
				)}
			</div>
		)

	}
}

export default App;
