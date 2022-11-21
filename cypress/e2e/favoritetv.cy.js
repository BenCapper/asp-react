let tvs;
let page = 1;
const tvId = 90462;
const email = "test33@test.com"; 
const pass = "test33"; 

describe("The Favorite TV Feature", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=${page}`
    )
      .its("body")
      .then((response) => {
        tvs = response.results;
      });
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit("/tv");
  });

  describe("Selecting favorites", () => {
    it("selected series shows the favorite icon", () => {
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  });

  describe("The favorite tv page", () => {
    beforeEach(() => {
      cy.navFavoriteTv()
      cy.url().should("include", "/tv/favorites");
    });
    it("only the favorite series are listed", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 2);
      cy.get(".MuiCardHeader-content").eq(0).find("p").contains(tvs[1].name);
      cy.get(".MuiCardHeader-content").eq(1).find("p").contains(tvs[2].name);
    });
    it("trash icon removes favorite", () => {
      cy.get('[data-testid="DeleteIcon"]').eq(0).click();
      cy.get(".MuiCardHeader-content").eq(0).find("p").contains(tvs[2].name);
      cy.get(".MuiCardHeader-content").should("have.length", 1);
    });
    it("review icon navigates to series review page", () => {
      cy.get('[data-testid="RateReviewIcon"]').eq(0).click();
      cy.url().should("include", "/tv/reviews/form");
    });
  });
});