import createBlockName from  './createBlockName'
describe( 'createBlockName', () => {

	it( 'is correct', () => {
		expect( createBlockName('namespace', 'roy') ).toBe('namespace/roy');
	});
});
