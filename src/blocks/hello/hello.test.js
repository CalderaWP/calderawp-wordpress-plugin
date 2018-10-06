import '../../jest/matchMedia.mock'
import renderer from "react-test-renderer";
import React from "react";
import Save from './Save';
import Edit from './Edit';
import {InspectorControls} from '@wordpress/editor';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {componentClassName} from "../../control-factory/componentClassName";
Enzyme.configure({adapter: new Adapter()});

const attributeDefaults = {
	name: 'Roy',
	salutation: 'Hi'
};

describe('Edit callback for block', () => {


	let attributes = {};

	function setAttributes(newValues) {
		attributes = {
			...attributes,
			...newValues
		}
	}


	beforeEach(() => {
		attributes = attributeDefaults;
	});

	let className = 'a';

	it('mock set attributes works as expected', () => {
		setAttributes({name:'Mike'});
		expect( attributes.name).toBe( 'Mike' );
		expect( attributes.salutation).toBe( 'Hi' );
	});

	it('mock set attributes resets as expected', () => {
		setAttributes({salutation:'Hola'});
		expect( attributes.name).toBe( 'Roy' );
		expect( attributes.salutation).toBe( 'Hola' );
	});

	it( 'Matches snapshot when selected',() => {
		expect(
			renderer.create(
				<React.Fragment>
					<Edit
						attributes={attributeDefaults}
						setAttributes={setAttributes}
						className={'a'}
						isSelected={true}
					/>
					<InspectorControls.Slot />
				</React.Fragment>

			).toJSON()
		).toMatchSnapshot()
	});

	it( 'Matches snapshot when not selected',() => {
		expect(
			renderer.create(
				<React.Fragment>
					<Edit
						attributes={attributeDefaults}
						setAttributes={setAttributes}
						className={'a'}
						isSelected={false}
					/>
					<InspectorControls.Slot />
				</React.Fragment>

			).toJSON()
		).toMatchSnapshot()
	});


	it( 'Has usable name control',() => {
		const className = componentClassName('hello', 'name', 'edit');
		const component = mount(
			<React.Fragment>
				<Edit
					attributes={attributeDefaults}
					setAttributes={setAttributes}
					className={'a'}
					isSelected={true}
				/>
				<InspectorControls.Slot />
			</React.Fragment>
		);


		const event = {target: {value: "Mike"}};
		const input = component.children().find('.'+className).children().find('input');
		expect(input.length).toBe(1);
		input.simulate('change', event);
		expect(attributes.name).toBe('Mike');
	});






});

describe( 'Save callback for block', () => {
	it( 'Matches snapshot',() => {
		expect(
			renderer.create(
				<Save attributes={attributeDefaults} className={'a'}/>
			).toJSON()
		).toMatchSnapshot()
	})
});