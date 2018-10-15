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

	const formId = 'CF59dd15667a03b';
	const totalCalc = 'fld_8997460';
	const option1Checkbox = 'fld_3993413';
	const option2Select = 'fld_5161425';




	function testInitialLoad() {
		cfFieldGetCalcFieldValueIs(totalCalc, '25.00');

	}

	it( 'Has the correct initial load', () => {
		testInitialLoad();
	});

	it( 'Updates and does math correctly', () => {
		testInitialLoad();
		cfFieldCheckValue(option1Checkbox, 'Yes' );
		cfFieldGetCalcFieldValueIs(totalCalc, '35.00');

		cfFieldSelectValue(option2Select, 'Big' );
		cfFieldGetCalcFieldValueIs(totalCalc, '40.00');

		cfFieldUnCheckValue(option1Checkbox, 'Yes' );
		cfFieldGetCalcFieldValueIs(totalCalc, '30.00');

		cfFieldSelectValue(option2Select, 'Small' );
		cfFieldGetCalcFieldValueIs(totalCalc, '26.00');



	});

});