describe("Complete app navigation", () => {
  it("Navigate through the app and check elements", () => {
    cy.visit("http://localhost:3000/");
    // Check if main header link is present
    cy.get("#root > h1 > a").contains("Podcaster");

    // Navigate to the first podcast
    cy.get("#root > main > ul > li:nth-child(1) > a > div").click();
    // Check if podcast details card is rendered:
    cy.get("div").contains("Description:");

    // Select the first episode
    cy.get("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").click();
    // Check if podcast details card is still on view:
    cy.get("div").contains("Description:");

    // Check if audio player is visible:
    cy.get("audio");
  });
});
