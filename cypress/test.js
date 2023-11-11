describe("My First Test", () => {
  it("Visits the app and checks the heading", () => {
    cy.visit("/");
    cy.contains("Chess game").should("exist");
  });
  it("Interacts with a form", () => {
    cy.visit("/");
    cy.get('input[type="text"]').type("My FEN string");
    cy.get("button").click();
    cy.contains("White Turn").should("exist");
  });
});
