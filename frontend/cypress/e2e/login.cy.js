describe('Login proces - E2E Test', () => {
  it('uspešno se loguje kao admin i vidi naslov dashboarda', () => {
    cy.visit('/login'); 
    cy.get('input[placeholder="Username"]').type('ilidza@admin.com');
    cy.get('input[placeholder="Password"]').type('lozinka123');
    cy.get('.btn-login').click();

    cy.url().should('include', '/admin-dashboard');
    cy.contains('Upravljanje svim rezervacijama').should('be.visible');
  });
});