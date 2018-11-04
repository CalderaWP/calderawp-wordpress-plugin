import React from 'react';
import type {EditProps} from "../types";

import type {Node} from 'react'
import {ChooseForm} from "../../controls/ChooseForm";
import {ChooseEntry} from "../../controls/ChooseEntry";

export default function (props: EditProps,): Node {
	const {forms,entries,formId,entryId,onSetForm,onSetEntry,instanceId} = props;
	return (
		<React.Fragment>
			<ChooseForm
				forms={forms}
				currentFormId={formId}
				onChange={onSetForm}
				instanceId={instanceId}
			/>
			<ChooseEntry
				entries={entries}
				currentEntry={entryId}
				onChange={onSetEntry}
				instanceId={instanceId}
			/>
		</React.Fragment>
	);
}