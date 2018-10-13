import {
	visitPage,
	getCfField,
	clearCfField,
	cfFieldIsVisible,
	cfFieldDoesNotExist,
	cfFieldHasValue,
	cfFieldSelectValue,
	cfFieldSetValue,
	cfFieldCheckValue
} from '../support/util';



/**
 * Tests for when conditions are hide type
 */
describe('Conditionals - hide type', () => {
	beforeEach(() => {
		visitPage('conditional-hide-test');
	});

	const controlField = 'fld_471602';
	const controlField2 = 'fld_4533316';
	const textField = 'fld_6735870';
	const textFieldWithDefault = 'fld_8484460';

	const textFieldAsNumber = 'fld_2782690';
	const textFieldAsNumberWithDefault = 'fld_9936249';

	const button1 = 'fld_8729978';
	const button2 = 'fld_8576859';

	const hideMaskedInput = 'fld_53474';
	const maskedInput = 'fld_7507195';

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

	it( 'can hide and show based on text value', () => {
		cfFieldSetValue(controlField2, 'Hide 1' );
		cfFieldDoesNotExist(button1);
		cfFieldIsVisible(button2);

		cfFieldSetValue(controlField2, 'Hide 2' );
		cfFieldIsVisible(button1);
		cfFieldDoesNotExist(button2);

		cfFieldSetValue(controlField2, 'Hi Roy' );
		cfFieldIsVisible(button1);
		cfFieldIsVisible(button2);

		cfFieldSetValue(controlField2, 'Hide Both' );
		cfFieldDoesNotExist(button1);
		cfFieldDoesNotExist(button2);
	});

	it( 'can hide masked input and it works right', () => {
		const value = '11-ab-2a';
		cfFieldSetValue(maskedInput, value);

		//Hide it
		cfFieldCheckValue(hideMaskedInput, 'Yes' );
		cfFieldDoesNotExist(maskedInput);

		//Show it
		cfFieldCheckValue(hideMaskedInput, 'No' );
		cfFieldHasValue(maskedInput,value);

		//Attempt to set an invalid value
		getCfField(maskedInput).type( 'Roy' );
		cfFieldHasValue(maskedInput,value);

		//Set a valid value
		const newValue ='11-ar-3s';
		cfFieldSetValue(maskedInput,newValue)
		cfFieldHasValue(maskedInput,newValue);
		getCfField(maskedInput,'1adadssada1');
		cfFieldHasValue(maskedInput,newValue);

	});
});