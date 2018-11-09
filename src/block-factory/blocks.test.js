import "babel-polyfill"

import {blocks,blockDefinitions,nameSpace} from "./blocks";
import type {block} from "./types";

describe( 'namespace', () => {
	it( 'is correct', () => {
		expect(blockDefinitions.namespace).toEqual(nameSpace);
	});
});

describe( 'blocks', () => {
	it( 'Has the right number of blocks', () => {
		expect(blockDefinitions.blocks.length).toEqual(blocks.length);
	});
});