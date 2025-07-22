describe('API - Crear Usuario', () => {
  it('POST - Crear usuario exitosamente', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        username: 'Evelyn',
        firstName: 'Evelyn.osman',
        lastName: 'Mosquera',
        email: 'Evelyn.osman97@gmail.com',
        password: 'Test123',
        phone: '3004919996',
        userStatus: 1
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('code', 200)
    })
  })
})
