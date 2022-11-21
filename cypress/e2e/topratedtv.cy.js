let topTv;
let page = 1;
const email = "test99@test.com"; 
const pass = "test99"; 

describe("The Top Rated Tv page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=${page}`
    )
      .its("body")
      .then((response) => {
        topTv = response.results;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/tv/top`);
  });
  it("Displays top rated header and 20 top rated series on page 1", () => {
    cy.get('h3').contains("Top Rated TV");
    cy.get(".MuiCardHeader-root").should("have.length", 20);
    cy.get("li").eq(1).contains("1");
  });
  it("Tests whether the top tv series are correct", () => {
    cy.testSeries(topTv);
    });
  it("Page 2 of top tv displays correct series", () => {
    cy.get("li").eq(2).contains("2").click();
    page = 2;
    cy.testSeries(topTv);
  });
});