import renderer from "react-test-renderer";
import React from "react";

import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {EntryFieldView} from "./EntryFieldView";
import {EntryRow} from "./EntryRow";
import {EntryRows} from "./EntryRows";
import {EntryHeader} from "./EntryHeader";
import {EntryHeaders} from "./EntryHeaders";


Enzyme.configure({adapter: new Adapter()});



const _forms = require( '../../__MOCK_DATA__/forms' );
const forms = Object.values(_forms );
const formId = 'CF5bde22b646ed0';
const form = _forms[formId];
const formFields = form.fields;

const entries = require( '../../__MOCK_DATA__/entries' );
const entry = entries[0];
const entryFieldId = 'fld_8768091';
const entryId = entry.id;
const entryField = entry.fields[entryFieldId];

const instanceId = '54fds';
const beforeText = 'Before';
const afterText = 'After';
const onSetForm = jest.fn();
const onSetEntry = () => jest.fn();
const onSetEntryField =jest.fn();
const setBefore = () => jest.fn();
const setAfter = () => jest.fn();




describe( 'Entry Viewer components ', () => {
	test( 'EntryFieldView matches snapshot', () => {
		expect(
			renderer.create(
				<EntryFieldView
					entryField={entryField}
					fieldType={'text'}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'EntryHeader matches snapshot with labelWith', () => {
		expect(
			renderer.create(
				<EntryHeader
					entryField={entryField}
					labelWith={'Label Me!'}
				/>
			)
		).toMatchSnapshot();
	});


	test( 'EntryHeader matches snapshot without label', () => {
		expect(
			renderer.create(
				<EntryHeader
					entryField={entryField}
				/>
			)
		).toMatchSnapshot();
	});


	test( 'EntryHeaders matches snapshot ', () => {
		expect(
			renderer.create(
				<EntryHeaders
					entries={entries}
					formFields={formFields}
				/>
			)
		).toMatchSnapshot();
	});



	test( 'EntryFieldView matches snapshot', () => {
		expect(
			renderer.create(
				<EntryFieldView
					entryField={entryField}
					fieldType={'text'}
				/>
			)
		).toMatchSnapshot();
	});


	test( 'EntryRow matches snapshot', () => {
		expect(
			renderer.create(
				<EntryRow entry={entry}/>
			)
		).toMatchSnapshot();
	});


	test( 'EntryRow matches snapshot', () => {
		expect(
			renderer.create(
				<EntryRows
					entries={entries}
				/>
			)
		).toMatchSnapshot();
	});
});