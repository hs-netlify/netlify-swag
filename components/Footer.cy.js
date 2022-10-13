import Footer from './Footer';

describe('Subscribe', () => {
    it('contains the correct placeholder test', () => {
        cy.mount(<Footer />)
        cy.get("input").should("have.attr", "placeholder", "Enter your email")
    })

    it.only('allows users to enter email address', () => {
        cy.mount(<Footer />)
        cy.get('[data-test="submit-button"]').click()
    })
})