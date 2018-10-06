// @flow
import type {blocksDefinitions} from "./types";
import {blocks,nameSpace} from "./blocks";
import registerBlock from './registerBlock';

blocks.forEach(block => {
	registerBlock(block,nameSpace)
});