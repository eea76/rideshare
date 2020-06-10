describe('The database client', function () {
  // new
  beforeEach(function () {
    cy.fixture('data/users.json').then((users) => {
      cy.task('tableInsert', {
        table: 'trips_user', rows: users, truncate: true
      }).then((ids) => {
        cy.wrap(ids).should('have.length', 2);
      });
    });
  });

  // new
  it('can read data from a table', function () {
    cy.task('tableSelect', {
      table: 'trips_user'
    }).then((users) => {
      cy.wrap(users).should('have.length', 2);
    })
  });
});
