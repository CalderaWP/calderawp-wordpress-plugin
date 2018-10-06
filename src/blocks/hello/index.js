import {createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from '../../block-factory';
import Edit from './Edit';
import Save from './Save';
registerBlock(
	createBlockArgs(
		findBlock('name'),
		nameSpace,
		Edit,
		Save
	),
	nameSpace

)

