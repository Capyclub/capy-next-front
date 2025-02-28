// cypress/support/index.js

// Import des commandes personnalisées
import './commands';

beforeEach(() => {
    cy.visit('/');
});

Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('form').submit();
});

Cypress.Commands.add('logout', () => {
    cy.get('button[data-testid="logout-button"]').click();
});
