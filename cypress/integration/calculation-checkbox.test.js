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
	cfFieldIsNotDisabled, cfFieldCheckAllValues, cfFieldGetCalcFieldValueIs
} from '../support/util';


describe('Calculations - With Checkbox', () => {
	beforeEach(() => {
		visitPage('calculations-checkbox');
	});

	const formId = 'CF5bc26604eaf3c';
	const calc1 = 'fld_3364767';
	const calc2 = 'fld_6418208';
	const calc3 = 'fld_522650';
	const calc4 = 'fld_1629134';
	const checkbox1 = 'fld_3100099';
	const checkbox2 = 'fld_5764774';
	const hideCheck = 'fld_2526988';

	it( 'starts at zero', () => {
		cfFieldGetCalcFieldValueIs(calc1, '0.00' );
		cfFieldGetCalcFieldValueIs(calc2, '0' );
		cfFieldGetCalcFieldValueIs(calc3, '0.00' );
		cfFieldGetCalcFieldValueIs(calc4, '0' );
	});

	it( 'adds up checkbox', () => {

		cfFieldCheckValue(checkbox1, '1');
		cfFieldGetCalcFieldValueIs(calc1, '1.00' );
		cfFieldGetCalcFieldValueIs(calc2, '1' );
		cfFieldGetCalcFieldValueIs(calc3, '1.00' );
		cfFieldGetCalcFieldValueIs(calc4, '1' );

		cfFieldCheckValue(checkbox1, '2');
		cfFieldGetCalcFieldValueIs(calc1, '3.00' );
		cfFieldGetCalcFieldValueIs(calc2, '3' );
		cfFieldGetCalcFieldValueIs(calc3, '3.00' );
		cfFieldGetCalcFieldValueIs(calc4, '3' );

		cfFieldCheckValue(checkbox1, '3');
		cfFieldGetCalcFieldValueIs(calc1, '6.00' );
		cfFieldGetCalcFieldValueIs(calc2, '6' );
		cfFieldGetCalcFieldValueIs(calc3, '6.00' );
		cfFieldGetCalcFieldValueIs(calc4, '6' );

		cfFieldUnCheckValue(checkbox1, '2');
		cfFieldGetCalcFieldValueIs(calc1, '4.00' );
		cfFieldGetCalcFieldValueIs(calc2, '4' );
		cfFieldGetCalcFieldValueIs(calc3, '4.00' );
		cfFieldGetCalcFieldValueIs(calc4, '4' );

	});

	it( 'adds up two checkbox fields', () => {

		cfFieldCheckValue(checkbox1, '1');
		cfFieldGetCalcFieldValueIs(calc1, '1.00' );
		cfFieldGetCalcFieldValueIs(calc2, '1' );
		cfFieldGetCalcFieldValueIs(calc3, '1.00' );
		cfFieldGetCalcFieldValueIs(calc4, '1' );

		cfFieldCheckValue(checkbox2, '10002');
		cfFieldGetCalcFieldValueIs(calc1, '11.00' );
		cfFieldGetCalcFieldValueIs(calc2, '11.002' );
		cfFieldGetCalcFieldValueIs(calc3, '11.00' );
		cfFieldGetCalcFieldValueIs(calc4, '11.002' );

		cfFieldCheckValue(checkbox2, '10003');
		cfFieldGetCalcFieldValueIs(calc1, '21.01' );
		cfFieldGetCalcFieldValueIs(calc2, '21.005000000000003' );
		cfFieldGetCalcFieldValueIs(calc3, '21.01' );
		cfFieldGetCalcFieldValueIs(calc4, '21.005000000000003' );


	});

	it( 'Does not add hidden checkbox', () => {
		cfFieldCheckValue(checkbox1, '2');
		cfFieldCheckValue(checkbox2, '10001');
		cfFieldGetCalcFieldValueIs(calc1, '12.00' );
		cfFieldGetCalcFieldValueIs(calc2, '12.001' );
		cfFieldGetCalcFieldValueIs(calc3, '12.00' );
		cfFieldGetCalcFieldValueIs(calc4, '12.001' );

		cfFieldCheckValue(hideCheck, 'Yes' );
		cfFieldGetCalcFieldValueIs(calc1, '10.00' );
		cfFieldGetCalcFieldValueIs(calc2, '10.001' );
		cfFieldGetCalcFieldValueIs(calc3, '10.00' );
		cfFieldGetCalcFieldValueIs(calc4, '10.001' );

		cfFieldUnCheckValue(hideCheck, 'Yes' );
		cfFieldGetCalcFieldValueIs(calc1, '12.00' );
		cfFieldGetCalcFieldValueIs(calc2, '12.001' );
		cfFieldGetCalcFieldValueIs(calc3, '12.00' );
		cfFieldGetCalcFieldValueIs(calc4, '12.001' );

	});
});