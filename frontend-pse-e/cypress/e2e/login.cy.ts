describe('Login service', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it ('should have a title', () => {
    cy.get('a[href="http://localhost:5000/auth/login"]').should('contain.text', 'Go to your courses');
    cy.get('a[href="http://localhost:5000/auth/login"]').click();
    cy.origin('https://login.canvas.uva.nl', () => {
      cy.get('[data-testid="button-uva-login"]').click();
  });
  cy.origin('https://login.uva.nl', () => {
    const username = Cypress.env('username');
      cy.get('#userNameInput').type(username);
      const password = Cypress.env('password');
      cy.get('#passwordInput').type(password);
      cy.get('#submitButton').click();
  });
  cy.wait(5000);
  cy.origin('https://uvadlo-dev.test.instructure.com', () => {
    cy.get('input[name="commit"]').click();
  });
  cy.url().should('include', 'courses');

  });
})

export {};