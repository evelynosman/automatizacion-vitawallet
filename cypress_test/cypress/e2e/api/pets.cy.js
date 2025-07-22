describe('API - CRUD de Mascotas en Swagger Petstore', () => {
  let petId

  it('POST - Crear nueva mascota', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        category: { id: 1, name: 'test' },
        name: 'test',
        photoUrls: ['test'],
        tags: [{ id: 1, name: 'tagtest' }],
        status: 'available'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      petId = res.body.id
      cy.log('ID creado:', petId)
    })
  })

  it('GET - Buscar mascotas por estado "available"', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
      headers: {
        accept: 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array').and.not.be.empty
      cy.log('Respuesta:', res.body)
    })
  })

  it('GET - Fallo al buscar mascota con ID inexistente', () => {
    const nonExistentId = 999999999999999
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${nonExistentId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.message).to.eq('Pet not found')
    })
  })

it('PUT - Actualizar mascota por ID', () => {
  const petUpdate = {
    id: petId,
    category: {
      id: 0,
      name: 'testupdate'
    },
    name: 'doggie',
    photoUrls: ['test'],
    tags: [
      {
        id: 0,
        name: 'testupdate'
      }
    ],
    status: 'available'
  }

  cy.request({
    method: 'PUT',
    url: 'https://petstore.swagger.io/v2/pet',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: petUpdate
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.id).to.eq(petUpdate.id)
    expect(response.body.name).to.eq('doggie')
    expect(response.body.category.name).to.eq('testupdate')
  })
})

it('PUT - Error al actualizar mascota con ID no numérico (string)', () => {
  const invalidBody = {
    id: "test",
    category: {
      id: 0,
      name: "testupdate"
    },
    name: "doggie",
    photoUrls: ["test"],
    tags: [
      {
        id: 0,
        name: "testupdate"
      }
    ],
    status: "available"
  }

  cy.request({
    method: 'PUT',
    url: 'https://petstore.swagger.io/v2/pet',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: invalidBody,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(500)
    expect(response.body.message).to.include('something bad happened')
  })
})

  it('DELETE - Eliminar mascota por ID', () => {
    expect(petId, 'ID para eliminar').to.exist

    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      headers: { accept: 'application/json' }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.code).to.eq(200)
      expect(res.body.message).to.eq(`${petId}`)
    })
  })

it('DELETE - Error al intentar eliminar un ID que ya fue eliminado', () => {
  cy.request({
    method: 'DELETE',
    url: `https://petstore.swagger.io/v2/pet/${petId}`,
    headers: { accept: 'application/json' },
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status).to.eq(404)
  })
})

})
