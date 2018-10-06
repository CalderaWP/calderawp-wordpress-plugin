import '../../jest/matchMedia.mock'
import renderer from "react-test-renderer";
import React from "react";
import Save from './Save';
import Edit from './Edit';
import {InspectorControls} from '@wordpress/editor';


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