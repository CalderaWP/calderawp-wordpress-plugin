// @flow
import createBlockName from './createBlockName'
import {registerBlockType} from '@wordpress/blocks'
import type {block} from "./types";
export default function registerBlock(block:block,namespace:string){
	const name = createBlockName(namespace,block.slug);
	delete block.wpDependencies;
	delete block.slug;
	return registerBlockType(
		name,
		block
	);
}
