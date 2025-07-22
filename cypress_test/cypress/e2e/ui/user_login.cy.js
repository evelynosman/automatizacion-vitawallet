describe('Login en SauceDemo', () => {
  it('Debe mostrar el título "Swag Labs" en la pantalla de login', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('.login_logo').should('be.visible').and('contain.text', 'Swag Labs')
  })

  it('Login fallido con credenciales incorrectas', () => {
    cy.login('test', 'test')
    
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Username and password do not match any user')
  })

  it('Login exitoso con credenciales válidas', () => {
    cy.login()

    cy.get('.app_logo').should('be.visible').and('contain.text', 'Swag Labs')
    cy.get('.title').should('be.visible').and('contain.text', 'Products')
  })
})
