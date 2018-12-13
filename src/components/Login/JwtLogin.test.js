import renderer from "react-test-renderer";
import React from "react";

import "@babel/polyfill";

import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});
import {JwtLogin} from  './JwtLogin';


describe( 'JWT Login component', () => {
	test('Component matches snapshot', () => {
		expect(
			renderer.create(
				<JwtLogin

				/>
			)
		).toMatchSnapshot();
	});
});
