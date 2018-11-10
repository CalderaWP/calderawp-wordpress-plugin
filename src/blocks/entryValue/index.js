import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import Edit from './Edit';
import Save from './Save';
import createBlockName from "../../block-factory/createBlockName";

const blockArgs = createBlockArgs(
	findBlock('entryValue', blocks),
	nameSpace,
	Edit,
	Save
);

export const ENTRY_VALUE_BLOCK_NAME = createBlockName(nameSpace,blockArgs.slug);
registerBlock(
	blockArgs, nameSpace
);
