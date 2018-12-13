import React, {Fragment} from 'react';
import Entries from "./Pages/Entries";
import "./app.css";
import {LogoutButton} from "./components/Login/LogoutButton";
import {JwtLogin} from "./components/Login/JwtLogin";
import {NavigableMenu} from '@wordpress/components';
import logo from './globe.svg';
import {createHooks} from '@wordpress/hooks';

export const cfProHooks = createHooks();


class App extends React.Component {

	constructor(props) {
		super(props);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderBody = this.renderBody.bind(this);
		cfProHooks.addFilter('header', 'cfPro', this.renderHeader);
		cfProHooks.addFilter('body', 'cfPro', this.renderBody);//mainMenuItems
	};

	renderHeader() {
		const {
			onLogout,
			isLoggedIn
		} = this.props;

		const output = cfProHooks.applyFilters('mainMenuItems', []);

		return (
			<div id={'caldera-pro-header'}>
				<img
					src={logo} height={'40px'} width={'40px'} alt={'Caldera Globe Logo'}
				/>
				<h1 className="App-title">Caldera Pro </h1>
				<div className={'edit-post-header-toolbar'}>
					<NavigableMenu orientation="horizontal">
						{isLoggedIn &&
						<LogoutButton
							onLogout={onLogout}
						/>
						}
						{output}
					</NavigableMenu>
				</div>
			</div>
		)
	}

	renderBody() {
		const {
			getForms,
			getEntries,
			onJwtToken,
			isLoggedIn,
			jwt
		} = this.props;
		return (
			<div id={'caldera-pro-body'}>
				<div className={'caldera-pro-inner'}>
					{isLoggedIn ? (
						<Fragment>
							<Entries
								jwt={jwt}
								hooks={cfProHooks}
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
		)
	}

	render() {

		let output = [];
		output.push(cfProHooks.applyFilters('before', []));
		output.push(cfProHooks.applyFilters('header', []));
		output.push(cfProHooks.applyFilters('body', []));
		output.push(cfProHooks.applyFilters('footer', []));

		return (
			<div id="editor" className="gutenberg__editor caldera-pro-editor">
				{output}
			</div>
		);

	}
}

export default App;


