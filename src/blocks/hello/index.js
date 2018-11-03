import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import Edit from './Edit';
import Save from './Save';
const a = 1;
registerBlock(
	createBlockArgs(
		findBlock('hello',blocks),
		nameSpace,
		Edit,
		Save
	),
	nameSpace

)

