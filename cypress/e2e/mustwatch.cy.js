let movies;
const movieId = 497582; // Enola Holmes movie id
const email = "test@test.com"; 
const pass = "test20"; 

describe("The Must Watch Movies Feature", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
    cy.login(email,pass);
    cy.url().should("include", `/movies`)
    cy.visit("/movies/upcoming");
  });

  describe("Add to Must Watch", () => {
    it("selected movie card shows the playlist icon", () => {
        cy.get('.MuiAvatar-root').should("not.exist");
        cy.get("button[aria-label='add to must watch']").eq(0).click();
        cy.get('.MuiAvatar-root').find("svg").should("exist");
    });
    it("selected movie appears on the mustWatch page", () => {
        cy.mustWatch();
        cy.get('.MuiAvatar-root').find("svg").should("exist");
        cy.get('.MuiCardHeader-content > .MuiTypography-root').eq(0).contains(movies[0].title);
        cy.get('.MuiCardHeader-content > .MuiTypography-root').should("have.length", 1);
      });
    it("selected more info on mustWatch card", () => {
        cy.mustWatch();
        cy.get('a > .MuiButtonBase-root').click();
        cy.url().should("include", "/movies/" + movies[0].id)
    });
  })



});