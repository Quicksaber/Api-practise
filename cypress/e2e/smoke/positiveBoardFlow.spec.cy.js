import organization from "../../API/organization"
import board from "../../API/boards"

describe("api test/boards", () => {
    beforeEach(() => {
      cy.sessionLogin(Cypress.env('email'), Cypress.env('password'))
    });

    it('Create new board', () => {
        organization.createOrganization({
            title : "boardTestOrg",
            testMessage : Cypress.currentTest.title
        }).then((response) => {
            board.createBoard({
                orgId : response
            })
        })
    })

    it('Change board type', () => {
        board.changeBoardType({
            type: "kanban_board",
            boardId : 13844
        })
    })

    it('Delete board', () => {
        board.deleteBoard({
            boardId : 13846
        })
    })

})