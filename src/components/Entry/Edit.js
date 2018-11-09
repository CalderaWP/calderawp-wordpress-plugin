import React from 'react';
import type {EditProps} from "./types";
import type {Node} from 'react';
import Inline from './Edit/Inline';
import Controls from './Edit/Controls';
import {InspectorControls} from "@wordpress/editor";//should be a render prop

export default function (props: EditProps): Node {
	return (
		<React.Fragment>
			<InspectorControls>
				<Controls {...props}/>
			</InspectorControls>
			<Inline {...props}/>
		</React.Fragment>
	);
}


