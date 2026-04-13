import { NetworkError } from "./utils/errorHandler.js";
import { getAllCountriesApi } from "./services/apiService.js";
import { getCountryByNameApi } from "./services/apiService.js";
import { getCountryByRegionApi } from "./services/apiService.js";

const inputSearchName = document.getElementById("inputSearchName")
const searchButton = document.getElementById("searchButton")
const countryContainer = document.getElementById("countryContainer")
const filterByRegion = document.getElementById("filterByRegion")

searchButton.addEventListener("click", function () {
    const countryName = inputSearchName.value.trim()
    if (countryName === "") {
        alert("Country name is required!")
        return
    }
    getCountryByName(countryName)
    inputSearchName.value = ""
});

filterByRegion.addEventListener("change", (event) => {
    const selectValue = event.target.value
    getCountryByRegion(selectValue)
    filterByRegion.value = ""
})

/**
 * Execute the api call
 * Catches any error that occurs and displays the appropriate error message
 * If no error occurs, it parses the api resonse to construct an array of country objects and
 * display on the console
 */
async function getAllCountries() {
    try {
        const countries = await getAllCountriesApi()
        displayCountries(countries)
    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(error.message)
        } else if (error instanceof Error) {
            console.log("Generic error: ", error.message)
        } else {
            console.log(" An unknown error has occurred.")
        }
    }
}

/**
 * Execute the api call
 * Catches any error that occurs and displays the appropriate error message
 * If no error occurs, it parses the api resonse to construct an array of country objects and
 * display on the console
 */
async function getCountryByName(countryName) {
    try {
        const country = await getCountryByNameApi(countryName)
        displayCountries(country)
    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(error.message)
        } else if (error instanceof Error) {
            console.log("Generic error: ", error.message)
            countryContainer.innerHTML = `<p class="text-danger">Generic error: ${error.message}</p>`;
            countryContainer.innerHTML = `<p class="text-danger">Generic error: ${error.message}</p>`
        } else {
            console.log(" An unknown error has occurred.")
            countryContainer.innerHTML = `<p class="text-danger"> An unknown error has occurred.</p>`;
        }
    }
}

/**
 * Execute the api call
 * Catches any error that occurs and displays the appropriate error message
 * If no error occurs, it parses the api resonse to construct an array of country objects and
 * display on the console
 */
async function getCountryByRegion(countryRegion) {
    try {
        const countries = await getCountryByRegionApi(countryRegion)
        displayCountries(countries)
    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(error.message)
        } else if (error instanceof Error) {
            console.log("Generic error: ", error.message)
        } else {
            console.log(" An unknown error has occurred.")
        }
    }
}

function displayCountries(countryResults) {
    countryContainer.innerHTML = ""
    countryResults.forEach(country => {
        const col = document.createElement("div")
        col.className = "col"
        col.innerHTML = `
            <div class="card h-100">
             <img src="${country.flags.png}" class="card-img-top p-3" style="height: 200px; object-fit: contain;" alt=${country.name.common}>
                <div class="card-body">
                    <h5 class="card-title text-truncate">${country.name.common}</h5>
                     <p class="card-text">Population: ${country.population}</p>
                     <p class="card-text">Region: ${country.region}</p>
                     <p class="card-text">Capital: ${country.capital}</p>
                </div>
            </div> `
        col.addEventListener('click', () => {
            moveToDetails(country.flags.png, country.name.common, country.population, country.region, country.capital)
        });
        countryContainer.appendChild(col)
    });
}

function moveToDetails(flag, name, population, region, capital) {
    window.location.href = `details.html?flag=${flag}&name=${name}&population=${population}&region=${region}&capital=${capital}`;
}

window.onload = () => {
    getAllCountries()
}
