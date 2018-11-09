import renderer from "react-test-renderer";
import React from "react";
import {
	HelloEdit,
	HelloDisplay
} from './index';

describe.skip( "Display component", () => {
	it.skip( "Matches snapshot", () => {
		expect(
			renderer.create(
				<HelloDisplay
					name={'Roy'}
				/>
			).toJSON()
		).toMatchSnapshot()
	});
});

describe.skip( "Edit component", () => {
	it.skip( "Matches snapshot", () => {
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