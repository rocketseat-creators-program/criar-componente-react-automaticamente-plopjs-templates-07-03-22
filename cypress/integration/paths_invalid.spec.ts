/// <reference types="cypress" />

describe('Invalid Paths: All should return 404', () => {
	it('/cms/any', () => {
		cy.visit('/cms/any').get('h1').should('have.text', '404');
	});

	it('/catalog/any', () => {
		cy.visit('/catalog/any').get('h1').should('have.text', '404');
	});

	it('/catalog/testing/any', () => {
		cy.visit('/catalog/testing/any').get('h1').should('have.text', '404');
	});

	it('/catalog/any/any', () => {
		cy.visit('/catalog/any/any').get('h1').should('have.text', '404');
	});

	it('/catalog/testing/bacon/any', () => {
		cy.visit('/catalog/testing/bacon/any').get('h1').should('have.text', '404');
	});

	it('/catalog/any/any/any', () => {
		cy.visit('/catalog/any/any/any').get('h1').should('have.text', '404');
	});

	it('/blog/tag/any', () => {
		cy.visit('/blog/tag/any').get('h1').should('have.text', '404');
	});

	it('/blog/post/any', () => {
		cy.visit('/blog/post/any').get('h1').should('have.text', '404');
	});

	it('/blog/any', () => {
		cy.visit('/blog/any').get('h1').should('have.text', '404');
	});

	it('/any-invalid-path', () => {
		cy.request({ url: '/any-invalid-path', failOnStatusCode: false })
			.its('status')
			.should('equal', 404);
	});
});
