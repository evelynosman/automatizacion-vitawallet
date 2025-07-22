describe('Agregar producto al carrito', () => {
  beforeEach(() => {
    cy.login();
  })

  it('Debe mostrar el producto "Sauce Labs Backpack" con precio correcto y permitir agregarlo al carrito', () => {
    // Validar nombre del producto visible
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
      .should('be.visible')

    // Validar precio del producto
    cy.get('[data-test="inventory-item-price"]')
      .contains('$29.99')
      .should('be.visible')

    // Click en "Add to cart"
    cy.get('#add-to-cart-sauce-labs-backpack')
      .should('be.visible')
      .click()

    // Verificar que el botón cambió a "Remove"
    cy.get('#remove-sauce-labs-backpack')
      .should('exist')
      .and('have.text', 'Remove')

      // Agregar segundo producto
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible')
    cy.contains('.inventory_item', 'Sauce Labs Bike Light')
      .find('[data-test="inventory-item-price"]')
      .should('have.text', '$9.99')
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#remove-sauce-labs-bike-light').should('have.text', 'Remove')
  // --- Ir al carrito ---
    cy.get('#shopping_cart_container').click()

    // --- Validar título "Your Cart" ---
    cy.contains('span.title', 'Your Cart').should('be.visible')

    // --- Validar nombres y precios de productos ---
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
      .parents('.cart_item')
      .find('.inventory_item_price')
      .should('have.text', '$29.99')

    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible')
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
      .parents('.cart_item')
      .find('.inventory_item_price')
      .should('have.text', '$9.99')

    // --- Validar cantidad = 1 por producto ---
    cy.get('.cart_quantity').each(($el) => {
      cy.wrap($el).should('have.text', '1')
    })


  })

  describe('Flujo de remover producto y validaciones de navegación en carrito', () => {
  beforeEach(() => {
    cy.login();

    // Agregar productos
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#shopping_cart_container').click()
  })

  it('Debe permitir remover un producto, navegar al detalle y validar navegación en carrito', () => {
    // Remover Sauce Labs Bike Light
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
      .parents('.cart_item')
      .find('button')
      .contains('Remove')
      .click()

    // Ir al detalle de Sauce Labs Backpack
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click()

    // Validar botón Remove en detalle
    cy.get('button').contains('Remove').should('be.visible')

    // Validar imagen del producto
    cy.get('#inventory_item_container img').should('be.visible')

    // Volver a productos con Back to Products
    cy.get('#back-to-products').click()

    // Entrar al carrito nuevamente 
    cy.get('#shopping_cart_container').click()

    // Click en Continue Shopping 
    cy.get('#continue-shopping').click()

    // Validar URL y título
    cy.url().should('include', 'inventory.html')
    cy.get('.title').should('have.text', 'Products')

    // Volver al carrito otra vez
    cy.get('#shopping_cart_container').click()

    // Click en Checkout
    cy.get('#checkout').click()

    // Validar título de Checkout
    cy.get('.title').should('have.text', 'Checkout: Your Information')
  })
})



})
