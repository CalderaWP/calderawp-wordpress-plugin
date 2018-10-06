import React from 'react';
import type {EditProps} from "../types";
import SalutationEdit from './SalutationEdit';
import type {Node} from 'react'

export default function (props: EditProps): Node {
	return (
		<React.Fragment>
			<SalutationEdit  {...props}/>
		</React.Fragment>
	);
}