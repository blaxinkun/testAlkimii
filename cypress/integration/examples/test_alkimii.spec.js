/// <reference types="cypress" />

const doLogin = (username, password) => {
  cy.visit("https://www.alkimii.com/");
  cy.get(".StylableButton1196941481__icon > div > svg").click();
  cy.get("#user_email").type(username);
  cy.get("#user_password").type(password);
  cy.get(".amm-login-button").click();
};

const assertInvalid = () => {
  cy.get(".alert").should("include.text", "Invalid Email or password.");  
};

const assertLastAttempt = () => {
  cy.get(".alert").should("include.text", "You have one more attempt before your account is locked.");  
}

const assertLocked = () => {
  cy.get(".alert").should("include.text", "Your account is locked.");
}

// This code assumes that you have 3 attempts before
// the account is locked
it('Blocks the user after 3 login attempts', () => {
  doLogin('john@alkimii.com', 'abc1234');
  assertInvalid();

  doLogin('john@alkimii.com', 'abc1234');
  assertLastAttempt();

  doLogin('john@alkimii.com', 'abc1234');
  assertLocked();
});