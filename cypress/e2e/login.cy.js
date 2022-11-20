const email = "test@test.com"; 
const pass = "test20"; 


describe("The Login Form and Errors", () => {
  beforeEach(() => {
    cy.visit("/");
  });
    it("displays the login / create account form", () => {
      cy.get("h2").contains("Login");
      cy.get('input[placeholder="Email"]');
      cy.get('input[placeholder="Password"]');
      cy.get('.MuiInputAdornment-root');
      cy.get('#outlined-adornment-password');
    });
    it("tests the password toggle", () => {
      cy.get('input[placeholder="Email"]').clear().type(email);
      cy.get('input[placeholder="Password"]').clear().type(pass);
      cy.get('svg[data-testid="VisibilityIcon"]').click();
      cy.get('#outlined-adornment-password').should("be.visible");
    });
    it("test account exists error", () => {
      cy.get('input[placeholder="Email"]').clear().type(email);
      cy.get('input[placeholder="Password"]').clear().type(pass);
      cy.get('button').contains("Create Account").click();
      cy.get('.MuiTypography-body1').contains("Account Already Exists");
    });
    it("test invalid email error", () => {
      cy.get('input[placeholder="Email"]').clear().type("test");
      cy.get('input[placeholder="Password"]').clear().type(pass);
      cy.get('button').contains("Create Account").click();
      cy.get('.MuiTypography-body1').contains("Invalid Email Address");
    });
    it("test no email error", () => {
      cy.get('input[placeholder="Password"]').clear().type(pass);
      cy.get('button').contains("Create Account").click();
      cy.get('.MuiTypography-body1').contains("Enter an Email Address");
    });
    it("test no password error", () => {
      cy.get('input[placeholder="Email"]').clear().type(email);
      cy.get('button').contains("Create Account").click();
      cy.get('.MuiTypography-body1').contains("Invalid Password");
    });
  describe("Login / Logout / Redirect", () => {
    beforeEach(() => {
      cy.login(email,pass);
    });
      it("test successful login", () => {
        cy.url().should("include", `/movies`);
        cy.get('h6').contains(email);
      });
      it("test logout", () => {
        cy.get('.MuiButtonBase-root').contains("Log Out").click();
        cy.url().should("include", `/`)
      });
      it("test redirect when logged out", () => {
        cy.get('h6').contains(email);
        cy.url().should("include", `/movies`);
        cy.visit('http://localhost:3000/tv');
        cy.url().should("include", `/tv`);
        cy.get('.MuiButtonBase-root').contains("Log Out").click();
        cy.url().should("include", `/`);
        cy.visit('http://localhost:3000/tv');
        cy.url().should("include", `/`); 
      });
    });
  });