import "babel-polyfill"
import './jest/matchMedia.mock';
import {
	createBlockArgs,
	registerBlock,
	findBlock,
	blocks,
	nameSpace
} from './block-factory';

describe( 'block-factory export', () => {
	it( 'exports createBlockArgs', () => {
		expect( typeof createBlockArgs ).toBe('function' );
	});
	it( 'exports registerBlock', () => {
		expect( typeof registerBlock ).toBe('function' );
	});
	it( 'exports findBlock', () => {
		expect( typeof findBlock ).toBe('function' );
	});
	it( 'exports blocks', () => {
		expect( Array.isArray( blocks ) ).toBe(true );
	});

	it( 'exports nameSpace', () => {
		expect( typeof nameSpace ).toBe('string' );
	});
});