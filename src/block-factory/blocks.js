import type {block} from "./types";
import createBlockArgs from "./createBlockArgs"
export const blockDefinitions = require( '../../blocks.json' );
export const nameSpace = blockDefinitions.namespace;
export const blocks : Array<block> = [];
blockDefinitions.blocks.forEach(
	(thisBlock:block) => {
		blocks.push(thisBlock)
	}
)