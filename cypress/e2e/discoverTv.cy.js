let discover;
let page = 1;
const email = "test@test.com"; 
const pass = "test20"; 

describe("The Discover TV page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=${page}`
    )
      .its("body") 
      .then((response) => {
        discover = response.results;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/tv`);
  });
  it("Displays discover header and 20 series on page 1", () => {
    cy.get('h3').contains("Discover TV");
    cy.get(".MuiCardHeader-root").should("have.length", 20);
    cy.get("li").eq(1).contains("1");
  });
  it("Tests whether the discover tv series are correct", () => {
      cy.get(".MuiCardHeader-root")
        .within(() => {
          cy.get("p").each(($card, index) => {
            cy.wrap($card).contains(discover[index].name);
          });
        });
    });
  it("Tests clicking to next page of discover tv series", () => {
    cy.get("li").eq(2).contains("2").click();
    page = 2;
    cy.get(".MuiCardHeader-root")
      .within(() => {
        cy.get("p").each(($card, index) => {
          //cy.log(trending[index].title);
          cy.wrap($card).contains(discover[index].name);
      });
    });
  });
});