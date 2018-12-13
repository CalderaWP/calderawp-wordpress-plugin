import renderer from "react-test-renderer";
import React from "react";
import "@babel/polyfill";

import {LogoutButton} from "./LogoutButton";

describe( 'Logout button', () => {
	it( 'matches snapshot', () => {
		const onLogout = jest.fn();
		expect( renderer.create(
			<LogoutButton
				onLogout={onLogout}
			/>
		)).toMatchSnapshot();
	});
})
