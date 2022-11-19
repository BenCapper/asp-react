let movies; // List of movies from TMDB
let reviews; //
let movie;
let movieid = 882598;
let similar;
const email = "test@test.com"; 
const pass = "test20"; 

describe("Base tests", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login(email,pass);
  });
  describe("The movie reviews pages", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movieid
        }/reviews?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieReviews) => {
          reviews = movieReviews;
        });
        
    });
    beforeEach(() => {
      cy.visit(`/movies/${movieid}`);
    });
    it("tests the movie reviews floating action button", () => {
        cy.get('.MuiFab-root').click();
        cy.get('.MuiDrawer-root').should('be.visible');
      });
    it("checks the reviews length and authors are as expected", () => {
        cy.openReviews();
        const rev = reviews.results.map((g) => g.author);
        rev.unshift("Author");
        cy.get("tr").each(($card, index) => {
            cy.wrap($card).contains(rev[index]);
        });
        cy.get("tr").should("have.length", rev.length);
    });
    it("tests the full review option", () => {
        cy.openFullReview();
        cy.url().should("include", `/reviews/${reviews.results[0].id}`);
        //cy.get('.MuiGrid-grid-xs-9').find('p').eq(0).contains(reviews.results[0].content);
      });

});
});