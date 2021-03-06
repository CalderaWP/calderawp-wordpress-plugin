import createBlockArgs, {findBlock} from './createBlockArgs';
import {createElement} from 'react';

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

describe( 'findBlock', () => {
	it( 'finds a block', () => {
		expect( findBlock( blocks.blocks[0].slug, blocks.blocks ) ).toEqual(blocks.blocks[0]);
	});
})
describe('createBlockArgs', () => {

	it('adds edit callback', () => {
		expect(typeof prepared.edit).toBe('function');
	});
	it('adds save callback', () => {
		expect(typeof prepared.save).toBe('function');
	});
	it('adds missing icon ', () => {
		expect( prepared.icon).toBe('smiley');
	});
	it('Does not ovveride icon when passed  ', () => {
		const prepared = createBlockArgs(
			{
				...theBlock,
				icon: 'contact'
			},
			blocks.namespace,
			Edit,
			Save
		);
		expect( prepared.icon).toBe('contact');
	});

	it('adds missing category ', () => {
		expect( prepared.category).toBe('common');
	});
	it('Does not ovveride category when passed  ', () => {
		const prepared = createBlockArgs(
			{
				...theBlock,
				category: 'widget'
			},
			blocks.namespace,
			Edit,
			Save
		);
		expect( prepared.category).toBe('widget');
	});

	it( 'deletes slug and wp depencies', () => {
		expect( prepared.hasOwnProperty( 'wpDependencies' ) ).toBe(false);
		expect( prepared.hasOwnProperty( 'slug' ) ).toBe(false);
	});


	it('Matches snapshot', () => {
		expect(JSON.stringify(prepared)).toMatchSnapshot();
	});
});
