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
		visitPage('x2-calculations-create1-5-5-dev1-5-6-2');
	});

	const formId = 'cf111';


	function testInitialLoad() {
		//Define how it loads here
	}

	it( 'Has the correct initial load', () => {
		testInitialLoad();
	});
	it( 'Does something else', () => {
		testInitialLoad();
		//test form
	});

});