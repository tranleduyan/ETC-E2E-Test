/**
 * Login Function
 * Helper that tests and executes a login
 */
Cypress.Commands.add('login', (username, password) => {
	cy.session(
		username,
		() => {
		  cy.visit('/')

		  /** Verify if the input field for school email */
		  cy.get("input[name='emailAddress'").should("exist").type(username);

		  /** Verify if "Continue" button */
		  cy.contains("Continue").should("exist").click();
	  
		  /** Verify if the input field for password */
		  cy.get("input[name='password'").should("exist").type(password);
	  
		  /** Verify if "Sign In" button exists */
		  cy.contains("Sign In").should("exist").click();
		},
		{
		  validate: () => {
			/** Verify if user is navigated to Dashboard */
			cy.url().should("include", "/Dashboard");
		  },
		}
	)
})
