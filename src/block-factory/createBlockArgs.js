// @flow
import type {Node} from 'react';
import type {block} from "./types";


export const findBlock = (slug: string, blocks: Array<block>): ? block => {
	return blocks.find((b: block) => slug === b.slug);
};

/**
 * Create block arguments to pass to registerBlockType
 */
export default function createBlockArgs(block: block, namespace: string, edit: Node, save: Node) {
	let args = block;
	if (Object.keys(block.attributes).length) {
		//@TODO event here?
		args.attributes = block.attributes;
	}

	if (!block.hasOwnProperty('icon')) {
		block.icon = 'smiley';
	}

	if (!block.hasOwnProperty('category')) {
		block.category = 'common';
	}


	return {
		...args,
		edit,
		save
	}
}