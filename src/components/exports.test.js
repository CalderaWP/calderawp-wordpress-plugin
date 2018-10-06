import {
	HelloEdit,
	HelloDisplay,
	HelloInlineEdit,
	HelloControlsEdit
}  from './Hello';


describe( 'Hello Export', () => {
	it( 'exports edit', () => {
		expect(typeof HelloEdit).toBe( 'function' )
	});

	it( 'exports display', () => {
		expect(typeof HelloDisplay).toBe( 'function' )
	});

	it( 'exports edit', () => {
		expect(typeof HelloInlineEdit).toBe( 'function' )
	});

	it( 'exports display', () => {
		expect(typeof HelloControlsEdit).toBe( 'function' )
	});
});