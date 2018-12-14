import React, {Fragment} from 'react';
import Entries from "./Pages/Entries";
import "./app.css";
import {LogoutButton} from "./components/Login/LogoutButton";
import {JwtLogin} from "./components/Login/JwtLogin";
import {NavigableMenu} from '@wordpress/components';
import logo from './globe.svg';
import {createHooks} from '@wordpress/hooks';
import {requestTokenViaApi} from "./components/Login/requestTokenViaApi";

export const cfProHooks = createHooks();


class App extends React.Component {

	constructor(props) {
		super(props);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderBody = this.renderBody.bind(this);
		cfProHooks.addFilter('header', 'cfPro', this.renderHeader);
		cfProHooks.addFilter('body', 'cfPro', this.renderBody);//mainMenuItems
		this.addMenuItem = this.addMenuItem.bind(this);
		this.removeMenuItem = this.removeMenuItem.bind(this);
		this.state =  {
			mainMenuItems: []
		}
	};

	/**
	 * Add an item to the main menu
	 * @param {string} key Unique identifier of item to add
	 * @param {Node} render What to render for item
	 */
	addMenuItem(key,render){
		const {mainMenuItems} = this.state;
		if (!mainMenuItems.hasOwnProperty(key)) {
			this.setState({
				mainMenuItems: {
					...mainMenuItems,
					[key]: render
				}

			})
		}
	}
	

	/**
	 * Remove an item from main menu
	 *
	 * @param {string} key Unique identifier of item to remove
	 */
	removeMenuItem(key){
		const {mainMenuItems} = this.state;
		if (mainMenuItems.hasOwnProperty(key)) {
			delete mainMenuItems[key];
			this.setState({mainMenuItems});
		}
	}

	renderHeader() {
		const {
			onLogout,
			isLoggedIn
		} = this.props;
		const {mainMenuItems} = this.state;


		if( isLoggedIn ){
			mainMenuItems['logOut'] = ( <LogoutButton key={'logout'}
				onLogout={onLogout}
			/>);
		}

		return (
			<div
				id={'caldera-pro-header'}
				key={'caldera-pro-header'}
			>
				<img
					src={logo}
					height={'40px'}
					width={'40px'}
					alt={'Caldera Globe Logo'}
				/>
				<h1 className="App-title">
					Caldera Pro
				</h1>
				<div className={'edit-post-header-toolbar'}>
					<NavigableMenu orientation="horizontal">
						{Object.values(mainMenuItems)}
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
			<div
				id={'caldera-pro-body'}
				key={'caldera-pro-body'}
			>
				<div className={'caldera-pro-inner'}>
					{isLoggedIn ? (
						<Fragment>
							<Entries
								jwt={jwt}
								hooks={cfProHooks}
								getForms={getForms}
								getEntries={getEntries}
								addMenuItem={this.addMenuItem}
								removeMenuItem={this.removeMenuItem}
							/>
						</Fragment>

					) : (
						<JwtLogin
							requestTokenViaApi={requestTokenViaApi}
							onTokenReceived={onJwtToken}
						/>
					)}
				</div>
			</div>
		)
	}

	render() {

		let output = [
			cfProHooks.applyFilters('before', []),
			cfProHooks.applyFilters('header', []),
			cfProHooks.applyFilters('body', []),
			cfProHooks.applyFilters('footer', [])
		];


		return (
			<div id="editor" className="gutenberg__editor caldera-pro-editor">
				{output}
			</div>
		);

	}
}

export default App;


