import "@babel/polyfill";


import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

import AfterControl from './AfterControl';
import BeforeControl from "./BeforeControl";

import Inline from './Inline';
import Controls from './Controls';

const _forms = require( '../../../__MOCK_DATA__/forms' )
const forms = Object.values(_forms );
const formId = 'CF5bde22b646ed0';
const form = _forms[formId];
const entries = require( '../../../__MOCK_DATA__/entries' );
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

describe( 'AfterControl', ()  => {
	test( 'After editor with label hidden matches spapshots',() => {
		expect( renderer.create(
			<AfterControl
				setAfter={setAfter}
				after={afterText}
				instanceId={instanceId}
				hideLabel={true}
			/>
		)).toMatchSnapshot();
	});

	test( 'After editor with label visible matches spapshots',() => {
		expect( renderer.create(
			<AfterControl
				setAfter={setAfter}
				after={afterText}
				instanceId={instanceId}
				hideLabel={false}
			/>
		)).toMatchSnapshot();
	});

	test( 'After editor with label visible calls onChange',() => {

		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<AfterControl
				setAfter={mockFn}
				after={afterText}
				instanceId={instanceId}
				hideLabel={false}
			/>);
		component.find('input').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});

	test( 'After editor with label not visible calls onChange',() => {

		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<AfterControl
				setAfter={mockFn}
				after={afterText}
				instanceId={instanceId}
				hideLabel={true}
			/>);
		component.find('input').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});

});

describe( 'Before editor', ()  => {
	test( 'Before editor with label hidden matches spapshots',() => {
		expect( renderer.create(
			<BeforeControl
				setBefore={setBefore}
				before={beforeText}
				instanceId={instanceId}
				hideLabel={true}
			/>
		)).toMatchSnapshot();
	});

	test( 'Before editor with label visible matches spapshots',() => {
		expect( renderer.create(
			<BeforeControl
				setBefore={setBefore}
				before={beforeText}
				instanceId={instanceId}
				hideLabel={true}
			/>
		)).toMatchSnapshot();
	});

	test( 'Before editor with label visible calls onChange',() => {

		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<BeforeControl
				setBefore={mockFn}
				before={beforeText}
				instanceId={instanceId}
				hideLabel={true}
			/>);
		component.find('input').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});

	test( 'Before editor with label not visible calls onChange',() => {

		const mockFn = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: 'matched' }
		};
		const component = mount(
			<BeforeControl
				setBefore={mockFn}
				before={beforeText}
				instanceId={instanceId}
				hideLabel={true}
			/>);
		component.find('input').simulate('change', event);
		expect(mockFn.mock.calls[0][0]).toBe('matched');

	});
});


describe( 'Inline component', ()  => {
	const mockFn = jest.fn();

	it( 'Match snapshot with just forms prop set',() => {
		expect(
			renderer.create(
				<Inline
					entryId={''}
					entries={{}}
					onSetEntry={mockFn}
					formId={''}
					forms={forms}
					form={{}}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={entryFieldId}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );

	it( 'Match snapshot with form selected only',() => {
		expect(
			renderer.create(
				<Inline
					entryId={''}
					entries={{}}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={''}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );

	it( 'Match snapshot with form and entry selected only',() => {
		expect(
			renderer.create(
				<Inline
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={''}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();

	});

	it( 'Match snapshot with all props set',() => {
		expect(
			renderer.create(
				<Inline
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={entryFieldId}
					before={beforeText}
					after={afterText}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );


	it( 'Match snapshot with render prop for ChooseEntryField passed',() => {
		expect(
			renderer.create(
				<Inline
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={entryFieldId}
					before={beforeText}
					after={afterText}
					setBefore={mockFn}
					setAfter={mockFn}
					ChooseEntryField={<div>Hi Roy</div>}

				/>
			)
		).toMatchSnapshot();
	} );
});
describe( 'Controls component', ()  => {
	const mockFn = jest.fn();

	it( 'Match snapshot with just forms prop set',() => {
		expect(
			renderer.create(
				<Controls
					entryId={''}
					entries={{}}
					onSetEntry={mockFn}
					formId={''}
					forms={forms}
					form={{}}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={entryFieldId}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );

	it( 'Match snapshot with form selected only',() => {
		expect(
			renderer.create(
				<Controls
					entryId={''}
					entries={{}}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={''}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );

	it( 'Match snapshot with form and entry selected only',() => {
		expect(
			renderer.create(
				<Controls
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={''}
					before={''}
					after={''}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();

	});

	it( 'Match snapshot with all props set',() => {
		expect(
			renderer.create(
				<Controls
					entryId={entryId}
					entries={entries}
					onSetEntry={mockFn}
					formId={formId}
					forms={forms}
					form={form}
					onSetForm={mockFn}
					instanceId={instanceId}
					onSetField={mockFn}
					entryFieldId={entryFieldId}
					before={beforeText}
					after={afterText}
					setBefore={mockFn}
					setAfter={mockFn}

				/>
			)
		).toMatchSnapshot();
	} );
});

