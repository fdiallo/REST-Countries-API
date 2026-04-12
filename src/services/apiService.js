import { Country } from "../models/Country.js";
import { NetworkError } from "../utils/errorHandler.js";

/**
 * Define a function called getAllCountriesApi that makes 
 * an api call using the fetch api
 * @returns Promise
 */
export async function getAllCountriesApi() {
    const url = "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags"
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new NetworkError(`Network Error! Status: ${response.status}`)
        }
        const data = await response.json()
        //clearconsole.log(data)
        return data

    } catch (error) {
        console.log(error)
    } finally {
        console.log("Api call has been attempted!\n")
    }
}

//getAllCountriesApi()