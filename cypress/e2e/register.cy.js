describe('Test d\'Inscription', () => {
    let adminToken;

    it('devrait permettre à un utilisateur de s\'inscrire', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('BACKEND_URL')}/auth/login`,
            body: {
                email: 'loise.fenoll@ynov.com',
                password: 'ANKymoUTFu4rbybmQ9Mt',
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            adminToken = response.body.access_token;

            cy.request({
                method: 'GET',
                url: `${Cypress.env('BACKEND_URL')}/users/email/john.doe@example.com`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                failOnStatusCode: false,
            }).then((response) => {
                if (response.status === 201) {
                    const userId = response.body.id;

                    cy.request({
                        method: 'DELETE',
                        url: `${Cypress.env('BACKEND_URL')}/users/${userId}`,
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }).then((deleteResponse) => {
                        expect(deleteResponse.status).to.eq(200);
                    });
                } else if (response.status === 404) {
                    cy.log('User not found, proceeding with registration');
                } else {
                    throw new Error(`Unexpected status code: ${response.status}`);
                }
            });
        });
        cy.visit('/');

        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="city"]').type('Paris');
        cy.get('input[name="postal_code"]').type('75000');
        cy.get('input[name="date_of_birth"]').type('2000-01-01');

        cy.get('form').submit();

        cy.url().should('include', '/admin');
        cy.contains('h1', 'CapyClub admin');
    });
});
