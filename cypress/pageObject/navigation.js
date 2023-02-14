module.export = {
  get myOrgsPageButton() {
    cy.get(".vs-c-site-logo.vs-u-cursor--pointer");
  },
  get orgTitleButton() {
    cy.get(".vs-l-organization__title");
  },
  get projectTitleButton() {
    cy.get(".vs-l-project__title");
  },
  get searchButton() {
    cy.get("div[class='vs-c-project-search']");
  },
  get searchInput() {
    cy.get("input[placeholder='Search and use # to filter']");
  },
};
