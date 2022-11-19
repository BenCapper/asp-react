let tvSeries;
let seasons;
let images;
let episodeList; 
let seriesId = 1402;
const email = "test@test.com"; 
const pass = "test20"; 


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
  it("Tests that the Images are correct", () => {
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