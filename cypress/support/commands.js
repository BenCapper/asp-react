// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email,pass) => {
    cy.visit("/");
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="Password"]').clear().type(pass);        
    cy.get(':nth-child(7) > .MuiButtonBase-root').click();
    cy.url().should("include", `/movies`)
});

Cypress.Commands.add('mustWatch', (endpoint) => {
    cy.get('.MuiAvatar-root').should("not.exist");
    cy.get("button[aria-label='add to must watch']").eq(0).click();
    cy.get('.MuiAvatar-root').find("svg").should("exist");
    cy.get('button').contains("Must Watch").click();
    cy.url().should("include", endpoint);
});

Cypress.Commands.add('openReviews', () => {
    cy.get('.MuiFab-root').click();
    cy.get('.MuiDrawer-root').should('be.visible');
});

Cypress.Commands.add('openFullReview', () => {
    cy.openReviews();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
});


Cypress.Commands.add('toReviewForm', () => {
    cy.get("button[aria-label='add to favorites']").eq(1).click();
    cy.get("button").contains("Favorite Movies").click();
    cy.get("svg[data-testid='RateReviewIcon']").click();
});

Cypress.Commands.add('toReviewFormTv', () => {
    cy.visit("/tv");
    cy.get("button[aria-label='add to favorites']").eq(1).click();
    cy.get("button").contains("Favorite TV").click();
    cy.get("svg[data-testid='RateReviewIcon']").click();
});


Cypress.Commands.add('searchPeople', (query,list) => {
    cy.get('#outlined-required').type(query);
    cy.get('button').contains('People').click();
    cy.get('.MuiButton-containedPrimary').click();
    cy.get('h5').each(($card, index) => {
        cy.log(list[index].name);
        cy.wrap($card).contains(list[index].name);
    });
});

Cypress.Commands.add('typeClick', (query) => {
    cy.get('#outlined-required').type(query);
    cy.get('.MuiButton-containedPrimary').click(); 
});

Cypress.Commands.add('testSeries', (top) => {
    cy.get(".MuiCardHeader-root")
      .within(() => {
        cy.get("p").each(($card, index) => {
          cy.wrap($card).contains(top[index].name);
      });
    });
});

Cypress.Commands.add('navFavoriteTv', (query) => {
    cy.get("button[aria-label='add to favorites']").eq(1).click();
    cy.get("button[aria-label='add to favorites']").eq(2).click();
    cy.get("button").contains("Favorite TV").click(); 
});

Cypress.Commands.add('appBarCheck', (page, path) => {
    cy.get('.MuiToolbar-root').contains(page).click();
    cy.url().should("include", path);
});

Cypress.Commands.add('imageDetailsCheck', (list) => {
    cy.get('.MuiImageList-root')
    .within(() => {
      cy.get("li").each(($card, index) => {
        cy.log(list[index].file_path)
        cy.wrap($card).get("img").eq(index).should("have.attr", "src").should("include", list[index].file_path);
      });
    });
});