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
describe('Conditionals - show type - text fields', () => {
	beforeEach(() => {
		visitPage('conditional-show-test');
	});

	const controlField = 'fld_471602';
	const controlField2 = 'fld_4533316';
	const textField = 'fld_6735870';
	const textFieldWithDefault = 'fld_8484460';

	const textFieldAsNumber = 'fld_2782690';
	const textFieldAsNumberWithDefault = 'fld_9936249';

	const button1 = 'fld_8729978';
	const button2 = 'fld_8576859';

	const showMaskedInput = 'fld_53474';
	const maskedInput = 'fld_7507195';


	it( 'Does not show the fields that are not shown by default', () => {
		cfFieldDoesNotExist(textField);
		cfFieldDoesNotExist(textFieldWithDefault);

		cfFieldDoesNotExist(textFieldAsNumber);
		cfFieldDoesNotExist(textFieldAsNumberWithDefault);

		cfFieldDoesNotExist(maskedInput);
	});



	it('Show and update values of regular text fields', () => {
		cfFieldSelectValue(controlField,'showText');
		cfFieldIsVisible(textField);
		cfFieldIsVisible(textFieldWithDefault);

		cfFieldDoesNotExist(textFieldAsNumber);
		cfFieldDoesNotExist(textFieldAsNumberWithDefault);


		const newValue = '! R%oœnom s 8 oõeê';
		cfFieldSetValue(textField,newValue);
		cfFieldSelectValue(controlField,'showNone');
		cfFieldSelectValue(controlField,'showText');
		cfFieldHasValue(textField,newValue);

	});

	it('Show and update values of number-like text fields', () => {
		cfFieldSelectValue(controlField,'showNumber');
		cfFieldIsVisible(textFieldAsNumber);
		cfFieldIsVisible(textFieldAsNumberWithDefault);

		cfFieldDoesNotExist(textField);
		cfFieldDoesNotExist(textFieldWithDefault);

		const newValue = -42;
		cfFieldSetValue(textFieldAsNumber,newValue);
		cfFieldSelectValue(controlField,'showNone');
		cfFieldSelectValue(controlField,'showNumber');
		cfFieldHasValue(textFieldAsNumber,newValue);
		cfFieldHasValue(textFieldAsNumberWithDefault,5);

	});


	it( 'can show masked input and it works right', () => {
		const value = '11-ab-2a';
		cfFieldCheckValue(showMaskedInput, 'Yes');
		cfFieldIsVisible(maskedInput);
		cfFieldSetValue(maskedInput, value);

		//Hide it
		cfFieldCheckValue(showMaskedInput, 'No' );
		cfFieldDoesNotExist(maskedInput);

		//Show it
		cfFieldCheckValue(showMaskedInput, 'Yes' );
		cfFieldHasValue(maskedInput,value);

		//Attempt to set an invalid value
		getCfField(maskedInput).type( 'Roy' );
		cfFieldHasValue(maskedInput,value);

		//Set a valid value
		const newValue ='11-ar-3s';
		cfFieldSetValue(maskedInput,newValue);
		cfFieldHasValue(maskedInput,newValue);
		//set an invalid value
		getCfField(maskedInput,'1adadssada1');
		//still has good value
		cfFieldHasValue(maskedInput,newValue);
		//hide and show again to make sure it still has valid value
		cfFieldCheckValue(showMaskedInput, 'No' );
		cfFieldCheckValue(showMaskedInput, 'Yes' );
		cfFieldHasValue(maskedInput,newValue);
	});

});