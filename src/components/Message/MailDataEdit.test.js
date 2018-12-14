import React from "react";
import renderer from "react-test-renderer";
import "@babel/polyfill";
import {MailDataView} from "./MailDataView";
import {MailDataEdit} from "./MailDataEdit";

const mailData = {
	attachments: [],

	bcc: false,

	csv: false,
	from: "test@test.com",
	from_name: "Caldera Forms Notification",
	html: true,
	message: "<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">Mike</div>\n<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">Pollock</div>\n<p><strong></strong></p>\n<div style=\"margin-bottom:20px;\">j…",
	recipients:
		['roy@hiroy.club','alsoroy@hiroy.club'],
	replyto: "test@test.com",
	subject: "Contact Form 1"
};
describe( 'MailDataEdit' , () => {
	it( 'matches snapshot', () => {
		expect(
			renderer.create(
				<MailDataEdit
					mailData={mailData}
					onEditMessage={jest.fn()}
					onChangeMailData={jest.fn()}
				/>

			).toJSON()
		).toMatchSnapshot()
	})
});
