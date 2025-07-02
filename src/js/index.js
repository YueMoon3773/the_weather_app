import '../css/style.css';

const bgImg = document.querySelector('.bgImg');
// NAV BAR ELEMENTS
const navSearchInp = document.querySelector('.navSearchInp');
const navSearchClearBtn = document.querySelector('.navSearchClearWrapper');
const navSearchBtn = document.querySelector('.navSearchBtn');

const navTempBtnCelsius = document.querySelector('.navTempBtn[data-type="celsius"]');
const navTempBtnFahrenheit = document.querySelector('.navTempBtn[data-type="fahrenheit"]');
const navSpeedBtnMph = document.querySelector('.navSpeedBtn[data-type="mph"]');
const navSpeedBtnKmh = document.querySelector('.navSpeedBtn[data-type="km/h"]');
const navLocationBtn = document.querySelector('.navLocationWrapper');

// CURRENT BRIEF ELEMENTS
// CURRENT GENERAL ELEMENTS
const generalIcon = document.querySelector('.generalIcon');
const generalLeftTemp = document.querySelector('.generalLeftTemp');
const generalTempDegree = document.querySelector('.generalTempDegree');
const generalCondition = document.querySelector('.generalCondition');
const generalAddress = document.querySelector('.generalAddress');

const generalTempMinRange = document.querySelector('.generalTempRangeVal[data-type="minTemp"]');
const generalTempMaxRange = document.querySelector('.generalTempRangeVal[data-type="maxTemp"]');
const generalTempRangeDegree = document.querySelectorAll('.generalTempRangeDegree');

const generalFeelLikeTemp = document.querySelector('.generalFeelLikeTemp');
const generalFeelLikeTempDegree = document.querySelector('.generalFeelLikeTempDegree');
const generalDateText = document.querySelector('.generalDateText');

// CURRENT DETAILS ELEMENTS
const detailsCardRainValue = document.querySelector('.detailsCardValue[data-type="precipprob"]');
const detailsCardUvValue = document.querySelector('.detailsCardValue[data-type="uvindex"]');
const detailsCardHumidityValue = document.querySelector('.detailsCardValue[data-type="humidity"]');
const detailsCardWindgustValue = document.querySelector('.detailsCardValue[data-type="windgust"]');
const detailsCardSunriseValue = document.querySelector('.detailsCardValue[data-type="sunrise"]');
const detailsCardSunsetValue = document.querySelector('.detailsCardValue[data-type="sunset"]');

// VARIABLES DEFINITION
const APIKey = 'TNR5YYWZYAT8YJ8X2M8P8EQ47';

/**
 * Return the needed URL for each request.
 * @param {string} type - The type of request URL - could be inp location, user current location.
 * @param {string} location - location usr request through search inp.
 * @returns {string} A completed URL.
 */
const URLHandler = (APIkey, type = '', simpleLocation = '', longitude = '', latitude = '') => {
    let retURL;
    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    if (type === 'simpleLocation') {
        retURL = baseURL + simpleLocation + '?key=' + APIKey;
    } else if (type === 'currentLocation') {
        retURL = baseURL + longitude + ',' + latitude + '?key=' + APIKey;
    } else {
        retURL = baseURL + 'hochiminh?key=' + APIKey;
    }
    console.log({ retURL });

    return retURL;
};

/**
 * Return the data requested from URL by fetching from API.
 * @param {string} type - The type of request URL - could be inp location, user current location.
 * @param {string} location - location usr request through search inp.
 * @returns {string} A completed URL.
 */
const getDataFromAPI = async (APIkey, type = '', simpleLocation = '', longitude = '', latitude = '') => {
    const URL = URLHandler(APIkey, type, simpleLocation, longitude, latitude);

    const res = await fetch(URL);
    const data = await res.json();

    return data;
};

const nightThemeConditions = [
    'clear-night',
    'cloudy',
    'partly-cloudy-night',
    'rain-snow-showers-night',
    'showers-night',
    'snow-showers-night',
    'thunder',
    'thunder-rain',
    'thunder-showers-day',
    'thunder-showers-night',
    'wind',
];
