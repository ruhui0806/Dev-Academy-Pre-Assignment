describe('CityBike pages can be opened', function () {
    // beforeEach(function () {
    //     cy.visit('http://localhost:3000')
    // })
    it('home page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('This is the home page')
    })
    it('journeys page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.get('#journeys').click().wait(50000)
        cy.contains('Departure Station')
    })
    it('stations page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.get('#stations').click().wait(50000)
        cy.contains('Search Station by Name/Address')
    })
})

describe('search location on google autocomplete', function () {
    it('places can be searched on the map of homepage', function () {
        cy.visit('http://localhost:3000')
        cy.get('[role="combobox"]').should('be.visible')
        cy.get('.combobox-input:last').click().type('Espoo')
        cy.contains('Espoon keskus, Espoo, Finland').click()
        cy.contains(
            'Address: Espoon keskus, Espoo, Finland; Latitude: 60.20483739999999; Longitude: 24.6536221; Post Code: 02770'
        )
    })
})
describe('add station', function () {
    it.only('click addStation button will toggle the addstation form to show', function () {
        cy.visit('http://localhost:3000')
        cy.get('#addStationBtn').click()
        cy.get('#addStationModal').should('be.visible')
        cy.contains('Name')
    })
    // it.only('a new station can be created', function () {
    //     cy.visit('http://localhost:3000')
    //     cy.get('#addStationBtn').click()
    //     cy.get()
    //     cy.get('.combobox-input:last').click().type('Espoon')
    //     cy.contains('Espoon keskus, Espoo, Finland').click()
    //     cy.get('#submit').click()
    //     cy.visit('http://localhost:3000/stations').wait(5000)
    // })
})
