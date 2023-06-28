
import 'cypress-file-upload';

describe('Login service', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000');
  // });
  it ('should have login and go to courses page', () => {
    cy.visit('http://localhost:3000');
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
  cy.url().should('include', '/courses')
  cy.wait(2000);
  cy.get('div.grid a:last').click();
  cy.wait(3000);
  cy.contains('New Assignment').click();
  cy.fixture('new_assignment').as('NewAssignment');
  cy.get("#assignment-name").type("Test Assignment");
  cy.get("#message").type("Test discription");
  cy.get("#grading_type").select("Percent");
  cy.get("#assignment-points").type("100");
  cy.get("#assignment-attempts").type("3");
  cy.get("#assignment-deadline").type("2025-06-30T00:00");
  cy.contains('Create Assignment').click();
  cy.get('a[href*="edit-assignment"]').last().click();
  cy.wait(1500);
  cy.get("#assignment-description").type("Test discription2");
  cy.contains('Save').click();
  cy.wait(1500);
  cy.get('a[href*="students"]').last().click();
  cy.url().as('return_address');
  cy.contains('Student view').click();
  cy.contains('Submit').click();
  cy.get('input[type="file"]').attachFile('./huiswerk.pdf');
  cy.wait(2000);
  cy.get('#default-checkbox').check();
  cy.wait(1000);
  cy.contains("Yes, I\'m sure").click();
  cy.wait(2000);
  cy.get('button.px-4.py-2.mr-2.inline-block.bg-gray-100.hover\\:bg-gray-200.text-gray-800.text-lg.font-medium.rounded-full')
  .click();
  cy.wait(300);
  // cy.get('button > svg[viewBox="0 0 24 24"]').last()
  // .click();
  // Click the last button in the div
cy.get('.px-4.mx-auto.sm\\:px-6.lg\\:px-8 button:last-child').last().click();
  cy.get('a[href*="user"]').first().click();
  cy.wait(2000);
  cy.contains('Assign badges').click();
  cy.wait(300);
  cy.get('button[title="Awarded for providing insightful and well-supported interpretations of data, texts, or research findings in their academic writing assignments."]').click();
  cy.wait(1000);
  cy.contains("Yes, I\'m sure").click();
  cy.wait(100);
  cy.contains('+').click();
  cy.contains('+').click();
  cy.contains('+').click();
  cy.contains('Submit Grade').click();
  cy.wait(500);
  cy.contains("Yes, I\'m sure").click();
  cy.wait(1000);
  cy.contains("Go back").click();
})
});
export {};