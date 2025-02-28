describe('Test de Connexion', () => {
    it('devrait permettre à un utilisateur de se connecter', () => {
        cy.visit('/login');

        cy.get('input[name="email"]').type('loise.fenoll@ynov.com');
        cy.get('input[name="password"]').type('ANKymoUTFu4rbybmQ9Mt');
        cy.get('form').submit();

        cy.url().should('include', '/admin');
        cy.contains('h1', 'CapyClub admin');
    });
});
