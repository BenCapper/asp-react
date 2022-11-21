let movies;
let tvs;
const email = "test44@test.com"; 
const pass = "test44"; 
const m = "/mustwatch"

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
    cy.login(email,pass);
    cy.visit("/movies/upcoming");
  });

  describe("Add to Must Watch Movies", () => {
    it("selected movie card shows the playlist icon", () => {
        cy.get('.MuiAvatar-root').should("not.exist");
        cy.get("button[aria-label='add to must watch']").eq(0).click();
        cy.get('.MuiAvatar-root').find("svg").should("exist");
    });
    it("selected movie appears on the mustWatch page", () => {
        cy.mustWatch(`/movies${m}`);
        cy.get('.MuiAvatar-root').find("svg").should("exist");
        cy.get('.MuiCardHeader-content > .MuiTypography-root').eq(0).contains(movies[0].title);
        cy.get('.MuiCardHeader-content > .MuiTypography-root').should("have.length", 1);
      });
    it("selected more info on mustWatch card", () => {
        cy.mustWatch(`/movies${m}`);
        cy.get('a > .MuiButtonBase-root').click();
        cy.url().should("include", "/movies/" + movies[0].id)
    });
  })
});

describe("The Must Watch Tv Feature", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        tvs = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
    cy.login(email,pass);
    cy.visit("/tv/top");
  });

  describe("Add to Must Watch Tv", () => {
    it("selected tv card shows the must watch icon", () => {
        cy.get('.MuiAvatar-root').should("not.exist");
        cy.get("button[aria-label='add to must watch']").eq(0).click();
        cy.get('.MuiAvatar-root').find("svg").should("exist");
    });
    it("selected series appears on the must watch tv page", () => {
        cy.mustWatch(`/tv${m}`);
        cy.get('.MuiAvatar-root').find("svg").should("exist");
        cy.get('.MuiCardHeader-content > .MuiTypography-root').eq(0).contains(tvs[0].name);
        cy.get('.MuiCardHeader-content > .MuiTypography-root').should("have.length", 1);
      });
    it("selected more info on must watch tv card", () => {
        cy.mustWatch(`/tv${m}`);
        cy.get('a > .MuiButtonBase-root').click();
        cy.url().should("include", "/tv/" + tvs[0].id)
    });
  })
});