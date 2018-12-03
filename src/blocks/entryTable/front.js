import {ENTRY_TABLE_BLOCK_CLASSNAME} from './components/Save';
import React from 'react';
import {entryTableFactory} from "./entryTableFactory";

const load = () => {
	const elements = document.getElementsByClassName(ENTRY_TABLE_BLOCK_CLASSNAME);
	let count = 1;
	for (let parentEl of elements) {
		const formId = parentEl.dataset.form;
		const element = document.createElement('div');
		const id = ENTRY_TABLE_BLOCK_CLASSNAME + '-' + formId + '-' + count;
		element.id = id;
		parentEl.appendChild(element);
		entryTableFactory(formId, parentEl);
	}
};

document.addEventListener('DOMContentLoaded', load);

