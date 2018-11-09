import type {DisplayProps} from "../../components/Hello/types";
import type {Node} from "react";
import {componentClassName} from "../../control-factory/componentClassName";
import React from "react";

export default function( props: DisplayProps) : Node {
	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			<span>{props.salutation}</span> <span>{props.name}</span>
		</div>
	);
}