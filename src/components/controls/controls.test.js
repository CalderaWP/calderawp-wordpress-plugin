import renderer from 'react-test-renderer';
import React from 'react';
import {ChooseForm} from './ChooseForm';
import {ChooseEntry} from "./ChooseEntry";
import {ChooseEntryField} from "./ChooseEntryField";
import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe( 'Choosing controls', () => {

	const _forms = require( '../../__MOCK_DATA__/forms' )
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
	test( 'Choose form', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={forms}
					currentFormId={formId}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Choose form with no forms selected', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={forms}
					currentFormId={''}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Choose form when there no forms to choose from', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={[]}
					currentFormId={''}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});


	it('ChooseForm call onSetForm prop and return value, not event', () => {
		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<ChooseForm
				forms={forms}
				currentFormId={''}
				onSetForm={mockFn}
				instanceId={instanceId}
			/>);
		component.find('select').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');
	});


	test( 'Choose entry', () => {
		expect(
			renderer.create(
				<ChooseEntry
					entries={entries}
					currentEntry={entryId}
					onSetEntry={onSetEntry}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});


	it('ChooseEntry call onSetEntry and return value, not event', () => {
		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<ChooseEntry
				entries={entries}
				currentEntry={entryId}
				onSetEntry={mockFn}
				instanceId={instanceId}
			/>);
		component.find('select').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');
	});

	test( 'Choose entry field', () => {
		expect(
			renderer.create(
				<ChooseEntryField
					currentEntry={entryId}
					form={form}
					onSetField={onSetEntryField}
					instanceId={instanceId}
					entries={entries}
					entryFieldId={entryFieldId}
				/>
			)
		).toMatchSnapshot();
	});

	it('ChooseEntryField call onSetField and return value, not event', () => {
		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<ChooseEntryField
				currentEntry={entryId}
				form={form}
				onSetField={mockFn}
				instanceId={instanceId}
				entries={entries}
				entryFieldId={entryFieldId}
			/>);
		component.find('select').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');
	});

});
