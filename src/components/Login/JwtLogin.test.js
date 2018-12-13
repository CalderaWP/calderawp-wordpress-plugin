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

	it( 'sets password', () => {
		const component = shallow(<JwtLogin/>);
		component.instance().setPassword('password' );
		expect( component.state('password' ) ).toBe( 'password') ;
	});

	it( 'sets username', () => {
		const component = shallow(<JwtLogin/>);
		component.instance().setUserName('userName' );
		expect( component.state('userName' ) ).toBe( 'userName') ;
	});

	test('Shows spinner when loading', () => {
		const component = shallow(<JwtLogin/>);
		component.setState( {loading:true})
		expect(
			renderer.create(component)
		).toMatchSnapshot();
	});
});
