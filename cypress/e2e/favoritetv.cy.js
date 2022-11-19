let tvs;
let page = 1;
const tvId = 90462;
const email = "test@test.com"; 
const pass = "test20"; 

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
    it("selected movie card shows the red heart", () => {
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  });

  describe("The favorite tv page", () => {
    beforeEach(() => {
      // Select two favorites and navigate to Favorites page
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("button[aria-label='add to favorites']").eq(3).click();
      cy.get("button").contains("Favorite TV").click();
    });
    it("only the tagged series are listed", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 2);
      cy.get(".MuiCardHeader-content").eq(0).find("p").contains(tvs[1].name);
      cy.get(".MuiCardHeader-content").eq(1).find("p").contains(tvs[3].name);
    });
  });
});