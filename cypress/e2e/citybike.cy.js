describe('CityBike pages can be opened', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('home page can be opened', function () {
        cy.contains('This is the home page')
    })
    it('journeys page can be opened', function () {
        cy.get('#journeys').click().wait(10000)
        cy.contains('Departure Station')
    })
    it('stations page can be opened', function () {
        cy.get('#stations').click().wait(10000)
        cy.contains('Search Station by Name/Address')
    })
})

describe('search location on google autocomplete', function () {
    it('places can be searched on the map of homepage', function () {
        cy.visit('http://localhost:3000')
        cy.get('[role="combobox"]').should('be.visible')
        cy.get('.combobox-input:last').click().type('Espoo')
        cy.contains('Espoon keskus, Espoo, Finland').click()
        cy.contains('Latitude: 60.20483739999999')
        cy.contains('Longitude: 24.6536221')
    })
})

describe('add, search, update and delete a station', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('click addStation button will toggle the addstation form to show', function () {
        cy.get('#addStationBtn').click()
        cy.get('#addStationModal').should('be.visible')
        cy.contains('Name')
    })
    it('a new station can be created, then can be found in the station list, then can be deleted', function () {
        cy.get('#addStationBtn').click()
        cy.get('#addStationModal').should('be.visible')
        cy.get('.combobox-input:first').click().type('Espoon')
        cy.contains('Espoontori, Kamreerintie, Espoo, Finland').click()
        cy.get('#name').click().type('Espoontori')
        cy.get('#nimi').click().type('Espoontori')
        cy.get('#osoite').click().type('Kamreerintie')
        cy.get('button[type=submit]').click()
        cy.get('#stations').click().wait(1000)
        cy.get('#nameToSearch').click().type('Espoontori')
        cy.get('tr td:nth-child(3):first').should('have.text', 'Kamreerintie')
        cy.get('.btn.btn-danger.btn-sm').click()
        cy.get('#nameToSearch').click().clear().type('Espoontori')
        cy.contains('Kamereenrintie').should('not.exist')
    })
    it('search a station by address and click to the single station view page', function () {
        cy.get('#stations').click().wait(10000)
        cy.get('#nameToSearch').click().type('Metro')
        cy.contains('Itäkeskus Metrovarikko').click()
        cy.contains('Journeys start from here')
        cy.contains('1049')
    })
    it('a station can be updated', function () {
        cy.get('#stations').click().wait(1000)
        cy.get('tr td:nth-child(1):first').click().wait(1000)
        cy.get('tr td:nth-child(4):first').should('not.have.text', 'Helsinki')
        cy.get('#updateStationBtn').click()
        cy.get('#kaupunki').click().type('Helsinki').click()
        cy.get('#submit').click()
        cy.get('tr td:nth-child(4):first').should('have.text', 'Helsinki')
        cy.get('#stations').click().wait(1000)
        cy.get('tr td:nth-child(1):first').click().wait(1000)
        cy.get('#updateStationBtn').click()
        cy.get('#kaupunki').click().clear().click()
        cy.get('#submit').click()
        cy.get('tr td:nth-child(4):first').should('not.have.text', 'Helsinki')
        // cy.get('tr td:nth-child(4):first').contains('Helsinki').should('not.exist')
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

describe('search, pagination, order and filter journeys', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#journeys').click().wait(10000)
    })
    it('a journey can be searched', function () {
        cy.get('#nameToSearch').click().type('Ratsutori')
        cy.contains('Upseerinkatu')
    })
    it('journey list can be filtered by duration', function () {
        cy.contains('Ratsutori')
        cy.get('#durationToFilter').click().clear().type('10')
        cy.get('#durationFilter').click()
        cy.contains('Ratsutori').should('not.exist')
    })
    it('pagination can be used', function () {
        cy.contains('Pasilan asema')
        cy.get('#pagination').click().clear().type('2')
        cy.get('.page-item.page-link').click()
        cy.contains('Kaivopuisto')
        cy.contains('Pasilan asema').should('not.exist')
    })
    it('journey list can be ordered by depature station', function () {
        cy.get('tr td:nth-child(1):first')
            .contains('Ratsutori')
            .should('be.visible')
        cy.get('#sort-by-departure-station').click()
        cy.get('tr td:nth-child(1):first')
            .contains('Arabian kauppakeskus')
            .should('be.visible')
    })
    it('journey list can be ordered by return station', function () {
        cy.get('tr td:nth-child(2):first')
            .contains('Upseerinkatu')
            .should('be.visible')
        cy.get('#sort-by-return-station').click()
        cy.get('tr td:nth-child(2):first')
            .contains('Brahen puistikko')
            .should('be.visible')
    })
    it('journey list can be ordered by covered distance', function () {
        cy.get('tr td:nth-child(3):first')
            .contains('0.549')
            .should('be.visible')
        cy.get('#sort-by-distance').click().click()
        cy.get('tr td:nth-child(3):first')
            .contains('5.366')
            .should('be.visible')
    })
    it('journey list can be ordered by duration', function () {
        cy.get('tr td:nth-child(4):first').contains('3').should('be.visible')
        cy.get('#sort-by-duration').click()
        cy.get('tr td:nth-child(4):first').contains('51').should('be.visible')
    })
})
