// @flow

import React from 'react';
import type {DisplayProps} from "./types";
import type {Node} from 'react'
import {componentClassName} from "../../control-factory/componentClassName";

export default function( props: DisplayProps) : Node {
	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			<span>{props.salutation}</span> <span>{props.name}</span>
		</div>
	);
}
