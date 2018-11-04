// @flow

import React, {Fragment} from 'react';
import type {EntryField} from "../../flow-types/entryTypes";
export const EntryHeader = (props: {
	entryField: EntryField,
	labelWith: string
} ) => {
	const {entryField,labelWith} = props;
	const label = labelWith && labelWith.length ? labelWith : entryField.slug
	return (
		<Fragment>
			{label}
		</Fragment>

	);
};
