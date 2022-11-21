const email = "test55@test.com"; 
const pass = "test55";


describe("App Bar Navigation Menus", () => {

  beforeEach(() => {
    cy.login(email,pass);
  });

  it("navigates to movie home and tests the navigation options", () => {
    cy.appBarCheck("Home", `/movies`);
    cy.appBarCheck("Upcoming Movies", `/movies/upcoming`);
    cy.appBarCheck("Trending Movies", `/movies/trending`);
    cy.appBarCheck("Favorite Movies", `/movies/favorite`);
    cy.appBarCheck("Must Watch", `/movies/mustwatch`);
    cy.appBarCheck("Tv", `/tv`);
    cy.appBarCheck("Search", `/search`);
    cy.appBarCheck("Log Out", `/`);
  });
   
  it("navigates to tv home and tests the navigation options", () => {
    cy.visit("/tv");
    cy.appBarCheck("Discover Tv", `/tv`);
    cy.appBarCheck("Top Rated TV", `/tv/top`);
    cy.appBarCheck("Trending TV", `/tv/trending`);
    cy.appBarCheck("Favorite TV", `/tv/favorite`);
    cy.appBarCheck("Must Watch", `/tv/mustwatch`);
    cy.appBarCheck("Movies", `/movies`);
    cy.appBarCheck("Search", `/search`);
    cy.appBarCheck("Log Out", `/`);
  });
});