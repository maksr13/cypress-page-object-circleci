import { CreateAnAccountPage } from '../pages/CreateAnAccountPage';
import { BasePage } from '../pages/BasePage';
import { Utils } from '../helpers/Utils';


describe('Create An Account', { tags: '@regression' }, () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Should be able to register a new account', () => {
        const firstName = Utils.uniquify('Kevin');
        const lastName = Utils.uniquify('Simpson');
        const email = Utils.uniquifyEmail('kevin.simpson@dispostable.com');
        const password = '123890qwerty!';

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(CreateAnAccountPage.emailField).type(email);
        cy.get(CreateAnAccountPage.passwordField).type(password);
        cy.get(CreateAnAccountPage.passwordConfirmField).type(password);
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'Very Strong').and('be.visible');
        cy.get(BasePage.submitButton).click();
        cy.get(BasePage.pageTitleWrapper).should('have.text', 'My Account').and('be.visible');
        cy.get(BasePage.messageSuccess).should('contain.text', 'Thank you for registering with Main Website Store.').and('be.visible');
        cy.get(BasePage.boxContent).should('have.text', `\n\n${firstName} ${lastName}\n${email}\n\n\n\nYou have not set a default billing address. \n\n\nYou have not set a default shipping address. \n`).and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill no fields)', () => {
        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.firstNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only firstNameField and try to submit form)', () => {
        const firstName = Utils.uniquify('Kevin');

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only lastNameField and try to submit form)', () => {
        const lastName = Utils.uniquify('Simpson');

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.firstNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only firstNameField and try to submit form)', () => {
        const firstName = Utils.uniquify('Kevin');

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only lastNameField and try to submit form)', () => {
        const lastName = Utils.uniquify('Simpson');

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).clear();
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.firstNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only firstNameField, lastNameField, emailField and try to submit form)', () => {
        const firstName = Utils.uniquify('Kevin');
        const lastName = Utils.uniquify('Simpson');
        const email = Utils.uniquifyEmail('kevin.simpson@dispostable.com');

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(CreateAnAccountPage.emailField).type(email);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.firstNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should not be able to register a new account if required fields are not filled (fill only firstNameField, lastNameField, emailField, passwordField and try to submit form)', () => {
        const firstName = Utils.uniquify('Kevin');
        const lastName = Utils.uniquify('Simpson');
        const email = Utils.uniquifyEmail('kevin.simpson@dispostable.com');
        const password = '123890qwerty!';

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(CreateAnAccountPage.emailField).type(email);
        cy.get(CreateAnAccountPage.passwordField).type(password);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.firstNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('not.exist');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('not.be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'Very Strong').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
    });

    it('Should be able to register a new account if required fields are not filled and then filled', () => {
        const firstName = Utils.uniquify('Kevin');
        const lastName = Utils.uniquify('Simpson');
        const email = Utils.uniquifyEmail('kevin.simpson@dispostable.com');
        const password = '123890qwerty!';

        cy.contains(BasePage.link, 'Create an Account').click();
        cy.get(CreateAnAccountPage.firstNameField).type(firstName);
        cy.get(BasePage.submitButton).click();
        cy.get(CreateAnAccountPage.lastNameField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.emailField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.passwordStrengthMeter).should('contain.text', 'No Password').and('be.visible');
        cy.get(CreateAnAccountPage.passwordConfirmField).next(CreateAnAccountPage.errorValidatonText).should('have.text', 'This is a required field.').and('be.visible');
        cy.get(CreateAnAccountPage.lastNameField).type(lastName);
        cy.get(CreateAnAccountPage.emailField).type(email);
        cy.get(CreateAnAccountPage.passwordField).type(password);
        cy.get(CreateAnAccountPage.passwordConfirmField).type(password);
        cy.get(BasePage.submitButton).click();
        cy.get(BasePage.pageTitleWrapper).should('have.text', 'My Account').and('be.visible');
        cy.get(BasePage.messageSuccess).should('contain.text', 'Thank you for registering with Main Website Store.').and('be.visible');
        cy.get(BasePage.boxContent).should('have.text', `\n\n${firstName} ${lastName}\n${email}\n\n\n\nYou have not set a default billing address. \n\n\nYou have not set a default shipping address. \n`).and('be.visible');
    });
});
