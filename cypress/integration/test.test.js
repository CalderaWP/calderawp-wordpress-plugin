
const site = Cypress.env( "wp_site" );
const {url,user,pass} = site;


beforeEach(  () => {
	cy.visit( url + '/wp-login.php' );
	cy.wait( 500 );
	cy.get( '#user_login' ).type( user );
	cy.get( '#user_pass' ).type( pass );
	cy.get( '#wp-submit' ).click();
	cy.visit(  url + '/wp-admin/plugins.php');
	const slug = 'caldera-forms';
	const selector = 'tr[data-slug="' + slug + '"] .activate a';
	if (Cypress.$(selector).length > 0) {
		cy.get( selector ).click();
	};

} );



describe('My First Test', function() {
	it('Does not do much!', function() {
		expect(true).to.equal(true)
	});
});

describe( 'Caldera Forms admin main page', () => {
	beforeEach(  () => {
		cy.visit(  url + '/wp-admin/admin.php?page=caldera-forms');
	});
	it( 'New form', () => {
		cy.get('.cf-new-form-button').click();
		cy.wait(200);
		cy.get('input[value="starter_contact_form"]').click({force: true});
		const name = 'My New Contact Form';
		cy.get('input.new-form-name').type(name);
		cy.get('.cf-create-form-button').click();
		cy.url().should('include', 'edit')
		cy.get( '.caldera-element-type-label' ).contains(name);
	});
});