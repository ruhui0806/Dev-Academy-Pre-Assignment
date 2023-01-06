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
        cy.contains('902')
        cy.contains('Derby Business Park')
        cy.contains('Tarvonsalmenkatu 17')
    })
    it('stations can be ordered by name', function () {
        cy.get('#btn-sort-name').click()
        cy.contains('204')
        cy.contains('A.I. Virtasen aukio')
        cy.contains('Gustaf Hällströmin katu 1')
    })
    it('stations can be ordered by address', function () {
        cy.get('#btn-sort-address').click().click()
        cy.contains('17')
        cy.contains('Varsapuistikko')
        cy.contains('Yrjö-Koskisen katu 1')
    })
    it('stations can be ordered by capacity', function () {
        cy.get('#btn-sort-capacity').click().click()
        cy.contains('627')
        cy.contains('Piispansilta 11')
        cy.contains('44')
    })
})

describe('search, pagination and filter journeys', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#journeys').click().wait(50000)
    })
    it('a journey can be searched', function () {
        cy.get('#nameToSearch').click().type('Ratsutori')
        cy.contains('Upseerinkatu')
    })
    it('a journey can be searched', function () {
        cy.contains('Ratsutori')
        cy.get('#durationToFilter').click().clear().type('10')
        cy.get('#durationFilter').click()
        cy.contains('Ratsutori').should('not.exist')
    })
    it.only('pagination can be used', function () {
        cy.contains('Pasilan asema')
        cy.get('#pagination').click().clear().type('2')
        cy.get('.page-item.page-link').click()
        cy.contains('Kaivopuisto')
        cy.contains('Pasilan asema').should('not.exist')
    })
})
