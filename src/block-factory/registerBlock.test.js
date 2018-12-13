import createBlockArgs, {findBlock} from './createBlockArgs';
import {createElement} from 'react';
import registerBlock from './registerBlock';

const blocks = JSON.parse(`{
	"packageName": "calderaWordPressPlugin",
	"namespace": "caldera-wordpress-plugin",
	"blocks":
		[
			{
				"title" : "Say Hi",
				"slug": "hello",
				"wpDependencies": [
					"editor",
					"components"
				],
				"attributes" :{
					"name": {
						"type": "string",
						"default": "Roy"
					},
					"salutation": {
						"type": "string",
						"default": "Hi"
					}
				}
			}
		]
}`);


const Edit = (props) => {
	return createElement('div', {}, 'Edit Callback');
};

const Save = (props) => {
	return createElement('div', {}, 'Save Callback');
};

const theBlock = findBlock( 'hello', blocks.blocks );
const prepared = createBlockArgs(
	theBlock,
	blocks.namespace,
	Edit,
	Save
);



describe( 'registerBlock', () => {
	jest.mock('@wordpress/blocks');
	const block = registerBlock(prepared,blocks.namespace);


	it( 'returns well-formed object', () => {
		expect( typeof block ).toBe('object');
		expect( block.attributes.name.default).toBe( 'Roy' );
		expect( typeof block.edit).toBe( 'function' );
		expect( typeof block.save).toBe( 'function' );

	});
	it( 'Removed unheeded props', () => {
		expect( block.hasOwnProperty('slug')).toBe( false );
		expect( block.hasOwnProperty('wpDependencies')).toBe( false );
	});
});
