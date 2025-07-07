import '../css/style.css';
import handleAPI from './handleAPI.js';
import pageControllerStatusHandler from './controllerStatusHandler.js';
import { updateWholePageContent } from './updatePageContent.js';
// import handleUserLocation from './getUserCurrentLocationOpt.js';

export const bgImg = document.querySelector('.bgImg');
// NAV BAR ELEMENTS
const navSearchInp = document.querySelector('.navSearchInp');
const navSearchClearBtn = document.querySelector('.navSearchClearWrapper');
const navSearchBtn = document.querySelector('.navSearchBtn');

const navTempBtnCelsius = document.querySelector('.navTempBtn[data-value="c"]');
const navTempBtnFahrenheit = document.querySelector('.navTempBtn[data-value="f"]');
const navSpeedBtnMph = document.querySelector('.navSpeedBtn[data-value="mph"]');
const navSpeedBtnKmh = document.querySelector('.navSpeedBtn[data-value="km/h"]');
const navLocationBtn = document.querySelector('.navLocationWrapper');

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

// LOADING ELEMENTS
export const content = document.querySelector('.content');
export const loadingImgWrapper = document.querySelector('.loadingImgWrapper');

// VARIABLES DEFINITION
let localAPIdata;
const pageControllerStatus = pageControllerStatusHandler();
// const userLocation = handleUserLocation();

// INITIALIZE PAGE
localAPIdata = await handleAPI().getDataFromAPI();
updateWholePageContent(
    pageControllerStatus.getPageCurrentTempUnit(),
    pageControllerStatus.getPageCurrentSpeedUnit(),
    localAPIdata,
);

//process take data from API by keyword from search input + display data to screen
const handleSearch = async () => {
    const searchInpValue = navSearchInp.value;

    // if search inp only contains space or empty string return
    // otherwise get api data and change website content.
    if (!searchInpValue.trim() || searchInpValue === '') {
        navSearchInp.setCustomValidity(false);
        alert('Please fill the location before search.');
        return;
    } else {
        localAPIdata = await handleAPI().getDataFromAPI('simpleLocation', searchInpValue);
        console.log('local data:', localAPIdata);

        updateWholePageContent(
            pageControllerStatus.getPageCurrentTempUnit(),
            pageControllerStatus.getPageCurrentSpeedUnit(),
            localAPIdata,
        );
    }
};

//Clear inp data in the search inp
navSearchClearBtn.addEventListener('click', () => {
    navSearchInp.value = '';
});

// If search input get enter key process the search and display content
navSearchInp.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        handleSearch();
    }
});

// search and display result after hitting search btn
navSearchBtn.addEventListener('click', async () => {
    handleSearch();
});

// change temperature unit
navTempBtnCelsius.addEventListener('click', (e) => {
    pageControllerStatus.switchActiveControlBtn(navTempBtnCelsius, navTempBtnFahrenheit);
    // console.log(pageControllerStatus.getPageCurrentControllerStatus());

    updateWholePageContent(
        pageControllerStatus.getPageCurrentTempUnit(),
        pageControllerStatus.getPageCurrentSpeedUnit(),
        localAPIdata,
    );

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});

navTempBtnFahrenheit.addEventListener('click', (e) => {
    pageControllerStatus.switchActiveControlBtn(navTempBtnFahrenheit, navTempBtnCelsius);
    // console.log(pageControllerStatus.getPageCurrentControllerStatus());

    updateWholePageContent(
        pageControllerStatus.getPageCurrentTempUnit(),
        pageControllerStatus.getPageCurrentSpeedUnit(),
        localAPIdata,
    );

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});

// change speed unit
navSpeedBtnMph.addEventListener('click', (e) => {
    pageControllerStatus.switchActiveControlBtn(navSpeedBtnMph, navSpeedBtnKmh);
    // console.log(pageControllerStatus.getPageCurrentControllerStatus());

    updateWholePageContent(
        pageControllerStatus.getPageCurrentTempUnit(),
        pageControllerStatus.getPageCurrentSpeedUnit(),
        localAPIdata,
    );

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});

navSpeedBtnKmh.addEventListener('click', (e) => {
    pageControllerStatus.switchActiveControlBtn(navSpeedBtnKmh, navSpeedBtnMph);
    // console.log(pageControllerStatus.getPageCurrentControllerStatus());

    updateWholePageContent(
        pageControllerStatus.getPageCurrentTempUnit(),
        pageControllerStatus.getPageCurrentSpeedUnit(),
        localAPIdata,
    );

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});
