describe('[E2E]: Publication ID page', () => {
  it('render details page with default components', () => {
    cy.wait(5000)
    cy.get('a').contains('Name').click()

    cy.get('a').should('have.attr', 'href').and('contain', '/dashboard')
    cy.get('h1').contains('Project ID:')
    
    if (cy.get('div').contains('Category')) {
      cy.get('div').contains('Created at')
      cy.get('div').contains('Status')
    }
  })

  it('Link should back to dashboard page', () => {
    cy.wait(5000)

    cy.get('div.listItemTitle')
    .contains('Ads')
    .click()

    cy.get('a')
    .contains('svg', 'Back')
    .click()
    cy.url().should('contain', '/dashboard')
  })

  it('render project not found component', () => {
    cy.wait(5000)
    cy.get('div.listItemTitle')
    .contains('Another project')
    .click()

    cy.get('h1').contains('Project ID:')
    cy.get('h2').contains('Project details not found!')
  })
})