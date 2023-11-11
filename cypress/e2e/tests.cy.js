/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Visits the app and checks the heading", () => {
    cy.contains("Chess game").should("exist");
  });
  it("Interacts with a form", () => {
    const fenString =
      "rnbqkbnr/pppP2pp/8/4p3/8/5N2/PPPPPPPP/RNBQKB2 b KQkq - 0 1";

    cy.get('input[type="text"]').clear().type(fenString);
    cy.get(".apply-btn").click();
    cy.contains("Black Turn", { timeout: 1000 }).should("exist");
  });
  it("should allow valid piece movement", () => {
    // Click on a white piece
    cy.get('[data-testid="chess-square-6-2"]').click();
    cy.get('[data-testid="chess-square-5-2"]').click();
    cy.get('[data-testid="chess-square-5-2"]')
      .find(".piece-white")
      .should("exist");
  });
  it("should eat opposite color piece", () => {
    cy.contains("White Turn").should("exist");
    // Click on a white piece
    cy.get('[data-testid="chess-square-6-2"]').click();
    cy.get('[data-testid="chess-square-1-2"]').click();
    cy.get('[data-testid="chess-square-1-2"]')
      .find(".piece-white")
      .should("exist");
  });
  it("should forbid wrong piece movement", () => {
    // Click on a black piece
    cy.get('[data-testid="chess-square-1-2"]').click();
    cy.get('[data-testid="chess-square-2-2"]').click();
    cy.get('[data-testid="chess-square-2-2"]')
      .find(".piece-black")
      .should("not.exist");
  });
  it("should forbid eating same color", () => {
    cy.get('[data-testid="chess-square-1-2"]').click();
    cy.get('[data-testid="chess-square-1-3"]').click();
    cy.get('[data-testid="chess-square-1-2"]')
      .find(".piece-black")
      .should("exist");
    cy.get('[data-testid="chess-square-1-3"]')
      .find(".piece-black")
      .should("exist");
  });
});
