/**
 * Get site details
 * @type {any}
 */
export const site = Cypress.env( 'wp_site' );
export const {url,user,pass} = site;

export const login = () => {
	cy.visit( url + '/wp-login.php' );
	cy.wait( 500 );
	cy.get( '#user_login' ).type( user );
	cy.get( '#user_pass' ).type( pass );
	cy.get( '#wp-submit' ).click();
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
	};
};
/**
 * Go to a plugin page
 * @param {string} pluginSlug
 */
export const visitPluginPage = (pluginSlug) => {
	cy.visit(`${url}/wp-admin/admin.php?page=${pluginSlug}`);
};