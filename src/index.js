import { Country } from "./models/Country.js";
import { NetworkError } from "./utils/errorHandler.js";
import { getAllCountriesApi } from "./services/apiService.js";


let countryList = [];

/**
 * Execute the api call
 * Catches any error that occurs and 
 * displays the appropriate error message
 * If no error occurs, it parses the api resonse
 * to construct an array of country objects and
 * display on the console
 */
(async () => {
    try {
        const countries = await getAllCountriesApi()

        //console.log(countries)

        //for (const country of countries) {
            //console.log(country.name.common)
           // console.log(country.capital[0])
            //console.log(country.region)
            //console.log(country.population)
            //console.log(country.flags.png)
       // }

        for (const country of countries) {
            const name = country.name.common
            const capital = country.capital[0]
            const population =  country.population
            const region = country.region
            const flag = country.flags.png

            countryList.push(new Country(name, capital, population, region, flag))
        }
        console.log("Country details: \n")
        for (const country of countryList) {
            console.log(country.displayCountryDetails())
        }

    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(error.message)
        } else if (error instanceof Error) {
            console.log("Generic error: ", error.message)
        } else {
            console.log(" An unknown error has occurred.")
        }
    }

})()
