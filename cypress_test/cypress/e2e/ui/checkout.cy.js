describe('Flujo completo de compra', () => {
  beforeEach(() => {
    cy.login();

    // Agregar producto al carrito
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#shopping_cart_container').click()
    cy.get('#checkout').click()
  })

  it('Validar formulario de Checkout y realizar compra completa', () => {
    // Intentar continuar sin llenar datos
    cy.get('#continue').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Error: First Name is required')

    // Llenar formulario
    cy.get('#first-name').type('Evelyn')
    cy.get('#last-name').type('Osman')
    cy.get('#postal-code').type('12345')

    // Verificar botones visibles
    cy.get('#cancel').should('be.visible')
    cy.get('#continue').should('be.visible')

    // Click en Cancel y verificar URL
    cy.get('#cancel').click()
    cy.url().should('include', 'cart.html')

    // Reingresar al flujo de checkout
    cy.get('#checkout').click()
    cy.get('#first-name').type('Evelyn')
    cy.get('#last-name').type('Osman')
    cy.get('#postal-code').type('12345')
    cy.get('#continue').click()

    // Validar redirección a Overview
    cy.url().should('include', 'checkout-step-two.html')
    cy.get('.title').should('have.text', 'Checkout: Overview')

    // Validar nombre del producto y precio
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')
    cy.contains('.inventory_item_price', '$29.99').should('be.visible')

    // Validar textos informativos
    cy.contains('Payment Information:').should('be.visible')
    cy.contains('Shipping Information:').should('be.visible')
    cy.contains('Price Total').should('be.visible')

    // Validar subtotales
    cy.contains('.summary_subtotal_label', 'Item total: $29.99').should('be.visible')
    cy.contains('.summary_tax_label', 'Tax: $2.40').should('be.visible')
    cy.contains('.summary_total_label', 'Total: $32.39').should('be.visible')

    // Finalizar compra
    cy.get('#finish').click()

    // Validar página de confirmación
    cy.url().should('include', 'checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('[data-test="complete-header"]')
      .should('contain', 'Thank you for your order!')

    // Validar botón y logo final
    cy.get('[data-test="back-to-products"]').should('be.visible')
    cy.get('#checkout_complete_container > img').should('be.visible')
  })
})
