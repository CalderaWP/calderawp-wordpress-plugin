// @flow

import React from 'react';
import type {DisplayProps} from "./types";
import type {Node}from 'react'

export default function( props: DisplayProps) : Node{
	return (
		<div>
			{props.salutation} {props.name}
		</div>
	);
}
