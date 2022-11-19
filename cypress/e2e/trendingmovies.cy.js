let movies; // List of movies from TMDB
let trending;
let page = 1;
const email = "test@test.com"; 
const pass = "test20"; 

describe("Trending Movies Tests", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login(email,pass);
  });
  describe("The movie details page", () => {
    before(() => {

      cy.request(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=${page}`
      )
        .its("body") // Take the body of HTTP response from TMDB
        .then((response) => {
          trending = response.results;
        });
        
    });
    beforeEach(() => {
      cy.visit(`/movies/trending`);
    });
    it("displays similar header and 20 similar movies on page 1", () => {
      cy.get('h3').contains("Trending Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
      cy.get("li").eq(1).contains("1");
    });
    it("tests whether the trending movies are correct", () => {
        cy.get(".MuiCardHeader-root")
          .within(() => {
            cy.get("p").each(($card, index) => {
              cy.wrap($card).contains(trending[index].title);
            });
          });
      });
    it("tests clicking to next page of trending movies", () => {
      cy.get("li").eq(2).contains("2").click();
      page = 2;
      cy.get(".MuiCardHeader-root")
        .within(() => {
          cy.get("p").each(($card, index) => {
            cy.log(trending[index].title);
            cy.wrap($card).contains(trending[index].title);
        });
      });
    });
});
});