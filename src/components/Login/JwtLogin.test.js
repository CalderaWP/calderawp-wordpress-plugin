import renderer from "react-test-renderer";
import React from "react";

import "@babel/polyfill";

import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});
import {JwtLogin} from  './JwtLogin';


describe( 'JWT Login component UI', () => {
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

describe( 'JWT Login gets token', () => {
	const token = '1223adsdsdf';
	const user_display_name = 'Roy Sivan';
	const requestTokenViaApi = jest.fn( (username, password, onSuccess, onError) => {
		onSuccess({
				token,
				user_display_name
			})
	});



	it('Gets the token', () => {
		const onTokenReceived = jest.fn();
		const component = shallow(
			<JwtLogin
				requestTokenViaApi={requestTokenViaApi}
				onTokenReceived={onTokenReceived}
			/>
		);
		component.setState( {userName:'roy', password: 'sivan'})
		component.instance().getTokenViaApi();
		expect( component.state('loading' ) ).toBe(false) ;
		expect( requestTokenViaApi.mock.calls.length ).toBe(1);



	});

	it('Returns data to token received callback', () => {
		const onTokenReceived = jest.fn();
		const message = 'Failed To Login';
		const requestTokenViaApi = jest.fn( (username, password, onSuccess, onError) => {
			onError({
				message
			})
		});
		const component = shallow(
			<JwtLogin
				requestTokenViaApi={requestTokenViaApi}
				onTokenReceived={onTokenReceived}
			/>
		);
		component.setState( {userName:'roy', password: 'sivan'});
		component.instance().getTokenViaApi();
		expect( component.state('loading' ) ).toBe(false) ;
		expect( component.state('message' ) ).toBe(message) ;

		expect( onTokenReceived.mock.calls.length ).toBe(0);


	});


	it('Passes error message from token check to state', () => {
		const onTokenReceived = jest.fn();
		const component = shallow(
			<JwtLogin
				requestTokenViaApi={requestTokenViaApi}
				onTokenReceived={onTokenReceived}
			/>
		);
		component.setState( {userName:'roy', password: 'sivan'});
		component.instance().getTokenViaApi();

		expect( onTokenReceived.mock.calls.length ).toBe(1);
		expect( onTokenReceived ).toBeCalledWith({
			token,
			displayName:user_display_name
		});

	});

	it('Calls the get token callback function when submit handler runs', () => {
		const onTokenReceived = jest.fn();
		const component = shallow(
			<JwtLogin
				requestTokenViaApi={requestTokenViaApi}
				onTokenReceived={onTokenReceived}
			/>
		);
		component.instance().onSubmit({preventDefault:jest.fn()});
		expect( component.state('loading' ) ).toBe(false) ;
		expect( onTokenReceived.mock.calls.length ).toBe(1);



	});

	it('Calls the get token callback function on submit', () => {
		const onTokenReceived = jest.fn();
		const component = shallow(
			<JwtLogin
				requestTokenViaApi={requestTokenViaApi}
				onTokenReceived={onTokenReceived}
			/>
		);
		component.find( '#caldera-pro-jwt-login' ).simulate( 'submit',{preventDefault:jest.fn()});
		expect( component.state('loading' ) ).toBe(false) ;
		expect( onTokenReceived.mock.calls.length ).toBe(1);

	});
});

