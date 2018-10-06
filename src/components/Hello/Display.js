// @flow

import React from 'react';
import type {DisplayProps} from "./types";
import type {Node}from 'react'
import {componentClassName} from "../../control-factory/componentClassName";
import {TextControl} from "@wordpress/components";

export default function( props: DisplayProps) : Node {
	return (
		<div
			className={componentClassName('hello', 'salutation--name', 'display')}
		>
			{props.salutation} {props.name}
		</div>
	);
}
