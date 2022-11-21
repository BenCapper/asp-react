let query = "sand";
let people;
let companies;
let page = 1;
const email = "test88@test.com"; 
const pass = "test88"; 

describe("The Search page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/search/company?api_key=${Cypress.env("TMDB_KEY")}&query=${query}&page=${page}`
    )
      .its("body")
      .then((response) => {
        companies = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/search/person?api_key=${Cypress.env("TMDB_KEY")}&query=${query}&page=${page}`
    )
      .its("body")
      .then((response) => {
        people = response.results;
      });
      
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/search`);
  });
  it("Displays the search companies / people form", () => {
    cy.get('h3').contains("Search");
    cy.get('button[aria-pressed="true"]').contains("Companies");
    cy.get('input[placeholder="Name"]');
    cy.get('button').contains('People').click();
    cy.get('button[aria-pressed="true"]').contains("People");
    });
  it("Searches for companies and confirms the result", () => {
    cy.typeClick(query);
    cy.get('h5').each(($card, index) => {
        cy.wrap($card).contains(companies[index].name);
    });
  });
  it("Searches for people and confirms the result", () => {
    cy.searchPeople(query,people);
  });
  it("Tests search pagination", () => {
    cy.searchPeople(query,people);
    page=2;
    cy.request(
        `https://api.themoviedb.org/3/search/person?api_key=${Cypress.env("TMDB_KEY")}&query=${query}&page=${page}`
      )
        .its("body")
        .then((response) => {
          people = response.results;
        });
    cy.get('button').contains('2').click();
    cy.get("h5").each(($card, index) => {
        cy.wrap($card).contains(people[index].name);
    });
  });
  it("Shows spinner on empty query", () => {
    cy.typeClick(" ");
    cy.get('circle').should('be.visible');
    cy.visit('/search');
  });
});