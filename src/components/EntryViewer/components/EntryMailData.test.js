import renderer from "react-test-renderer";
import React from "react";
import {EntryMailData} from "./EntryMailData";

describe( 'EntryMailData component ', () => {

	const onChange =jest.fn();
	const mailData=  {
		recipients: 'roy@hiroy.club',
		subject: 'Hi Roy',
		replyto: 'no-reply@calderawp.com',
		from_name: 'Roy Sivan',
		html: '<p>Hi Roy</p>'
	}
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

});
