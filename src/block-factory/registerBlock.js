import {registerBlockType} from '@wordpress/blocks'
import type {block} from "./types";
export default function registerBlock(block:block,namespace:string){
	delete block.wpDependencies;
	delete block.slug;
	return registerBlockType(
		`${namespace}/${block.slug}`,
		block
	)
}