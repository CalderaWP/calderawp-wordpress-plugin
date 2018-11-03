
import {Fragment,createElement} from '@wordpress/element';
import React from 'react';
import type {GutenbergSaveProps} from "../types";
const {InnerBlocks} = wp.editor;

export default function Save(props: GutenbergSaveProps) {


	return <InnerBlocks.Content />

}
