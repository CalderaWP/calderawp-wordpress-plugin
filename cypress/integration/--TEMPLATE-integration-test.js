import {
	visitPage,
	getCfField,
	clearCfField,
	cfFieldIsVisible,
	cfFieldDoesNotExist,
	cfFieldHasValue,
	cfFieldSelectValue,
	cfFieldSetValue,
	cfFieldCheckValue,
	cfFieldIsDisabled,
	cfFieldUnCheckValue,
	cfFieldIsNotDisabled,
	cfFieldCheckAllValues,
	cfFieldGetCalcFieldValueIs
} from '../support/util';


describe('Name of test', () => {
	beforeEach(() => {
		visitPage('hello-world');
	});

	const formId = 'cf111';


	it( 'Has the right title', () => {
		expect(1).equals(1);
		cy.get( '.entry-title' ).contains( 'Hello World' );
	});

	it( 'Does something', () => {
		expect(1).equals(1);
	});

});