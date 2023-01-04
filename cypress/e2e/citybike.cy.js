describe('CityBike pages can be opened', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('home page can be opened', function () {
        cy.contains('This is the home page')
    })
    it('journeys page can be opened', function () {
        cy.get('#journeys').click().wait(50000)
        cy.contains('Departure Station')
    })
    it('stations page can be opened', function () {
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

describe('add, search and delete a station', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('click addStation button will toggle the addstation form to show', function () {
        cy.get('#addStationBtn').click()
        cy.get('#addStationModal').should('be.visible')
        cy.contains('Name')
    })
    it('a new station can be created and it can be found in the station list', function () {
        cy.get('#addStationBtn').click()
        cy.get('#addStationModal').should('be.visible')
        cy.get('.combobox-input:first').click().type('Espoon')
        cy.contains('Espoontori, Kamreerintie, Espoo, Finland').click()
        cy.get('button[type=submit]').click()
        cy.get('#stations').click().wait(10000)
        cy.get('#nameToSearch').click().type('Espoontori')
        cy.contains('Kamreerintie')
    })
    it('search a station by address and click to the single station view page', function () {
        cy.get('#stations').click().wait(10000)
        cy.get('#nameToSearch').click().type('Metro')
        cy.contains('Itäkeskus Metrovarikko').click()
        cy.contains('Journeys start from here')
        cy.contains('1049')
    })
    it('a station can be deleted', function () {
        cy.get('#stations').click().wait(10000)
        cy.get('#nameToSearch').click().type('Espoontori')
        cy.get('.btn.btn-danger.btn-sm').click()
        cy.get('#nameToSearch').click().type('Espoontori')
        cy.contains('Kamereenrintie').should('not.exist')
    })
})

describe('order station by column', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#stations').click().wait(10000)
    })
    it('stations can be ordered by ID', function () {
        cy.get('#btn-sort-id').click()
        cy.contains('10581')
        cy.contains('Helsingin päärautatieasema')
        cy.contains('Kaivokatu')
    })
    it('stations can be ordered by name', function () {
        cy.get('#btn-sort-name').click()
        cy.contains('204')
        cy.contains('A.I. Virtasen aukio')
        cy.contains('Gustaf Hällströmin katu 1')
    })
    it('stations can be ordered by ID', function () {
        cy.get('#btn-sort-address').click().click()
        cy.contains('17')
        cy.contains('Varsapuistikko')
        cy.contains('Yrjö-Koskisen katu 1')
    })
    it('stations can be ordered by ID', function () {
        cy.get('#btn-sort-capacity').click().click()
        cy.contains('627')
        cy.contains('Piispansilta 11')
        cy.contains('44')
    })
})

describe('search, order and filter journeys', function () {
    it('a journey can be searched')
})
