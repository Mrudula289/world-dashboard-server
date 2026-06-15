const express = require("express");
const router = express.Router();


const {
  getStats,
  getTopCountries,
  getContinentPopulation,
  getLargestCountries,
  getCountriesByRegion,
  getLanguagesBySpeakers,
  searchCountry

} = require("../controllers/dashboardController");



router.get("/stats", getStats);

router.get("/top-countries", getTopCountries);

router.get("/continent-population", getContinentPopulation);

router.get("/largest-countries", getLargestCountries);

router.get("/countries-by-region", getCountriesByRegion);

router.get("/languages-by-speakers", getLanguagesBySpeakers);

router.get("/search-country", searchCountry);



module.exports = router;