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
		visitPage('x1-calculations-create1-5-5-dev1-5-6-2');
	});

	const formId = 'CF59dd5d8e95ffb';
	const totalCalc = 'fld_6617658';
	const option1Select = 'fld_8172473';
	const option2Select = 'fld_8186270';

	function testInitialLoad() {
		cfFieldGetCalcFieldValueIs(totalCalc, '0.00');

	}

	it( 'Has the correct initial load', () => {
		testInitialLoad();
	});

	it( 'Updates and does math correctly', () => {
		testInitialLoad();

		cfFieldSelectValue(option1Select, '4' );
		cfFieldGetCalcFieldValueIs(totalCalc, '4.28');

		cfFieldSelectValue(option2Select, 'Two' );
		cfFieldGetCalcFieldValueIs(totalCalc, '5.32');

		cfFieldSelectValue(option1Select, '4' );
		cfFieldGetCalcFieldValueIs(totalCalc, '4.28');
	});

});