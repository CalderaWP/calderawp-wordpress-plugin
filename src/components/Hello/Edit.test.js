import renderer from "react-test-renderer";
import React from "react";
import NameEdit from  './NameEdit';
import SalutationEdit from  './SalutationEdit';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
describe( 'NameEdit component', () => {
	it( 'matches snapshot', () => {
		expect(
			renderer.create(
				<NameEdit
					name={'Roy'}
					onChangeName={() =>{}}
					nameControlLabel={'Name'}
				/>
			).toJSON()
		).toMatchSnapshot()
	});

	it( 'Has an input that can change', () => {
		let update = '';
		const component = mount(
			<NameEdit
				name={'Roy'}
				onChangeName={(name) =>{
					update=name;
				}}
				nameControlLabel={'Name'}
			/>
		);
		const event = {target: {value: "Mike"}};
		expect(component.children().find('input').length).toBe(1);
		component.children().find('input').simulate('change', event);
		expect(update).toBe('Mike');
	});

});

describe( 'SalutationEdit component', () => {
	it( 'matches snapshot', () => {
		expect(
			renderer.create(
				<SalutationEdit
					salutation={'Hi'}
					salutationControlLabel={'Salutation!'}
					onChangeSalutation={() => {}}
				/>
			).toJSON()
		).toMatchSnapshot()
	});

	it( 'Has an input that can change', () => {
		let update = '';
		const component = mount(
			<SalutationEdit
				salutation={'Hi'}
				salutationControlLabel={'Salutation!'}
				onChangeSalutation={(salutation) => {update = salutation;}}
			/>
		);
		const event = {target: {value: "Hola"}};
		expect(component.children().find('input').length).toBe(1);
		component.children().find('input').simulate('change', event);
		expect(update).toBe('Hola');
	});

});