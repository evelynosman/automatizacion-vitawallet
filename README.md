Este proyecto corresponde a una prueba técnica de automatización que incluye pruebas tanto de API como pruebas end-to-end (E2E) utilizando el framework Cypress.

## Tecnologías utilizadas

- Cypress v14.5.2
- JavaScript (Node.js)
- Swagger Petstore (API pública)
- SauceDemo.com (sitio web para pruebas E2E)
- Visual Studio Code
------------------------------------------------------------------------------------------------
- `e2e/api`: contiene las pruebas automatizadas de la API Swagger Petstore.
- `e2e/ui`: contiene las pruebas E2E para el sitio web SauceDemo.
- `support/`: contiene comandos personalizados reutilizables (por ejemplo, `cy.login()`).
- `screenshots/`: carpeta para evidencias automáticas en caso de errores durante la ejecución.

## Pruebas automatizadas

### Pruebas de API (Swagger Petstore)

**pets.cy.js**
- POST: Crear mascota
- GET: Buscar mascotas por estado
- GET: Error al buscar ID inexistente
- PUT: Actualizar mascota existente
- PUT: Error al enviar ID no numérico
- DELETE: Eliminar mascota por ID
- DELETE: Error al eliminar mascota ya eliminada

**users.cy.js**
- POST: Crear usuario exitosamente

### Pruebas E2E (SauceDemo)

**user_login.cy.js**
- Validación visual de login
- Login fallido con credenciales incorrectas
- Login exitoso

**product_add_validate.cy.js**
- Visualización de productos
- Agregado de productos al carrito
- Validación de precios
- Remoción de productos
- Navegación entre carrito, detalle y checkout

**checkout.cy.js**
- Validaciones del formulario de compra
- Flujo completo de compra y confirmación

## Evidencias

Cypress está configurado para capturar automáticamente capturas de pantalla ante cualquier fallo. Estas se almacenan en la carpeta `cypress/screenshots/`.

## Instrucciones para ejecutar las pruebas

1. Clonar el repositorio:

git clone https://github.com/evelynosman/automatizacion-vitawallet.git
cd cypress_test

2. Instalar las dependencias:
npm install

3. Ejecutar las pruebas en modo gráfico:
npx cypress open

4. Ejecutar todas las pruebas en la terminal:
npx cypress run

También es posible ejecutar pruebas específicas mediante la opción `--spec`:
ej: 
npx cypress run --spec "cypress/e2e/ui/user_login.cy.js"
