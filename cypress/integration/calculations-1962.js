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
		visitPage('1962-calculations-created1-5-5-dev1-5-6-2');
	});

	const formId = 'cf111';
	const dropDownCalc = 'fld_5181257';
	const checkboxCalc = 'fld_693890';
	const radioCalc = 'fld_7680820';
	const selectsDividedByCalc = 'fld_578758';
	const numberField = 'fld_5656420';
	const dropdown = 'fld_3296542';
	const radio = 'fld_105161';

	function testInitialLoad() {
		cfFieldGetCalcFieldValueIs(dropDownCalc, '200');
		cfFieldGetCalcFieldValueIs(checkboxCalc, '100');
		cfFieldGetCalcFieldValueIs(radioCalc, '100');
		cfFieldGetCalcFieldValueIs(selectsDividedByCalc, '400');
	}

	it( 'Has the right initial load', () => {
		testInitialLoad();
	});

	it( 'Does the math correctly after intial load', () => {
		testInitialLoad();
		cfFieldSetValue(numberField,-10);
		cfFieldGetCalcFieldValueIs(selectsDividedByCalc, '-40');

		cfFieldSelectValue(dropdown, '10' );
		cfFieldGetCalcFieldValueIs(dropDownCalc, '100' );
		cfFieldGetCalcFieldValueIs(selectsDividedByCalc, '-30' );

		cfFieldCheckValue(radio,'20' );
		cfFieldGetCalcFieldValueIs(radioCalc, '200');
		cfFieldGetCalcFieldValueIs(selectsDividedByCalc, '-40');

	});

});