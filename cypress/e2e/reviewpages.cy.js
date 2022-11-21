let mReviews;
let sReviews;
let movieId = 882598;
let seriesId = 90462;
const email = "test77@test.com"; 
const pass = "test77"; 

// describe("The TV Reviews Pages", () => {
//   before(() => {
//     cy.request(
//       `https://api.themoviedb.org/3/tv/${
//         seriesId
//       }/reviews?api_key=${Cypress.env("TMDB_KEY")}`
//     )
//       .its("body")
//       .then((seriesReviews) => {
//         sReviews = seriesReviews.results;
//       });  
//   });
//   beforeEach(() => {
//     cy.login(email,pass);
//     cy.visit(`/tv/${seriesId}`);
//   });
//   it("tests the movie reviews floating action button", () => {
//       cy.get('.MuiFab-root').click();
//       cy.get('.MuiDrawer-root').should('be.visible');
//     });
//   it("checks the review author is as expected in the drawer", () => {
//     cy.openReviews();
//     cy.get('th').eq(10).contains(sReviews[0].author);
//   });
//   // it("tests the full review option", () => {
//   //     cy.openReviews();
//   //     cy.get('.MuiPaper-elevation16 > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > :nth-child(3) > a').click();
//   //     cy.url().should("include", `/tv/reviews/${sReviews[0].id}`);
//   //     cy.get('.MuiGrid-grid-xs-9').find('p').eq(1).contains(sReviews[0].content);
//   //   });
// });

describe("The Movie Reviews Pages", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${
        movieId
      }/reviews?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body")
      .then((movieReviews) => {
        mReviews = movieReviews.results;
      });  
  });
  beforeEach(() => {
    cy.login(email,pass);
    cy.visit(`/movies/${movieId}`);
  });
  it("tests the movie reviews floating action button", () => {
      cy.get('.MuiFab-root').click();
      cy.get('.MuiDrawer-root').should('be.visible');
    });
  it("checks the reviews length and authors are as expected", () => {
      cy.openReviews();
      const rev = mReviews.map((g) => g.author);
      rev.unshift("Author");
      cy.get("tr").each(($card, index) => {
          cy.wrap($card).contains(rev[index]);
      });
      cy.get("tr").should("have.length", rev.length);
  });
  it("tests the full review option", () => {
      cy.openFullReview();
      cy.url().should("include", `/reviews/${mReviews[0].id}`);
      cy.get('button').contains("Show Review").click();
      cy.get('.MuiGrid-grid-xs-9').find('p').eq(0).contains(mReviews[0].author);
      //cy.get('.MuiGrid-grid-xs-9').find('p').eq(1).contains(mReviews[0].content);
    });
});



