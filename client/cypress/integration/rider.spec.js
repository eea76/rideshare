const logIn = () => {
    const { username, password } = Cypress.env('rider');
    cy.server();
    cy.route('POST', '**/api/log_in/').as('logIn');
    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Log in').click();
    cy.wait('@logIn');
};

describe('The rider dashboard', function() {
    before(function() {
        cy.loadUserData();
    })

    it('Cannot be visited if the user is not a rider', function () {
        const { username, password } = Cypress.env('driver')

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

        cy.visit('/#/rider')
        cy.hash().should('eq', '#/')
    })

    it('Can be visited if the user is a rider', function () {
        const { username, password } = Cypress.env('rider')

        logIn();
        cy.visit('/#/rider')
        cy.hash().should('eq', '#/rider')
    })
})
