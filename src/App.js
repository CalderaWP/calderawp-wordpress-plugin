//import { BrowserRouter as Router, Link } from "react-router-dom";
import React from 'react';
import Entries from "./Pages/Entries";
import "./app.css";
import {LogoutButton} from "./components/Login/LogoutButton";
import {JwtLogin} from "./components/Login/JwtLogin";

class App extends React.Component {



	render() {
		const {
			getForms,
			getEntries,
			keys,
			onJwtToken,
			onLogout,
			isLoggedIn
		} = this.props;


		return(
			<div>
				{isLoggedIn ? (
					<div>
						<LogoutButton onLogout={onLogout}/>
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
