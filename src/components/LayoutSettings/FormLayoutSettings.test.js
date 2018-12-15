import React from "react";
import renderer from "react-test-renderer";
import {FormLayoutSettings} from "./FormLayoutSettings";
describe( 'Form layout settings', () => {
	const settings = {
		attach_pdf: false,
		pdf_link: 0,
		layout: 0,
		pdf_layout: 0,
		send_local: false,
		form_id: "CF5be77c7b45877",
		name: "Contact Form 1"
	};

	const layouts = [
		{
			ID: 2,
			title: 'Layout 2',
		},
		{
			ID: 3,
			title: 'Layout 3',
		}
	];

	it( 'matches snapshot', () => {
		expect(
			renderer.create(
				<FormLayoutSettings
					layouts={layouts}
					settings={settings}
					onChange={jest.fn()}
				/>

			).toJSON()
		).toMatchSnapshot()
	});
});
