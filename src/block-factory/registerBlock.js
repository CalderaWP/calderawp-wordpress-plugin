// @flow
import createBlockName from './createBlockName'
import {registerBlockType} from '@wordpress/blocks'
import type {block} from "./types";
let hasRegistered = {};
export default function registerBlock(block:block,namespace:string){
	const name = createBlockName(namespace,block.slug);
	if( hasRegistered.hasOwnProperty(name)){
		return;
	}
	hasRegistered[name]=true;
	delete block.wpDependencies;
	delete block.slug;
	return registerBlockType(
		name,
		block
	);
}
