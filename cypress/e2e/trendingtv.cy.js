let movies;
let trending;
let page = 1;
const email = "test@test.com"; 
const pass = "test20"; 

describe("The Trending TV page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=${page}`
    )
      .its("body")
      .then((response) => {
        trending = response.results;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/tv/trending`);
  });
  it("Displays trending tv header and 20 trending tv on page 1", () => {
    cy.get('h3').contains("Trending TV");
    cy.get(".MuiCardHeader-root").should("have.length", 20);
    cy.get("li").eq(1).contains("1");
  });
  it("Tests whether the trending tv are correct", () => {
      cy.get(".MuiCardHeader-root")
        .within(() => {
          cy.get("p").each(($card, index) => {
            cy.wrap($card).contains(trending[index].name);
          });
        });
    });
  it("Tests clicking to next page of trending tv", () => {
    cy.get("li").eq(2).contains("2").click();
    page = 2;
    cy.get(".MuiCardHeader-root")
      .within(() => {
        cy.get("p").each(($card, index) => {
          cy.wrap($card).contains(trending[index].name);
      });
    });
  });
});