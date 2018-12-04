//import { BrowserRouter as Router, Link } from "react-router-dom";
import React, {Fragment} from 'react';
import Entries from "./Pages/Entries";
import "./css/caldera-css/admin.css";
import "./css/guten-css/components/style.css";
import "./css/guten-css/edit-post/style.css";
import "./css/guten-css/editor/style.css";
import "./app.css";
import {LogoutButton} from "./components/Login/LogoutButton";
import {JwtLogin} from "./components/Login/JwtLogin";
import {Admin} from '@caldera-labs/components'
import { NavigableMenu, TabbableContainer, Button } from '@wordpress/components';
import logo from './globe.svg';

const MainMenu = ({onLogout,isLoggedIn}) => (
	<div className={'edit-post-header-toolbar'}>
		<NavigableMenu orientation="horizontal">
			{isLoggedIn &&
				<LogoutButton className={'caldera-pro-logout'} onLogout={onLogout}/>
			}
		</NavigableMenu>
	</div>
);


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
			<div id="editor" className="gutenberg__editor caldera-pro-editor">
				<div id={'caldera-pro-header'}>
					<img src={logo} height={'40px'} width={'40px'} />
					<h1 className="App-title">Caldera Pro </h1>
					<MainMenu
						onLogout={onLogout}
						isLoggedIn={isLoggedIn}
					/>
				</div>
				<div id={'caldera-pro-body'}>
						<div className={'caldera-pro-inner'}>
							{isLoggedIn ? (
							<Fragment>
								<Entries
									getForms={getForms}
									getEntries={getEntries}
								/>
							</Fragment>

						) : (
							<JwtLogin
								onTokenReceived={onJwtToken}
							/>
						)}
					</div>
				</div>


			</div>
		)

	}
}

export default App;


