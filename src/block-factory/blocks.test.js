import "babel-polyfill"
import '../jest/matchMedia.mock'

import {blocks,blockDefinitions,nameSpace} from "./blocks";
import type {block} from "./types";
import createBlockArgs from "./createBlockArgs";

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