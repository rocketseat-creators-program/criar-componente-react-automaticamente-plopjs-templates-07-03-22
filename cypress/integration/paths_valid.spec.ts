/// <reference types="cypress" />

describe('Valid Paths: All should NOT return 404', () => {
	it('/invitation', () => {
		cy.visit('/invitation').get('h1').should('not.have.text', '404');
	});

	it('/contacts', () => {
		cy.visit('/contacts').get('h1').should('not.have.text', '404');
	});

	it('/customer/account', () => {
		cy.visit('/customer/account').get('h1').should('not.have.text', '404');
	});

	it('/customer/account/edit', () => {
		cy.visit('/customer/account/edit').get('h1').should('not.have.text', '404');
	});

	it('/customer/account/login', () => {
		cy.visit('/customer/account/login')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/customer/account/logout', () => {
		cy.visit('/customer/account/logout')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/customer/account/new', () => {
		cy.visit('/customer/account/new').get('h1').should('not.have.text', '404');
	});

	it('/customer/address', () => {
		cy.visit('/customer/address').get('h1').should('not.have.text', '404');
	});

	it('/customer/address/new', () => {
		cy.visit('/customer/address/new').get('h1').should('not.have.text', '404');
	});

	it('/customer/order/history', () => {
		cy.visit('/customer/order/history')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/customer/email-preferences', () => {
		cy.visit('/customer/email-preferences')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/customer/gift-cards', () => {
		cy.visit('/customer/gift-cards').get('h1').should('not.have.text', '404');
	});

	it('/customer/payment-methods', () => {
		cy.visit('/customer/payment-methods')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/customer/vouchers', () => {
		cy.visit('/customer/vouchers').get('h1').should('not.have.text', '404');
	});

	it('/checkout/cart', () => {
		cy.visit('/checkout/cart').get('h1').should('not.have.text', '404');
	});

	it('/checkout/onestep', () => {
		cy.visit('/checkout/onestep').get('h1').should('not.have.text', '404');
	});

	it('/checkout/success', () => {
		cy.visit('/checkout/success').get('h1').should('not.have.text', '404');
	});

	it('/blog', () => {
		cy.visit('/blog').get('h1').should('not.have.text', '404');
	});

	it('/product/testing', () => {
		cy.visit('/product/testing').get('h1').should('not.have.text', '404');
	});

	it('/product/bacon', () => {
		cy.visit('/product/bacon').get('h1').should('not.have.text', '404');
	});

	it('/cms/testing', () => {
		cy.visit('/cms/testing').get('h1').should('not.have.text', '404');
	});

	it('/cms/bacon', () => {
		cy.visit('/cms/bacon').get('h1').should('not.have.text', '404');
	});

	it('/catalog/testing', () => {
		cy.visit('/catalog/testing').get('h1').should('not.have.text', '404');
	});

	it('/catalog/testing/bacon', () => {
		cy.visit('/catalog/testing/bacon').get('h1').should('not.have.text', '404');
	});

	it('/catalog/testing/bacon/american', () => {
		cy.visit('/catalog/testing/bacon/american')
			.get('h1')
			.should('not.have.text', '404');
	});

	it('/blog/tag/testing', () => {
		cy.visit('/blog/tag/testing').get('h1').should('not.have.text', '404');
	});

	it('/blog/post/testing', () => {
		cy.visit('/blog/post/testing').get('h1').should('not.have.text', '404');
	});

	it('/blog/testing', () => {
		cy.visit('/blog/testing').get('h1').should('not.have.text', '404');
	});

	it('/product/cheese', () => {
		cy.visit('/product/cheese').get('h1').should('not.have.text', '404');
	});
});
