let movie; 
let movieId = 882598;
let similar;
let images;

let episodeList; 
let seriesId = 1402;
let imagesTv;
let tvSeries;
let seasons;
const email = "test11@test.com"; 
const pass = "test11"; 


describe("The Movie Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${
        movieId
      }?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body")
      .then((movieDetails) => {
        movie = movieDetails;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US`
    )
      .its("body")
      .then((response) => {
        similar = response.results;
      });
    
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((response) => {
        images = response.posters;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/movies/${movieId}`);
  });
  it("Tests that the Images are correct", () => {
    cy.imageDetailsCheck(images);
  });
  it("Check length of similar movies list", () => {
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
        //cy.get("li").eq(1).click();
      });
  });
});


describe("The TV Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false`
    )
      .its("body")
      .then((seriesDetails) => {
        tvSeries = seriesDetails;
        seasons = tvSeries.seasons
      });

    cy.request(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/1?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false`
    )
      .its("body")
      .then((seasonDetails) => {
        episodeList = seasonDetails.episodes;
      });

    cy.request(
      `https://api.themoviedb.org/3/tv/${seriesId}/images?api_key=${Cypress.env("TMDB_KEY")}`)
      .its("body")
      .then((response) => {
        images = response.posters;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/tv/${seriesId}`);
  });
  it("Tests that the series image list is correct", () => {
    cy.imageDetailsCheck(images);
  });
  it("Tests the episodes list is correct", () => {
    cy.get('.MuiTableCell-alignRight > a').eq(1).click();
    cy.get("tr").should("have.length", episodeList.length + 1)
    cy.get(".MuiTableBody-root")
      .within(() => {
        cy.get("tr").each(($card, index) => {
          cy.wrap($card).contains(episodeList[index].episode_number);
        });
      });
  });
  it("Tests whether the season details are correct", () => {
    cy.get(".MuiTableBody-root")
      .within(() => {
        cy.get("tr").each(($card, index) => {
          cy.wrap($card).contains(seasons[index].id);
        });
      });
  });
  it("Navigate to season episodes page", () => {
    cy.get('.MuiTableCell-alignRight > a').eq(1).click();
    cy.url().should("include", `/tv/${seriesId}/season/1`)
  });
});