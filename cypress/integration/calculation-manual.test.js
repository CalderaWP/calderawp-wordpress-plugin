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


describe('Calculations - manual', () => {
	beforeEach(() => {
		visitPage('calculations-manual');
	});

	const formId = 'CF5bc26a30e6032';
	const calc1 = 'fld_4023263';
	const calc2 = 'fld_8621915';

	const num1 = 'fld_5324532';
	const num2 = 'fld_8094639';

	it( 'Has the right initial values', () => {
		expect(1).equals(1);
		cfFieldGetCalcFieldValueIs(calc1,'-1.8386476455831817');
		cfFieldGetCalcFieldValueIs(calc2,'-2');
		cfFieldSetValue(num1,101.01);
		cfFieldGetCalcFieldValueIs(calc1,'-1.0071353170445643');
		cfFieldGetCalcFieldValueIs(calc2,'-1');
		cfFieldSetValue(num1,22);
		cfFieldGetCalcFieldValueIs(calc1,'0.0193404636415895');
		cfFieldGetCalcFieldValueIs(calc2,'0');


	})
});