describe("Homepage", () => {
    it("Should remove cookie banner", () => {
        cy.visit("/");
        cy.get('.order-3 > [data-test="submit-button"]').click();
        cy.get('.order-3 > [data-test="submit-button"]').should('not.exist');
    })
})