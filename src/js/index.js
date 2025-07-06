import { roundToNearestHours, format } from 'date-fns';

import '../css/style.css';
import pageControllerStatusHandler from './controllerStatusHandler.js';
import { updateGeneralContent, renderHourCards, renderWeekCards } from './updatePageContent.js';

// import { hourCardConstructor } from './updatePageContent.js';
// import { weekCardConstructor } from './updatePageContent.js';
// hourCardConstructor('', '04:48:35', '', '', '');
// weekCardConstructor('', '', '2025-07-02', '', '', '');

// AI: Change page theme based on currentDetails.icon

const bgImg = document.querySelector('.bgImg');
// NAV BAR ELEMENTS
const navSearchInp = document.querySelector('.navSearchInp');
const navSearchClearBtn = document.querySelector('.navSearchClearWrapper');
const navSearchBtn = document.querySelector('.navSearchBtn');

export const navTempBtnCelsius = document.querySelector('.navTempBtn[data-type="celsius"]');
export const navTempBtnFahrenheit = document.querySelector('.navTempBtn[data-type="fahrenheit"]');
export const navSpeedBtnMph = document.querySelector('.navSpeedBtn[data-type="mph"]');
export const navSpeedBtnKmh = document.querySelector('.navSpeedBtn[data-type="km/h"]');
export const navLocationBtn = document.querySelector('.navLocationWrapper');

// CURRENT BRIEF ELEMENTS
// CURRENT GENERAL ELEMENTS
export const generalIcon = document.querySelector('.generalIcon');
export const generalLeftTempValue = document.querySelector('.generalLeftTemp');
export const generalTempDegreeUnit = document.querySelector('.generalTempDegreeUnit');
export const generalCondition = document.querySelector('.generalCondition');
export const generalAddress = document.querySelector('.generalAddress');

export const generalTempMinRange = document.querySelector('.generalTempRangeVal[data-type="minTemp"]');
export const generalTempMaxRange = document.querySelector('.generalTempRangeVal[data-type="maxTemp"]');
export const generalTempRangeDegreeUnit = document.querySelectorAll('.generalTempRangeDegreeUnit');

export const generalFeelLikeTemp = document.querySelector('.generalFeelLikeTemp');
export const generalFeelLikeTempDegreeUnit = document.querySelector('.generalFeelLikeTempDegreeUnit');
export const generalDateText = document.querySelector('.generalDateText');

// CURRENT DETAILS ELEMENTS
export const detailsCardRainValue = document.querySelector('.detailsCardValue[data-type="precipprob"]');
export const detailsCardUvValue = document.querySelector('.detailsCardValue[data-type="uvindex"]');
export const detailsCardHumidityValue = document.querySelector('.detailsCardValue[data-type="humidity"]');
export const detailsCardWindgustValue = document.querySelector('.detailsCardValue[data-type="windgust"]');
export const detailsCardWindgustUnit = document.querySelector('.detailsCardUnit[data-type="windgust"]');
export const detailsCardSunriseValue = document.querySelector('.detailsCardValue[data-type="sunrise"]');
export const detailsCardSunsetValue = document.querySelector('.detailsCardValue[data-type="sunset"]');

// HOUR / WEEK ELEMENTS
export const hourCardWrapper = document.querySelector('.hourCardWrapper');
export const weekCardWrapper = document.querySelector('.weekCardWrapper');

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
    let URL;

    try {
        URL = URLHandler(APIkey, type, simpleLocation, longitude, latitude);
        const res = await fetch(URL);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log('getDataFromAPI: ', e);
        // console.log('getDataFromAPI msg: ', e.message);
        URL = URLHandler(APIkey);
        const res = await fetch(URL);
        const data = await res.json();
        return data;
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
        const APIdata = await handleSearchLocationFromSearchInp(searchInpValue);
        console.log(APIdata);
        updateGeneralContent('c', 'km/h', APIdata);
        renderHourCards('c', APIdata);
        renderWeekCards('c', APIdata);
        // console.log(APIdata.currentConditions);
        // generalLeftTemp.firstChild.nodeValue = currentConditions.temp;
    }
});

// const time = '23:28:35';
// const split = time.split(':');
// // console.log(split);     //['20', '28', '14']

// const retu = format(
//     roundToNearestHours(new Date(0, 0, 0, split[0], split[1], split[2]), {
//         roundingMethod: 'ceil',
//     }),
//     "kk':'mm':'ss",
// );
// console.log({ retu }); //{retu: '17:00:00'}

// const verifyCurrentDayHasEnoughHours = (nearestTime) => {
//     let ret = {
//         isPass: true,
//         hoursNeeded: 0,
//     };
//     const timeSplit = nearestTime.split(':');
//     // console.log(timeSplit); //['20', '28', '14']

//     if (Number(timeSplit[0]) > 16 && timeSplit[0] !== '24') {
//         ret.hoursNeeded = 7 - (23 - Number(timeSplit[0]));
//         ret.isPass = false;
//     } else if (timeSplit[0] === '24') {
//         ret.hoursNeeded = 7;
//         ret.isPass = false;
//     }
//     return ret;
// };

// console.log(verifyCurrentDayHasEnoughHours(retu)); //{isPass: false, hoursNeeded: 1}

// const test = [
//     {
//         datetime: '00:00:00',
//     },
//     {
//         datetime: '01:00:00',
//     },
//     {
//         datetime: '02:00:00',
//     },
//     {
//         datetime: '03:00:00',
//     },
//     {
//         datetime: '04:00:00',
//     },
//     {
//         datetime: '05:00:00',
//     },
//     {
//         datetime: '06:00:00',
//     },
//     {
//         datetime: '07:00:00',
//     },
//     {
//         datetime: '08:00:00',
//     },
//     {
//         datetime: '09:00:00',
//     },
//     {
//         datetime: '10:00:00',
//     },
//     {
//         datetime: '11:00:00',
//     },
//     {
//         datetime: '12:00:00',
//     },
//     {
//         datetime: '13:00:00',
//     },
//     {
//         datetime: '14:00:00',
//     },
//     {
//         datetime: '15:00:00',
//     },
//     {
//         datetime: '16:00:00',
//     },
//     {
//         datetime: '17:00:00',
//     },
//     {
//         datetime: '18:00:00',
//     },
//     {
//         datetime: '19:00:00',
//     },
//     {
//         datetime: '20:00:00',
//     },
//     {
//         datetime: '21:00:00',
//     },
//     {
//         datetime: '22:00:00',
//     },
//     {
//         datetime: '23:00:00',
//     },
// ];
// // console.log(test.length);

// const getNearestHourIndex = (nearestTime, arrayToSearch) => {
//     let index;
//     if (nearestTime === '24:00:00') {
//         index = -1;
//     } else {
//         index = arrayToSearch.findIndex((item) => {
//             return item.datetime === nearestTime;
//         });
//     }
//     return index;
// };

// console.log(getNearestHourIndex(retu, test)); //17
