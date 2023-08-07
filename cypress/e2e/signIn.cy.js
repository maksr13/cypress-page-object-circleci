import { BasePage } from '../pages/BasePage';
import { SignInPage } from '../pages/SignInPage';

describe('Sign In', { tags: '@regression' }, () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Should be able to Sign In', () => {
        cy.contains(BasePage.link, 'Sign In').click();
        cy.get(BasePage.pageTitleWrapper).should('have.text', 'Customer Login').and('be.visible');
        cy.get(SignInPage.emailField).type(Cypress.env('user').email);
        cy.get(SignInPage.passwordField).type(Cypress.env('user').password);
        cy.get(SignInPage.signInButton).click();
        cy.get(BasePage.logedInText).should('contain.text', `Welcome, ${Cypress.env('user').firstName} ${Cypress.env('user').lastName}!`).and('be.visible');
        cy.get(BasePage.customerMenuToggle).click();
        cy.contains(BasePage.link, 'My Account').click();
        cy.get(BasePage.pageTitleWrapper).should('have.text', 'My Account').and('be.visible');
        cy.get(BasePage.boxContent).should('have.text', `\n\n${Cypress.env('user').firstName} ${Cypress.env('user').lastName}\n${Cypress.env('user').email}\n\n\n\nYou have not set a default billing address. \n\n\nYou have not set a default shipping address. \n`).and('be.visible');
    });
});
