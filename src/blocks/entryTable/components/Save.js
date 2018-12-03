import {Title} from "./Title";
import React from "react";

export const ENTRY_TABLE_BLOCK_CLASSNAME = 'caldera-forms-entry-table-block';
export const Save =  ({attributes}) => {
	const {title,formId} = attributes;
	return <div class={ENTRY_TABLE_BLOCK_CLASSNAME} data-form={formId}>
		<Title title={title}/>
	</div>;
};

