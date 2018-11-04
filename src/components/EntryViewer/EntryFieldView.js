// @flow

import React, {Fragment} from 'react';
import type {EntryField} from "../../flow-types/entryTypes";

export const EntryFieldView = (props: {
	entryField: EntryField,
	fieldType: string
}) => {
	return <Fragment>{props.entryField.value}</Fragment>
};

