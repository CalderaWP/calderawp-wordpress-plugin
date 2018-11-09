import renderer from "react-test-renderer";
import React from "react";

import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import EntryListControls from './EntryListControls'

const _forms = require( '../../../__MOCK_DATA__/forms' )
const forms = Object.values(_forms );
const formId = 'CF5bde22b646ed0';
const form = _forms[formId];
const entries = require( '../../../__MOCK_DATA__/entries' );
const entry = entries[0];
const entryFieldId = 'fld_8768091';
const entryId = entry.id;
const instanceId = '54fds';



describe( 'EntryListControls component', () => {
	const mockFuncGeneric = jest.fn();
	it( 'Matches snapshot with all props', () => {
		expect(
			renderer.create(
				<EntryListControls
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFuncGeneric}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFuncGeneric}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	it( 'Matches snapshot with no entry selected ', () => {
		expect(
			renderer.create(
				<EntryListControls
					entryId={''}
					entries={entries}
					onSetEntry={mockFuncGeneric}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFuncGeneric}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	it( 'Matches snapshot with no form selected ', () => {
		expect(
			renderer.create(
				<EntryListControls
					entryId={''}
					entries={undefined}
					onSetEntry={mockFuncGeneric}
					formId={''}
					forms={forms}
					form={{}}
					onSetForm={mockFuncGeneric}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Calls onSetForm',() => {
		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<EntryListControls
				entryId={''}
				entries={undefined}
				onSetEntry={mockFuncGeneric}
				formId={''}
				forms={forms}
				form={{}}
				onSetForm={mockFn}
				instanceId={instanceId}
			/>);
		component.find('.caldera-forms-form-chooser').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});

	test( 'Calls onSetEntry',() => {
		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<EntryListControls
				entryId={''}
				entries={entries}
				onSetEntry={mockFn}
				formId={formId}
				forms={forms}
				form={form}
				onSetForm={mockFuncGeneric}
				instanceId={instanceId}
			/>);
		component.find('.caldera-forms-entry-chooser').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});

});