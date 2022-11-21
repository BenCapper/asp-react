const email = "test66@test.com"; 
const pass = "test66";
const options = ["Excellent", "Good", "Average", "Poor", "Terrible"];


describe("The Tv Review Form page", () => {

    beforeEach(() => {
      cy.login(email,pass);
    });
    it("Navigate to the review form", () => {
        cy.toReviewFormTv();
      cy.get('h2').contains("Write a review");
    });
    it("Tests the dropdown options", () => {
      cy.toReviewFormTv();
      cy.get('#select-rating').click();
      cy.get("ul")
      .within(() => {
        cy.get("li[role='option']").each(($card, index) => {
          cy.wrap($card).contains(options[index]);
        });
      });
    });
    describe("Input tests", () => {
      beforeEach(() => {
        cy.toReviewFormTv();
        });
      it("Tests valid form entry and submit", () => {
        cy.get('input').eq(0).type("Ben Capper", {force: true});
        cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/reviews/form");
      });
      it("Tests reset button", () => {
        cy.url().should("include", "/reviews/form");
        cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
        cy.get('input').eq(0).type("Ben Capper", {force: true});
        cy.get('button[type="reset"]').click();
        cy.get('input').eq(0).should("be.empty");
        cy.get('textarea').eq(0).should("be.empty");
      });
      it("Tests form name error", () => {
        cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
        cy.get('button[type="submit"]').click();
        cy.get('p').contains("Name is required");
      });
      it("Tests form review empty error", () => {
        cy.get('input').eq(0).type("Ben Capper", {force: true});
        cy.get('button[type="submit"]').click();
        cy.get('p').contains("Review cannot be empty.");
      });
  });
  });


describe("The Movie Review Form page", () => {

  beforeEach(() => {
    cy.login(email,pass);
  });
  it("Navigate to the review form", () => {
    cy.toReviewForm();
    cy.get('h2').contains("Write a review");
  });
  it("Tests the dropdown options", () => {
    cy.toReviewForm();
    cy.get('#select-rating').click();
    cy.get("ul")
    .within(() => {
      cy.get("li[role='option']").each(($card, index) => {
        cy.wrap($card).contains(options[index]);
      });
    });
  });
  describe("Input tests", () => {
    beforeEach(() => {
        cy.toReviewForm();
      });
    it("Tests valid form entry and submit", () => {
      cy.get('input').eq(0).type("Ben Capper", {force: true});
      cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
      cy.get('button[type="submit"]').click();
      cy.get('svg[data-testid="SuccessOutlinedIcon"]').should("be.visible")
    });
    it("Tests reset button", () => {
      cy.get('input').eq(0).type("Ben Capper", {force: true});
      cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
      cy.get('button[type="reset"]').click();
      cy.get('input').eq(0).should("be.empty");
      cy.get('textarea').eq(0).should("be.empty");
    });
    it("Tests form name error", () => {
      cy.get('textarea').eq(0).type("This review is long enough to pass the length requirement");
      cy.get('button[type="submit"]').click();
      cy.get('p').contains("Name is required");
    });
    it("Tests form review empty error", () => {
      cy.get('input').eq(0).type("Ben Capper", {force: true});
      cy.get('button[type="submit"]').click();
      cy.get('p').contains("Review cannot be empty.");
    });
});
});