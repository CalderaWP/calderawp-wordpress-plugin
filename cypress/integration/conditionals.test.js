import {
	visitPage,
	getCfField,
	clearCfField,
	cfFieldIsVisible,
	cfFieldDoesNotExist,
	cfFieldHasValue,
	cfFieldSelectValue,
	cfFieldSetValue
} from '../support/util';



/**
 * Tests for when conditions are hide type
 */
describe('Conditionals - hide type', () => {
	beforeEach(() => {
		visitPage('conditional-hide-test');
	});

	const controlField = 'fld_471602';
	const textField = 'fld_6735870';
	const textFieldWithDefault = 'fld_8484460';

	const textFieldAsNumber = 'fld_2782690';
	const textFieldAsNumberWithDefault = 'fld_9936249';
	it('Hide and update values of regular text fields', () => {
		//Set a value in text field and then hide text fields
		cfFieldSetValue(textField,'Mike');
		cfFieldSelectValue(controlField,'hideText');
		//Check that they are gone
		cfFieldDoesNotExist(textField);
		cfFieldDoesNotExist(textFieldWithDefault);

		//Unhide and check fields exist with the right values
		cfFieldSelectValue(controlField,'hideNone');
		cfFieldHasValue(textField, 'Mike');
		cfFieldHasValue(textFieldWithDefault, 'Hi Roy');

		//change both fields
		cfFieldSetValue(textField,'Mike 3@1!');
		cfFieldSetValue(textFieldWithDefault,'Röy');
		//hide them
		cfFieldSelectValue(controlField, 'hideText');
		//unhide them and check their values are still correct
		cfFieldSelectValue(controlField,'hideNone');
		cfFieldHasValue(textField, 'Mike 3@1!');
		cfFieldHasValue(textFieldWithDefault, 'Röy');

	});

	it('Hide and update values of number-like text fields', () => {
		//Set a value in text field and then hide text fields
		cfFieldSetValue(textFieldAsNumber,22);
		cfFieldSelectValue(controlField,'hideNumber');
		//Check that they are gone
		cfFieldDoesNotExist(textFieldAsNumber);
		cfFieldDoesNotExist(textFieldAsNumberWithDefault);

		//Unhide and check fields exist with the right values
		cfFieldSelectValue(controlField,'hideNone');
		cfFieldHasValue(textFieldAsNumber, 22);
		cfFieldHasValue(textFieldAsNumberWithDefault, 5 );

		//change both fields
		cfFieldSetValue(textFieldAsNumber,42);
		cfFieldSetValue(textFieldAsNumberWithDefault,-42);
		//hide them
		cfFieldSelectValue(controlField, 'hideNumber');
		//unhide them and check their values are still correct
		cfFieldSelectValue(controlField,'hideNone');
		cfFieldHasValue(textFieldAsNumber, 42);
		cfFieldHasValue(textFieldAsNumberWithDefault, -42 );
	});

	it('Can hide and unhide all', () => {
		//hide all
		cfFieldSelectValue(controlField,'hideAll');

		//Check that they are gone
		cfFieldDoesNotExist(textField);
		cfFieldDoesNotExist(textFieldWithDefault);
		cfFieldDoesNotExist(textFieldAsNumber);
		cfFieldDoesNotExist(textFieldAsNumberWithDefault);

		//unhide all
		cfFieldSelectValue(controlField,'hideNone');

		//Check field are not gone
		cfFieldIsVisible(textField);
		cfFieldIsVisible(textFieldWithDefault);
		cfFieldIsVisible(textFieldAsNumber);
		cfFieldIsVisible(textFieldAsNumberWithDefault);
	});
});