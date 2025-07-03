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

// THEME ELEMENTS
export const navBar = document.querySelector('.navBar');
export const generalLeft = document.querySelector('.generalLeft');
export const generalRight = document.querySelector('.generalRight');
export const currentDetails = document.querySelector('.currentDetails');
export const hoursBrief = document.querySelector('.hoursBrief');
export const weekBrief = document.querySelector('.weekBrief');
export const footer = document.querySelector('.footer');

// VARIABLES DEFINITION
const APIKey = 'TNR5YYWZYAT8YJ8X2M8P8EQ47';

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

const themeElements = [navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer];

/**
 * Return the needed URL for each request.
 * @param {string} type - The type of request URL - could be inp location, user current location.
 * accept value: 'simpleLocation', 'currentLocation', or ''.
 * @param {string} simpleLocation - location usr request through search inp.
 * @param {string} longitude - user's current location get by user information.
 * @param {string} latitude - user's current location get by user information.
 * @returns {string} A completed URL.
 */
const URLHandler = (APIkey, type = '', simpleLocation = '', longitude = '', latitude = '') => {
    let retURL;
    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    if (type === 'simpleLocation') {
        retURL = baseURL + simpleLocation + '?unitGroup=metric&key=' + APIKey;
    } else if (type === 'currentLocation') {
        retURL = baseURL + longitude + ',' + latitude + '?unitGroup=metric&key=' + APIKey;
    } else {
        retURL = baseURL + 'hochiminh?unitGroup=metric&key=' + APIKey;
    }
    console.log({ retURL });

    return retURL;
};

/**
 * Return the data requested from URL by fetching from API.
 * @param {string} type - The type of request URL - could be inp location, user current location.
 * @param {string} simpleLocation - location usr request through search inp.
 * @param {string} longitude - user's current location get by user information.
 * @param {string} latitude - user's current location get by user information.
 * @returns {Promise} A completed data retrieved from URL by API.
 */
const getDataFromAPI = async (APIkey, type = '', simpleLocation = '', longitude = '', latitude = '') => {
    const URL = URLHandler(APIkey, type, simpleLocation, longitude, latitude);

    try {
        const res = await fetch(URL);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log('getDataFromAPI: ', e);
        // console.log('getDataFromAPI msg: ', e.message);
        return e;
    }
};

// Clear inp data in the search inp
navSearchClearBtn.addEventListener('click', () => {
    navSearchInp.value = '';
});

const handleSearchLocationFromSearchInp = async (location) => {
    try {
        const data = await getDataFromAPI(APIKey, 'simpleLocation', location);
        // console.log(data);
        return data;
    } catch (e) {
        // console.log('handleSearchLocationFromSearchInp: ', e);
        // console.log('handleSearchLocationFromSearchInp msg: ', e.message);
        return e;
    }
};

navSearchBtn.addEventListener('click', async () => {
    const searchInpValue = navSearchInp.value;

    // if search inp only contains space or empty string return
    // otherwise get api data and change website content.
    if (!searchInpValue.trim() || searchInpValue === '') {
        navSearchInp.setCustomValidity(false);
        alert('Please fill the location before search.');
        return;
    } else {
        try {
            const APIdata = await handleSearchLocationFromSearchInp(searchInpValue);
            console.log({ APIdata });
            console.log(APIdata.currentConditions);
        } catch (e) {
            // console.log('listener err: ', e);
            // console.log('listener err msg: ', e.message);
            console.log(e);
        }
    }
});
