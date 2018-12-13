import renderer from "react-test-renderer";
import React from "react";
import {EntryMailData} from "./EntryMailData";
import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe( 'EntryMailData component ', () => {

	const onChange =jest.fn();
	const mailData=  {
		recipients: 'roy@hiroy.club',
		subject: 'Hi Roy',
		replyto: 'no-reply@calderawp.com',
		from_name: 'Roy Sivan',
		html: '<p>Hi Roy</p>'
	};
	test('EntryMailDatau matches snapshot', () => {
		expect(
			renderer.create(
				<EntryMailData
					mailData={mailData}
					onChange={onChange}

				/>
			)
		).toMatchSnapshot();
	});


	it( 'Sends updates', () => {
		const onChange = jest.fn();
		const component = mount( <EntryMailData
			mailData={mailData}
			onChange={onChange}

		/>);
		component.find( 'select' ).simulate( 'change', {target: {value: 'false'}});
		expect(onChange.mock.calls.length ).toBe(1);
		expect(onChange).toMatchSnapshot();
	});
});
