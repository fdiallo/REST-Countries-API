/**
 * Define a model class used to map api response data
 */

export class Country {
    constructor(name, capital, population, region, flag) {
        this.name = name
        this.population = population
        this.region = region
        this.capital = capital
        this.flag = flag
    }

    displayCountryDetails() {
        return `
        Name: ${this.name} 
        Capital: ${this.capital}
        Population: ${this.population}
        Region: ${this.region}
        Flag: ${this.flag}`
    }
}