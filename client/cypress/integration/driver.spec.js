const logIn = () => {
    const { username, password } = Cypress.env('driver');
    cy.server();
    cy.route('POST', '**/api/log_in/').as('logIn');
    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Log in').click();
    cy.wait('@logIn');
};

describe('The driver dashboard', function () {
  before(function () {
    cy.loadUserData();
  })

  it('Cannot be visited if the user is not a driver', function () {
    const { username, password } = Cypress.env('rider')

    // Capture API calls.
    cy.server()
    cy.route('POST', '**/api/log_in/').as('logIn')

    // Log in.
    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, { log: false })
    cy.get('button').contains('Log in').click()
    cy.hash().should('eq', '#/')
    cy.get('button').contains('Log out')
    cy.wait('@logIn')

    cy.visit('/#/driver')
    cy.hash().should('eq', '#/')
  })

  it('Can be visited if the user is a driver', function () {
    logIn();

    cy.visit('/#/driver')
    cy.hash().should('eq', '#/driver')
  })
})
