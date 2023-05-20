describe('[E2E]: Details', () => {
  it('publication details page', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.contains('Login to continue').click()

    cy.get('a')
    .contains('Ads')
    .click()

    cy.url().should('contain', '82224')

    cy.get('h1')
      .contains('Project ID: 82224')
  })

  it('Link should back to dashboard page', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.contains('Login to continue').click()

    cy.get('a')
    .contains('Ads')
    .click()

    cy.get('a')
    .contains('svg', 'Back')
    .click()
    cy.url().should('contain', '/dashboard')
  })
})