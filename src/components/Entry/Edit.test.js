import renderer from "react-test-renderer";
import React from "react";

import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
describe( 'NameEdit component', () => {
	it( 'matches snapshot', () => {
		expect(1).toBe(1);
	});

});