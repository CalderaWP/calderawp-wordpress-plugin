// @flow

import React, {Component, Fragment} from 'react';
import type {EntryField} from "../../flow-types/entryTypes";

export const EntryFieldView = (props: {entryField: EntryField}) => {
	return <Fragment>{props.entryField.value}</Fragment>
};

