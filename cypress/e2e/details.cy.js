let movie; 
let movieid = 882598;
let similar;
const email = "test@test.com"; 
const pass = "test20"; 


describe("The Movie Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${
        movieid
      }?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body")
      .then((movieDetails) => {
        movie = movieDetails;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US`
    )
      .its("body")
      .then((response) => {
        similar = response.results;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/movies/${movieid}`);
  });
  it("Displays similar header and 20 similar movies list", () => {
    cy.get('.css-1idn90j-MuiGrid-root > .MuiTypography-root').contains("Similar Movies");
    cy.get(".MuiCardHeader-root").should("have.length", 20);
  });
  it("Tests whether the similar movies are correct", () => {
    cy.get(".MuiCardHeader-root")
      .within(() => {
        cy.get("p").each(($card, index) => {
          cy.wrap($card).contains(similar[index].title);
        });
      });
  });
  it("Displays the movie production companies", () => {
    cy.get('.MuiGrid-grid-xs-9 > :nth-child(6)')
      .within(() => {
        const production = movie.production_companies.map((g) => g.name);
        production.unshift("Production Companies");
        cy.get("li").each(($card, index) => {
          cy.wrap($card).contains(production[index]);
        });
      });
  });
  it("Navigate to company homepage", () => {
    cy.get('.MuiGrid-grid-xs-9 > :nth-child(6)')
      .within(() => {
        cy.get("li").eq(1).click();
      });
  });
});