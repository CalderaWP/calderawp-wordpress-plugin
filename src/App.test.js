import renderer from "react-test-renderer";
import React from "react";
import "@babel/polyfill";
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import App from './App';

const getForms = jest.fn(() => {
	return Promise.resolve({
		json: jest.fn((r) => {
			return [];
		})
	});
});

const getFormsWithForms = jest.fn(() => {
	return Promise.resolve({
		json: jest.fn((r) => {
			return [
				{
					ID: 'cf1',
					name: 'Form One'
				},
				{
					ID: 'cf2',
					name: 'Form Two'
				}
			];
		})
	});
});

describe('Main app component', () => {
	test('snapshot Logged out', () => {
		expect(renderer.create(<App
			getForms={getForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={false}
			jwt={''}/>).toJSON()
		).toMatchSnapshot()
	});

	test('snapshot Logged in and no forms', () => {
		expect(renderer.create(<App
			getForms={getFormsWithForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'asddfghj'}/>).toJSON()
		).toMatchSnapshot()
	});

	test('snapshot Logged in and forms', () => {
		expect(renderer.create(<App
			getForms={getForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'asddfghj'}/>).toJSON()
		).toMatchSnapshot()
	});
});

describe('Main app component methods', () => {
	const MenuItem = ({name}) => (<div>{name}</div>);

	test('addMenuItem adds a menu item', () => {
		const component = shallow(<App
			getForms={getFormsWithForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'aa'}/>);

		const item = <MenuItem name={'roy'}/>;
		component.instance().addMenuItem('hello', item);
		expect(component.state('mainMenuItems').hasOwnProperty('hello')).toBe(true);
		expect(component.state('mainMenuItems').hello).toEqual(item);

	});

	test( 'can not use addMenuItem to update menu', () => {
		const item = <MenuItem name={'roy'}/>;
		const component = shallow(<App
			getForms={getFormsWithForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'aa'}/>);
		component.instance().addMenuItem('hello', item);
		component.instance().addMenuItem('hello', <div>Hi Roy!</div>);
		expect(component.state('mainMenuItems').hello).toEqual(item);
	});

	test( 'Removing menu items', () => {
		const component = shallow(<App
			getForms={getFormsWithForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'aa'}/>);

		const item = <MenuItem name={'roy'}/>;
		component.instance().addMenuItem('hello3', <MenuItem name={'Pants!!'}/>);
		component.instance().addMenuItem('hello', <MenuItem name={'Pants!'}/>);
		component.instance().addMenuItem('hello2', item);


		component.instance().removeMenuItem('hello' );
		expect(component.state('mainMenuItems').hasOwnProperty('hello')).toBe(false);
		expect(component.state('mainMenuItems').hasOwnProperty('hello2')).toBe(true);
		expect(component.state('mainMenuItems').hasOwnProperty('hello3')).toBe(true);

	});

	it( 'Shows the added menu items', () => {
		const component = shallow(<App
			getForms={getFormsWithForms}
			getEntries={jest.fn()}
			onJwtToken={jest.fn()}
			isLoggedIn={true}
			jwt={'aa'}/>);

		const className = 'the-class';
		const item = <MenuItem name={'roy'} className={className}/>;
		component.instance().addMenuItem('hello2', item);
		expect( component.find( '.' + className ).length ).toBe(1);
	})


});

