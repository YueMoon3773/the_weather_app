import '../css/style.css';
import handleAPI from './handleAPI.js';
import pageControllerStatusHandler from './controllerStatusHandler.js';
import { updateWholePageContent } from './updatePageContent.js';
// import handleUserLocation from './getUserCurrentLocationOpt.js';

export const bgImg = document.querySelector('.bgImg') as HTMLImageElement;
// NAV BAR ELEMENTS
const navSearchInp = document.querySelector('.navSearchInp') as HTMLInputElement;
const navSearchClearBtn = document.querySelector('.navSearchClearWrapper') as HTMLButtonElement;
const navSearchBtn = document.querySelector('.navSearchBtn') as HTMLButtonElement;

const navTempBtnCelsius = document.querySelector('.navTempBtn[data-value="c"]') as HTMLSpanElement;
const navTempBtnFahrenheit = document.querySelector('.navTempBtn[data-value="f"]') as HTMLSpanElement;
const navSpeedBtnMph = document.querySelector('.navSpeedBtn[data-value="mph"]') as HTMLSpanElement;
const navSpeedBtnKmh = document.querySelector('.navSpeedBtn[data-value="km/h"]') as HTMLSpanElement;
// const navLocationBtn = document.querySelector('.navLocationWrapper');

// CURRENT BRIEF ELEMENTS
// CURRENT GENERAL ELEMENTS
export const generalIcon = document.querySelector('.generalIcon') as HTMLImageElement;
export const generalLeftTempValue = document.querySelector('.generalLeftTemp') as Element;
export const generalTempDegreeUnit = document.querySelector('.generalTempDegreeUnit') as Element;
export const generalCondition = document.querySelector('.generalCondition') as Element;
export const generalAddress = document.querySelector('.generalAddress') as Element;

export const generalTempMinRange = document.querySelector('.generalTempRangeVal[data-type="minTemp"]') as Element;
export const generalTempMaxRange = document.querySelector('.generalTempRangeVal[data-type="maxTemp"]') as Element;
export const generalTempRangeDegreeUnit = document.querySelectorAll<HTMLSpanElement>('.generalTempRangeDegreeUnit');

export const generalFeelLikeTemp = document.querySelector('.generalFeelLikeTemp') as Element;
export const generalFeelLikeTempDegreeUnit = document.querySelector('.generalFeelLikeTempDegreeUnit') as Element;
export const generalDateText = document.querySelector('.generalDateText') as Element;

// CURRENT DETAILS ELEMENTS
export const detailsCardRainValue = document.querySelector('.detailsCardValue[data-type="precipprob"]') as Element;
export const detailsCardUvValue = document.querySelector('.detailsCardValue[data-type="uvindex"]') as Element;
export const detailsCardHumidityValue = document.querySelector('.detailsCardValue[data-type="humidity"]') as Element;
export const detailsCardWindgustValue = document.querySelector('.detailsCardValue[data-type="windgust"]') as Element;
export const detailsCardWindgustUnit = document.querySelector('.detailsCardUnit[data-type="windgust"]') as Element;
export const detailsCardSunriseValue = document.querySelector('.detailsCardValue[data-type="sunrise"]') as Element;
export const detailsCardSunsetValue = document.querySelector('.detailsCardValue[data-type="sunset"]');

// HOUR / WEEK ELEMENTS
export const hourCardWrapper = document.querySelector('.hourCardWrapper') as Element;
export const weekCardWrapper = document.querySelector('.weekCardWrapper') as Element;

// THEME ELEMENTS
export const navBar = document.querySelector('.navBar') as Element;
export const generalLeft = document.querySelector('.generalLeft') as Element;
export const generalRight = document.querySelector('.generalRight') as Element;
export const currentDetails = document.querySelector('.currentDetails') as Element;
export const hoursBrief = document.querySelector('.hoursBrief') as Element;
export const weekBrief = document.querySelector('.weekBrief') as Element;
export const footer = document.querySelector('.footer') as Element;

// LOADING ELEMENTS
export const content = document.querySelector('.content') as Element;
export const loadingImgWrapper = document.querySelector('.loadingImgWrapper') as Element;

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
