import renderer from "react-test-renderer";
import React from "react";
import "@babel/polyfill";
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';


describe('Main app component', () => {
	test('snapshot Logged out', () => {
		expect(renderer.create(<App
			getForms={jest.fn()}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={false}
			jwt={''}/>).toJSON()
		).toMatchSnapshot()
	});

	test('snapshot Logged in', () => {
		expect(renderer.create(<App
			getForms={jest.fn()}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'asddfghj'}/>).toJSON()
		).toMatchSnapshot()
	});
});
