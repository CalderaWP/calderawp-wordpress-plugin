import renderer from "react-test-renderer";
import React from "react";
import {
	HelloEdit,
	HelloDisplay
} from './index';

describe( "Display component", () => {
	it( "Matches snapshot", () => {
		expect(
			renderer.create(
				<HelloDisplay
					name={'Roy'}
				/>
			).toJSON()
		).toMatchSnapshot()
	});
});

describe( "Edit component", () => {
	it( "Matches snapshot", () => {
		expect(
			renderer.create(
				<HelloEdit
					name={'Roy'}
					label={'Change'}
					onChangeName={()=> {}}
				/>
			).toJSON()
		).toMatchSnapshot()
	});
});