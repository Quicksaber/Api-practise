import { randomStringGenerator } from "../support/generator";
import navigation from "../pageObject/navigation";

module.exports = {
  get addNewOrganizationButton() {
    return cy.get(
      "div[class='vs-c-my-organization__header--add-new'] h2[class='vs-c-my-organization__title']"
    );
  },

  get enterOrganizationNameInput() {
    return cy.get("input[placeholder='Enter name...']");
  },

  get cancelButton() {
    return cy.get("button[name='prev_btn']");
  },

  get nextButton() {
    return cy.get("button[name='next_btn']");
  },

  get closeButton() {
    return cy.get("button[name='close-new-board-modal-btn']");
  },
  get confirmationButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  },

  createOrganization(name) {
    this.addNewOrganizationButton.should("have.text", "Add new Organization");
    this.addNewOrganizationButton.click();
    this.enterOrganizationNameInput.type(name);
    this.nextButton.click().click();
    this.confirmationButton.click();
  },
};
