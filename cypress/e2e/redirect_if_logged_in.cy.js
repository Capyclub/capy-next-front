describe('Test de Redirection pour Utilisateur Connecté', () => {
    it('devrait rediriger vers /admin si l\'utilisateur est déjà connecté', () => {
        cy.visit('/login');

        cy.get('input[name="email"]').type('loise.fenoll@ynov.com');
        cy.get('input[name="password"]').type('ANKymoUTFu4rbybmQ9Mt');
        cy.get('form').submit();

        cy.url().should('include', '/admin');
        cy.visit('/');
        cy.contains('h1', 'CapyClub admin');
    });
});
