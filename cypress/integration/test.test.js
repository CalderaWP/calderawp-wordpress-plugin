const site = Cypress.env( "wp_site" );
const {url,user,pass} = site;

beforeEach( function() {
	cy.visit( url + '/wp-login.php' );
	cy.wait( 1000 );
	cy.get( '#user_login' ).type( user );
	cy.get( '#user_pass' ).type( pass );
	cy.get( '#wp-submit' ).click();
} );



describe('My First Test', function() {
	it('Does not do much!', function() {
		expect(true).to.equal(true)
	});
})