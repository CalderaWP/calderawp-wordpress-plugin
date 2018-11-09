import createBlockName from  './createBlockName'
describe( 'createBlockName', () => {

	it( 'is correct', () => {
		expect( createBlockName('namespace', 'roy') ).toBe('namespace/roy');
	});

	it( 'is lowercase', () => {
		expect( createBlockName('namespace', 'roySivan') ).toBe('namespace/roysivan');
	});
});
