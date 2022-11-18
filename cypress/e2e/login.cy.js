const email = "test@test.com"; 
const pass = "test20"; 

describe("Base tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    describe("The Login page", () => {
      it("displays the login / create account form", () => {
        cy.get("h2").contains("Login");
        cy.get('input[placeholder="Email"]');
        cy.get('input[placeholder="Password"]');
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root');
        cy.get('#outlined-adornment-password');
      });
      it("tests the password toggle", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(pass);
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('#outlined-adornment-password').should("be.visible");
      });
      it("test account exists error", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(pass);
        cy.get('.css-1mwb0z6-MuiFormControl-root > .MuiButtonBase-root').click();
        cy.get('.MuiTypography-body1').contains("Account Already Exists");
      });
      it("test invalid email error", () => {
        cy.get('input[placeholder="Email"]').clear().type("test");
        cy.get('input[placeholder="Password"]').clear().type(pass);
        cy.get('.css-1mwb0z6-MuiFormControl-root > .MuiButtonBase-root').click();
        cy.get('.MuiTypography-body1').contains("Invalid Email Address");
      });
      it("test no email error", () => {
        cy.get('input[placeholder="Password"]').clear().type(pass);
        cy.get('.css-1mwb0z6-MuiFormControl-root > .MuiButtonBase-root').click();
        cy.get('.MuiTypography-body1').contains("Enter an Email Address");
      });
      it("test no password error", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('.css-1mwb0z6-MuiFormControl-root > .MuiButtonBase-root').click();
        cy.get('.MuiTypography-body1').contains("Invalid Password");
      });
      it("test successful login", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(pass);
        cy.get(':nth-child(7) > .MuiButtonBase-root').click();
        cy.url().should("include", `/movies`);
        cy.get('.css-czpw7j-MuiTypography-root').contains(email);
      });
      it("test logout", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(pass);        
        cy.get(':nth-child(7) > .MuiButtonBase-root').click();
        cy.get('.MuiToolbar-root > :nth-child(11)').click();
        cy.url().should("include", `/`)
      });
      it("test redirect when logged out", () => {
        cy.get('input[placeholder="Email"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(pass);        
        cy.get(':nth-child(7) > .MuiButtonBase-root').click();
        cy.get('.css-czpw7j-MuiTypography-root').contains(email);
        cy.url().should("include", `/movies`);
        cy.visit('http://localhost:3000/tv');
        cy.url().should("include", `/tv`);
        cy.get('.MuiToolbar-root > :nth-child(11)').click();
        cy.url().should("include", `/`);
        cy.visit('http://localhost:3000/tv');
        cy.url().should("include", `/`); 
      });
    });
});