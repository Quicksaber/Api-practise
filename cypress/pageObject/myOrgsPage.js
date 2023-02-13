import { randomStringGenerator } from "../support/generator";

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

  createOrganization(nameLenght) {
    this.addNewOrganizationButton.click();
    this.enterOrganizationNameInput.type(randomStringGenerator(nameLenght));
    this.nextButton.click();
    this.nextButton.click();
  },
};
