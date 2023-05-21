describe('[E2E]: Login', () => {
  it('render login page with default components', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('[alt="Logo"]').should('be.visible')
    cy.get('button').contains('Login').should('be.enabled')
    cy.get('h1').contains('Hey there! 👋').should('be.visible')
    cy.get('button').contains('Login to continue').should('be.enabled')
  })

  it('click `Login` button should redirect to `dashboard` url', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()
    cy.url().should('contain', '/dashboard')
  })

  it('render a `Welcome` message toast notification', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()

    cy.get('div').contains('Welcome 👋').should('be.visible')
    cy.wait(5000)
    cy.get('div').contains('Welcome 👋').should('not.exist')
  })

  it('click `Login to continue` button should redirect to `dashboard` url', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login to continue').click()
    cy.url().should('contain', '/dashboard')
  })
})

describe('[E2E]: Logout', () => {
  it('click `Logout` button should redirect to `/` base url', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()
    cy.url().should('contain', '/dashboard')
    cy.get('button').contains('Logout').click()
    cy.url().should('contain', '/')
  })

  it('render a `Seeya` message toast notification', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()
    cy.get('button').contains('Logout').click()
    cy.get('div').contains('Seeya 👋').should('be.visible')
    cy.wait(5000)
    cy.get('div').contains('Seeya 👋').should('not.exist')
  })
})
