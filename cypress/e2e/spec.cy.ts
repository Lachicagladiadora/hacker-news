/// <reference types="cypress" />
// describe("test end to end", () => {
// const firstResponse =

it("test e2e change new types and add to faves", () => {
  cy.visit("http://localhost:5173/");

  cy.get("#news-types").contains("reactjs").click();
  cy.get("#news-types").contains("angular").click();
  cy.get("article")
    .first()
    .get("button")
    .get('[title="Add to faves"]')
    .first()
    .click();

  // cy.get("button").contains("My faves").click();

  // cy.get("button").contains("All").click();
  cy.get("#news-types").contains("angular").click();
  cy.get("#news-types").contains("reactjs").click();
  cy.get("article")
    .first()
    .get("button")
    .get('[title="Add to faves"]')
    .first()
    .click();

  // cy.get("button").contains("My faves").click();

  // cy.get("button").contains("All").click();
  cy.get("#news-types").contains("reactjs").click();
  cy.get("#news-types").contains("vuejs").click();
  cy.get("article")
    .first()
    .get("button")
    .get('[title="Add to faves"]')
    .first()
    .click();

  cy.get("button").contains("My faves").trigger("click");
  cy.get("article").should((response) => {
    expect(response).to.have.length(3);
  });

  // remove one fave
  cy.get("article")
    .first()
    .get("button")
    .get('[title="Add to faves"]')
    .first()
    .click();

  // cy.get("button").contains("My faves").click();
  // verify amount
  cy.get("article").should((response) => {
    expect(response).to.have.length(2);
  });
});
// });
