import renderer from "react-test-renderer";
import React from "react";
import {EntryActions} from "./EntryActions";

describe( 'EntryActions component ', () => {
	const onView =jest.fn();
	const onDownload =jest.fn();
	const onResend =jest.fn();
	test('EntryActions matches snapshot', () => {
		expect(
			renderer.create(
				<EntryActions
					onView={onView}
					onResend={onResend}
					onDownload={onDownload}
				/>
			)
		).toMatchSnapshot();
	});

});
