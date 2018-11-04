import React from 'react';
import type {EditProps} from "./types";
import type {Node} from 'react';
import Inline from './Edit/Inline';
import {
	EntryEdit,
	EntryDisplay,
	EntryInlineEdit,
	EntryControlsEdit
} from "../../components/Entry";

export default function (props: EditProps): Node {
	return (
		<React.Fragment>
			<Inline {...props}/>
			<Controls {...props}/>
		</React.Fragment>
	);
}


