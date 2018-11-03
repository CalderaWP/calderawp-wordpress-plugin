import React from 'react';
import type {EditProps} from "../types";
import NameEdit from './NameEdit';
import type {Node} from 'react'

export default function (props: EditProps): Node {
	return (
		<React.Fragment>
			<NameEdit {...props} />
		</React.Fragment>
	);
}


