import { randomStringGenerator } from "../support/generator";

module.exports = {
  get newBoardButton() {
    cy.get(".vs-c-organization-boards__item--add-new");
  },

  get enterBoardNameInput() {
    cy.get("input[placeholder='Enter title...']");
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

  get scrumRadioButton() {
    cy.get("span[name='type_scrum']");
  },

  get kanbanRadioButton() {
    cy.get("span[name='type_kanban']");
  },

  createBoard(nameLenght) {
    this.newBoardButton.click();
    this.nextButton.should("be.disabled");
    this.enterBoardNameInput.type(randomStringGenerator(nameLenght));
    this.nextButton.should("be.enabled");
    this.nextButton.click();
    this.nextButton.should("be.disabled");
    this.scrumRadioButton.click();
    this.nextButton.should("be.enabled");
    this.nextButton.click().click().click().click();
  },
};
