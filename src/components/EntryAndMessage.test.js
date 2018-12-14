import React from "react";
import renderer from "react-test-renderer";
import "@babel/polyfill";
import {EntryAndMessage} from "./EntryAndMessage";
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const mailData = {
	attachments: [],
	bcc: false,
	csv: false,
	from: "test@test.com",
	from_name: "Caldera Forms Notification",
	html: true,
	message: "<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">Mike</div>\n<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">Pollock</div>\n<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">j…",
	recipients:
		['roy@hiroy.club','alsoroy@hiroy.club'],
	replyto: "test@test.com",
	subject: "Contact Form 1"
};

const entries = require( '../__MOCK_DATA__/entries' );

const entry = {...entries[1],mailData};
describe( 'EntryAndMessage component' , () => {
	it( 'matches snapshot', () => {
		expect(renderer.create(
			<EntryAndMessage
				mailData={mailData}
				entries={entries}
				entryId={entry.id}
				entry={entry}
				formId={entry.form_id}
				formFields={entry.fields}
			/>
			).toJSON()
		).toMatchSnapshot()
	});

	it( 'updates mailData in state',() => {
		const component = shallow(
			<EntryAndMessage
				mailData={mailData}
				entries={entries}
				entryId={entry.id}
				entry={entry}
				formId={entry.form_id}
				formFields={entry.fields}
			/>
		);
		const newData = {...mailData, subject: 'Noms Time!' };
		component.instance().setMailData(newData);
		expect( component.state( 'mailData') ).toEqual(newData);
	});

	it( 'updates message in state',() => {
		const component = shallow(
			<EntryAndMessage
				mailData={mailData}
				entries={entries}
				entryId={entry.id}
				entry={entry}
				formId={entry.form_id}
				formFields={entry.fields}
			/>
		);
		component.instance().updateMessage('Foo');
		expect( component.state( 'mailData').message ).toEqual('Foo');
	});

	it( 'Sets edit show',() => {
		const component = shallow(
			<EntryAndMessage
				mailData={mailData}
				entries={entries}
				entryId={entry.id}
				entry={entry}
				formId={entry.form_id}
				formFields={entry.fields}
			/>
		);
		component.instance().setShowEdit(true);
		expect( component.state( 'showEdit') ).toEqual(true);
		component.instance().setShowEdit(false);
		expect( component.state( 'showEdit') ).toEqual(false);
	});

	it( 'Updates button message', () => {
		const closeMessage = 'Close!';
		const openMessage= 'Open!';
		const component = shallow(
			<EntryAndMessage
				mailData={mailData}
				entries={entries}
				entryId={entry.id}
				entry={entry}
				formId={entry.form_id}
				formFields={entry.fields}
				closeMessage={closeMessage}
				openMessage={openMessage}
			/>
		);
		expect( component.find( '.toggle-edit-view').text() ).toEqual(openMessage);
		component.setState( {showEdit:true});
		expect( component.find( '.toggle-edit-view').text() ).toEqual(closeMessage);

	})
});
