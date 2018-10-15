/**
 * Get site details
 * @type {any}
 */
export const site = Cypress.env('wp_site');
export const {url, user, pass} = site;
export const login = () => {
	cy.visit(url + '/wp-login.php');
	cy.wait(500);
	cy.get('#user_login').type(user);
	cy.get('#user_pass').type(pass);
	cy.get('#wp-submit').click();
};

/**
 * Activate a plugin
 * @param {string} pluginSlug
 */
export const activatePlugin = (pluginSlug) => {
	cy.visit(url + '/wp-admin/plugins.php');
	const selector = 'tr[data-slug="' + pluginSlug + '"] .activate a';
	if (Cypress.$(selector).length > 0) {
		cy.get(selector).click();
	}
	;
};
/**
 * Go to a plugin page
 * @param {string} pluginSlug
 */
export const visitPluginPage = (pluginSlug) => {
	cy.visit(`${url}/wp-admin/admin.php?page=${pluginSlug}`);
};

export const visitPage = (pageSlug) => {
	cy.visit(`${url}/${pageSlug}`);
};

/**
 * Get a Caldera Forms field by ID
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const getCfField = (fieldId) => {
	return cy.get(getCfFieldSelector(fieldId));
};

/**
 * Get the selector for a Caldera Forms field by ID
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {String}
 */
export const getCfFieldSelector = (fieldId) => {
	return `[data-field="${fieldId}"]`;
};

/**
 * Clear value of Caldera Forms field by ID
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const clearCfField = (fieldId) => {
	return getCfField(fieldId).clear();
};

/**
 * Check if Caldera Forms field is visible by ID
 *
 * Use: Check if field was unhidden by conditional logic.

 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldIsVisible = (fieldId) => {
	return getCfField(fieldId).should('be.visible');
};

/**v
 * Check if Caldera Forms field does NOT exist on DOM by field ID
 *
 * Use: Check if field was hidden by conditional logic.
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldDoesNotExist = (fieldId) => {
	return getCfField(fieldId).should('not.exist');
};

/**
 * Check if a Caldera Forms field exists and has a value, by field ID
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {String|Number} value Value to assert. Evaluated as string (numbers will be cast to string)
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldHasValue = (fieldId, value) => {
	if ('number' === typeof  value) {
		value = value.toString(10);
	}
	return getCfField(fieldId).should('have.value', value);
};

/**
 * Select an option of a Caldera Forms select field, by field ID
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {String} newValue Value to set
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldSelectValue = (fieldId, newValue) => {
	return getCfField(fieldId).select(newValue);
};


export const cfFieldIsValueSelected = (fieldId,value) => {
	return cfFieldOptionIsSelected(fieldId,value);
};


/**
 * Set new value for Caldera Forms text-like field, by field ID
 *
 * Note: clears field first
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {String} newValue Value to set
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldSetValue = (fieldId, newValue) => {
	return clearCfField(fieldId).type(newValue);
};

/**
 * Check value for Caldera Forms radio/checkbox, by field ID
 **
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {String} valueToCheck Value to set
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldCheckValue = (fieldId, valueToCheck) => {
	return getCfField(fieldId).check(valueToCheck);
};

/**
 * Check all values for Caldera Forms radio/checkbox, by field ID
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldCheckAllValues = (fieldId) => {
	return getCfField(fieldId).check();
};

/**
 * UnCheck value for Caldera Forms radio/checkbox, by field ID
 *
 * Note: clears field first
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {String} valueToCheck Value to set
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldUnCheckValue = (fieldId, valueToCheck) => {
	return getCfField(fieldId).uncheck(valueToCheck);
};

/**
 * Check if a Caldera Forms field is disabled, by field ID
 *
 * Use: Check if a field is disabled by conditional
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldIsDisabled = (fieldId) => {
	return getCfField(fieldId).should('be.disabled');
};

/**
 * Check if a Caldera Forms field is NOT disabled, by field ID
 *
 * Use: Check if a field is disabled by conditional
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const cfFieldIsNotDisabled = (fieldId) => {
	return getCfField(fieldId).not('be.disabled');
};

/**
 * Get the field ID attribute for a Caldera Forms field by field ID
 *
 * @param {String} fieldId CF Field ID, not ID attribute
 * @param {Number} formCount Optional. Form count, default is 1
 * @return {string}
 */
export const getCfFieldIdAttr = (fieldId, formCount = 1) => {
	return `${fieldId}_${formCount}`;
};

/**
 * Get the field ID attribute for a Caldera Form by form ID
 *
 * @param {String} formId CF Form ID, not ID attribute
 * @param {Number} formCount Optional. Form count, default is 1
 * @return {string}
 */
export const getCfFormIdAttr = (formId, formCount = 1) => {
	return `${formId}_${formCount}`;
};

export const cfFieldIsChecked = (fieldId, value ) => {
	expect(getCfField(fieldId)).not.to.be.checked
};

/**
 * Get a checkbox option for a Caldera Forms checkbox field, by field Id and option value.
 * @param fieldId
 * @param optionValue
 * @return {Cypress.Chainable<JQuery<HTMLElement>>}
 */
export const getCfCheckboxOption =(fieldId, optionValue) => {
	return cy.get(`input[data-field="${fieldId}"][value="${optionValue}"]`);
};

export const cfFieldOptionIsChecked = (fieldId, optionValue ) => {
	return getCfCheckboxOption(fieldId,optionValue).should('be.checked');
};

export const cfFieldOptionIsNotChecked = (fieldId, optionValue ) => {
	return getCfCheckboxOption(fieldId,optionValue).not('be.checked');
};

export const cfFieldOptionIsSelected = (fieldId, value ) => {

	return getCfField(fieldId).should('have.value', value);
};

export const cfFieldGetCalcFieldValueIs = (fieldId, value) => {
	return 	cy.get( `[data-calc-field="${fieldId}`).should('have.value', value);
};