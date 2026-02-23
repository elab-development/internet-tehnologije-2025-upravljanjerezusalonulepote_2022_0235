describe('Login proces - E2E Test', () => {
  it('uspešno se loguje kao admin i vidi naslov dashboarda', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin');

    cy.contains('Upravljanje svim rezervacijama').should('be.visible');
  });
});