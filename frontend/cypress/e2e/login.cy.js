describe('Login proces - E2E Test', () => {
  it('uspešno se loguje kao admin i vidi naslov dashboarda', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('ilidza@admin.com');
    cy.get('input[name="password"]').type('lozinka123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin');

    cy.contains('Upravljanje svim rezervacijama').should('be.visible');
  });
});