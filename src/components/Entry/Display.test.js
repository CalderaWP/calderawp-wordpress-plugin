import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Display from "./Display";
Enzyme.configure({adapter: new Adapter()});

describe( 'Entry display component', () => {
	const _forms = require( '../../__MOCK_DATA__/forms' );
	const forms = Object.values(_forms );
	const formId = 'CF5bde22b646ed0';
	const form = _forms[formId];
	const entries = require( '../../__MOCK_DATA__/entries' );
	const entry = entries[0];
	const entryFieldId = 'fld_8768091';
	const entryId = entry.id;
	const instanceId = '54fds';
	const beforeText = 'Before';
	const afterText = 'After';
	const onSetForm = jest.fn();
	const onSetEntry = () => jest.fn();
	const onSetEntryField =jest.fn();
	const setBefore = () => jest.fn();
	const setAfter = () => jest.fn();

	test( 'Displays when all props are provided and matches snapshot',() => {
		expect( renderer.create(
			<Display
				form={form}
				currentEntryId={entryId}
				entryId={entryId}
				entry={entry}
				formId={formId}
				entryFieldId={entryFieldId}
				before={beforeText}
				after={afterText}
			/>
		)).toMatchSnapshot();
	});


	test( 'Returns a fragment if not enough to display',() => {
		expect( renderer.create(
			<Display
				form={{}}
				currentEntryId={''}
				entryId={0}
				entry={{}}
				formId={''}
				entryFieldId={''}
				before={''}
				after={''}
			/>
		)).toMatchSnapshot();
	});

	test( 'Returns a fragment if entry has no fields',() => {
		const entry = {
			"id": "1",
			"form_id": "CF5bde22b646ed0",
			"datestamp": "2018-11-03 22:35:54",
			"status": "active",
			"user": {
				"id": "",
				"name": "admin",
				"email": ""
			},
		};
		expect( renderer.create(
			<Display
				form={form}
				currentEntryId={entryId}
				entryId={entryId}
				entry={entry}
				formId={formId}
				entryFieldId={entryFieldId}
				before={beforeText}
				after={afterText}
			/>
		)).toMatchSnapshot();
	});
});
