describe('[E2E]: Dashboard', () => {
  it('render login page with default components', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()

    cy.get('[alt="Logo"]').should('be.visible')
    cy.get('button').contains('Logout').should('be.enabled')
    cy.get('input[name="searchList"]').should('be.enabled')
    cy.get('div').contains('Total items').should('be.visible')
    cy.get('div').contains('Items per page').should('be.visible')
    cy.get('div').contains('Previous page').should('be.visible').and('be.disabled')
    cy.get('div').contains('Next page').should('be.visible').and('be.enabled')
    cy.get('div').contains('1/2').should('be.visible')
  })
})