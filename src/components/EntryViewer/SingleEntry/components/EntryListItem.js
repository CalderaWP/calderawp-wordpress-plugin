import {EntryHeader} from "../../EntryHeader";
import {Fragment} from "React";
import {EntryFieldView} from "../../EntryFieldView";
import React from "react";

export default function EntryListItem(entryField, labelWith, fieldType) {
	return <li key={entryField.id}>
		<strong>
			<EntryHeader
				entryField={entryField}
				labelWith={labelWith}
				fieldType={fieldType}
			/>
		</strong>
		<Fragment> : </Fragment>
		<EntryFieldView
			entryField={entryField}
			fieldType={fieldType}
		/>
	</li>;
}