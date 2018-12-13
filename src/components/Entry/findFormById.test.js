import {findFormById} from "./findFormById";

const _forms = require( '../../__MOCK_DATA__/forms' );
const forms = Object.values(_forms);
describe( 'finding form by ID', () => {
	it( 'finds a form', () => {
		expect( typeof findFormById(forms, 'CF5bde22a843265' ) ).toBe( 'object' );
	});

	it( 'Does not find a form', () => {
		expect(  findFormById(forms, 'sdfsadlsa' ) ).toBe( undefined );
	});
});
