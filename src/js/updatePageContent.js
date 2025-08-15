import {
    bgImg,
    generalIcon,
    generalLeftTempValue,
    generalTempDegreeUnit,
    generalCondition,
    generalAddress,
    generalTempMinRange,
    generalTempMaxRange,
    generalTempRangeDegreeUnit,
    generalFeelLikeTemp,
    generalFeelLikeTempDegreeUnit,
    generalDateText,
    detailsCardRainValue,
    detailsCardUvValue,
    detailsCardHumidityValue,
    detailsCardWindgustValue,
    detailsCardWindgustUnit,
    detailsCardSunriseValue,
    detailsCardSunsetValue,
    hourCardWrapper,
    weekCardWrapper,
} from './index.js';
import dateTimeFormatter from './formatDateTime.js';
import { getWeatherIcon, getBgImage } from './getWeatherIconAndBgImg.js';
import unitConverter from './unitConverter.js';
import { verifyCurrentDayHasEnoughHours, getNearestHourIndex } from './supportRenderHours.js';
import themeHandler from './changePageTheme.js';

/**
 * Construct an hour card and append it to the parent element.
 * @param {string} parentElement - The parent element to append child.
 * @param {string} time - time data got from API.
 * @param {string} imgSrc - Image src got from getWeatherIcon function.
 * @param {string} tempUnit - tem unit got from the controllerStatusHandler.
 */
const hourCardConstructor = (parentElement, time, imgSrc, temp, tempUnit) => {
    const formattedTime = dateTimeFormatter().getHourOnly(time);

    // Create and append elements
    const hourCard = document.createElement('div');
    hourCard.className = 'hourCard';

    const hourCardTimeWrapper = document.createElement('div');
    hourCardTimeWrapper.className = 'hourCardTimeWrapper';
    const hourCardTimeValue = document.createElement('span');
    hourCardTimeValue.className = 'hourCardTimeValue';
    hourCardTimeValue.textContent = formattedTime;

    const hourCardIconWrapper = document.createElement('div');
    hourCardIconWrapper.className = 'hourCardIconWrapper';
    const hourCardIcon = document.createElement('img');
    hourCardIcon.className = 'hourCardIcon';
    hourCardIcon.src = imgSrc;
    hourCardIcon.setAttribute('alt', 'Weather condition');

    const hourCardTemp = document.createElement('span');
    hourCardTemp.className = 'hourCardTemp';
    const hourCardTempDegreeIcon = document.createElement('span');
    hourCardTempDegreeIcon.className = 'hourCardTempDegreeIcon';
    hourCardTempDegreeIcon.textContent = '°';
    const hourCardTempDegree = document.createElement('span');
    hourCardTempDegree.className = 'hourCardTempDegree';
    hourCardTempDegree.textContent = tempUnit;

    hourCardTimeWrapper.appendChild(hourCardTimeValue);
    hourCardIconWrapper.appendChild(hourCardIcon);
    hourCardTemp.appendChild(document.createTextNode(temp));
    hourCardTemp.appendChild(hourCardTempDegreeIcon);
    hourCardTemp.appendChild(hourCardTempDegree);
    hourCard.appendChild(hourCardTimeWrapper);
    hourCard.appendChild(hourCardIconWrapper);
    hourCard.appendChild(hourCardTemp);

    parentElement.appendChild(hourCard);
};

/**
 * Construct an week card and append it to the parent element.
 * @param {string} parentElement - The parent element to append child.
 * @param {string} date - date data got from API.
 * @param {string} minTemp - minTemp data got from API.
 * @param {string} maxTemp - maxTemp data got from API.
 * @param {string} imgSrc - Image src got from getWeatherIcon function.
 * @param {string} tempUnit - temp unit got from the controllerStatusHandler.
 */
const weekCardConstructor = (parentElement, imgSrc, date, minTemp, maxTemp, tempUnit) => {
    const dayOfWeek = dateTimeFormatter().getDayOfWeek(date);
    const dateAndMonth = dateTimeFormatter().getDateAndMonth(date);

    const weekCard = document.createElement('div');
    weekCard.className = 'weekCard';

    const weekCardIconWrapper = document.createElement('div');
    weekCardIconWrapper.className = 'weekCardIconWrapper';
    const weekCardIcon = document.createElement('img');
    weekCardIcon.className = 'weekCardIcon';
    weekCardIcon.src = imgSrc;
    weekCardIcon.setAttribute('alt', 'Weather condition');

    weekCardIconWrapper.appendChild(weekCardIcon);
    weekCard.appendChild(weekCardIconWrapper);

    const weekCardContent = document.createElement('div');
    weekCardContent.className = 'weekCardContent';
    const weekCardContentHeader = document.createElement('div');
    weekCardContentHeader.className = 'weekCardContentHeader';
    const weekCardHeaderDay = document.createElement('span');
    weekCardHeaderDay.className = 'weekCardHeaderDay';
    weekCardHeaderDay.textContent = dayOfWeek;
    const weekCardHeaderDate = document.createElement('span');
    weekCardHeaderDate.className = 'weekCardHeaderDate';
    weekCardHeaderDate.textContent = dateAndMonth;

    weekCardContentHeader.appendChild(weekCardHeaderDay);
    weekCardContentHeader.appendChild(weekCardHeaderDate);
    weekCardContent.appendChild(weekCardContentHeader);

    const weekCardContentBody = document.createElement('div');
    weekCardContentBody.className = 'weekCardContentBody';
    for (let i = 0; i < 2; i++) {
        const weekCardBodySide = document.createElement('div');
        weekCardBodySide.className = 'weekCardBodySide';
        const weekCardBodyText = document.createElement('span');
        weekCardBodyText.className = 'weekCardBodyText';
        const weekCardBodyTemp = document.createElement('span');
        weekCardBodyTemp.className = 'weekCardBodyTemp';
        if (i === 0) {
            weekCardBodySide.dataset.side = 'min';
            weekCardBodyText.textContent = 'Min';
            weekCardBodyTemp.appendChild(document.createTextNode(minTemp));
        } else {
            weekCardBodySide.dataset.side = 'max';
            weekCardBodyText.textContent = 'Max';
            weekCardBodyTemp.appendChild(document.createTextNode(maxTemp));
        }
        const weekCardBodyTempDegreeIcon = document.createElement('span');
        weekCardBodyTempDegreeIcon.className = 'weekCardBodyTempDegreeIcon';
        weekCardBodyTempDegreeIcon.textContent = '°';
        const weekCardBodyTempDegree = document.createElement('span');
        weekCardBodyTempDegree.className = 'weekCardBodyTempDegree';
        weekCardBodyTempDegree.textContent = tempUnit;

        weekCardBodyTemp.appendChild(weekCardBodyTempDegreeIcon);
        weekCardBodyTemp.appendChild(weekCardBodyTempDegree);
        weekCardBodySide.appendChild(weekCardBodyText);
        weekCardBodySide.appendChild(weekCardBodyTemp);
        weekCardContentBody.appendChild(weekCardBodySide);
    }

    weekCardContent.appendChild(weekCardContentBody);
    weekCard.appendChild(weekCardIconWrapper);
    weekCard.appendChild(weekCardContent);

    parentElement.appendChild(weekCard);
};

/**
 * update general information.
 * @param {string} tempUnit - temp unit got from the controllerStatusHandler.
 * @param {string} speedUnit - speed unit got from the controllerStatusHandler.
 * @param {string} APIdata -  data got from API.
 */
const updateGeneralContent = (tempUnit, speedUnit, APIdata) => {
    // update current general part
    generalIcon.src = getWeatherIcon(APIdata.currentConditions.icon);

    // update temperature based on the tempUnit
    if (tempUnit === 'c') {
        generalLeftTempValue.firstChild.nodeValue = APIdata.currentConditions.temp;
        generalTempMinRange.firstChild.nodeValue = APIdata.days[0].tempmin;
        generalTempMaxRange.firstChild.nodeValue = APIdata.days[0].tempmax;
        generalFeelLikeTemp.firstChild.nodeValue = APIdata.currentConditions.feelslike;
    } else if (tempUnit === 'f') {
        generalLeftTempValue.firstChild.nodeValue = unitConverter().celsiusToFahrenheit(APIdata.currentConditions.temp);
        generalTempMinRange.firstChild.nodeValue = unitConverter().celsiusToFahrenheit(APIdata.days[0].tempmin);
        generalTempMaxRange.firstChild.nodeValue = unitConverter().celsiusToFahrenheit(APIdata.days[0].tempmax);
        generalFeelLikeTemp.firstChild.nodeValue = unitConverter().celsiusToFahrenheit(
            APIdata.currentConditions.feelslike,
        );
    }
    generalTempDegreeUnit.textContent = tempUnit;
    generalTempRangeDegreeUnit.forEach((degreeUnit) => (degreeUnit.textContent = tempUnit));
    generalFeelLikeTempDegreeUnit.textContent = tempUnit;

    generalCondition.textContent = APIdata.currentConditions.conditions;
    generalAddress.textContent = APIdata.resolvedAddress;
    generalDateText.textContent = APIdata.days[0].datetime;

    // update current details parts
    detailsCardRainValue.textContent = APIdata.currentConditions.precipprob;
    detailsCardUvValue.textContent = APIdata.currentConditions.uvindex;
    detailsCardHumidityValue.textContent = APIdata.currentConditions.humidity;
    detailsCardWindgustValue.textContent = APIdata.currentConditions.windgust;
    detailsCardWindgustUnit.textContent = speedUnit;
    detailsCardSunriseValue.textContent = dateTimeFormatter().getHourAndMinute(APIdata.currentConditions.sunrise);
    detailsCardSunsetValue.textContent = dateTimeFormatter().getHourAndMinute(APIdata.currentConditions.sunset);
};

/**
 * render all week card based on the data got from API.
 * @param {string} tempUnit - temp unit got from the controllerStatusHandler.
 * @param {string} APIdata -  data got from API.
 */
const renderWeekCards = (tempUnit, APIdata) => {
    weekCardWrapper.innerHTML = '';

    for (let i = 1; i < 4; i++) {
        const data = APIdata.days[i];
        // let weekCard;
        if (tempUnit === 'c') {
            weekCardConstructor(
                weekCardWrapper,
                getWeatherIcon(data.icon),
                data.datetime,
                data.tempmin,
                data.tempmax,
                tempUnit,
            );
        } else if (tempUnit === 'f') {
            weekCardConstructor(
                weekCardWrapper,
                getWeatherIcon(data.icon),
                data.datetime,
                unitConverter().celsiusToFahrenheit(data.tempmin),
                unitConverter().celsiusToFahrenheit(data.tempmax),
                tempUnit,
            );
        }
    }
};

/**
 * render all hour card based on the data got from API.
 * @param {string} tempUnit - temp unit got from the controllerStatusHandler.
 * @param {string} APIdata -  data got from API.
 */
const renderHourCards = (tempUnit, APIdata) => {
    hourCardWrapper.innerHTML = '';

    const nearestHour = dateTimeFormatter().getNearestHour(APIdata.currentConditions.datetime);
    // console.log({ nearestHour });   //{nearestHour: '13:00:00'}
    const verifiedNearestHour = verifyCurrentDayHasEnoughHours(nearestHour);
    // console.log({ verifiedNearestHour });   //{isPass: true, hoursNeeded: 0}
    const nearestHourIndex = getNearestHourIndex(nearestHour, APIdata.days[0].hours);
    // console.log({ nearestHourIndex });  //{nearestHourIndex: 13}

    if (verifiedNearestHour.isPass) {
        for (let i = nearestHourIndex; i < nearestHourIndex + 7; i++) {
            if (tempUnit === 'c') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[0].hours[i].datetime,
                    getWeatherIcon(APIdata.days[0].hours[i].icon),
                    APIdata.days[0].hours[i].temp,
                    tempUnit,
                );
            } else if (tempUnit === 'f') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[0].hours[i].datetime,
                    getWeatherIcon(APIdata.days[0].hours[i].icon),
                    unitConverter().celsiusToFahrenheit(APIdata.days[0].hours[i].temp),
                    tempUnit,
                );
            }
        }
    } else if (!verifiedNearestHour.isPass && verifiedNearestHour.hoursNeeded === 7) {
        for (let i = 0; i < verifiedNearestHour.hoursNeeded; i++) {
            if (tempUnit === 'c') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[1].hours[i].datetime,
                    getWeatherIcon(APIdata.days[1].hours[i].icon),
                    APIdata.days[1].hours[i].temp,
                    tempUnit,
                );
            } else if (tempUnit === 'f') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[1].hours[i].datetime,
                    getWeatherIcon(APIdata.days[1].hours[i].icon),
                    unitConverter().celsiusToFahrenheit(APIdata.days[1].hours[i].temp),
                    tempUnit,
                );
            }
        }
    } else {
        for (let i = nearestHourIndex; i < 24; i++) {
            if (tempUnit === 'c') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[0].hours[i].datetime,
                    getWeatherIcon(APIdata.days[0].hours[i].icon),
                    APIdata.days[0].hours[i].temp,
                    tempUnit,
                );
            } else if (tempUnit === 'f') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[0].hours[i].datetime,
                    getWeatherIcon(APIdata.days[0].hours[i].icon),
                    unitConverter().celsiusToFahrenheit(APIdata.days[0].hours[i].temp),
                    tempUnit,
                );
            }
        }
        for (let i = 0; i < verifiedNearestHour.hoursNeeded - 1; i++) {
            if (tempUnit === 'c') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[1].hours[i].datetime,
                    getWeatherIcon(APIdata.days[1].hours[i].icon),
                    APIdata.days[1].hours[i].temp,
                    tempUnit,
                );
            } else if (tempUnit === 'f') {
                hourCardConstructor(
                    hourCardWrapper,
                    APIdata.days[1].hours[i].datetime,
                    getWeatherIcon(APIdata.days[1].hours[i].icon),
                    unitConverter().celsiusToFahrenheit(APIdata.days[1].hours[i].temp),
                    tempUnit,
                );
            }
        }
    }
};

/**
 * Update background Img based on the data got from API.
 * @param {string} APIdata - temp unit got from getBgImage function.
 */
const updateBgImg = (APIdata) => {
    bgImg.src = getBgImage(APIdata.currentConditions.icon);
};

/**
 * update whole page content with all the function above + change theme.
 * @param {string} tempUnit - temp unit got from the controllerStatusHandler.
 * @param {string} speedUnit - speed unit got from the controllerStatusHandler.
 * @param {string} APIdata -  data got from API.
 */
const updateWholePageContent = (tempUnit, speedUnit, APIdata) => {
    updateGeneralContent(tempUnit, speedUnit, APIdata);
    renderHourCards(tempUnit, APIdata);
    renderWeekCards(tempUnit, APIdata);
    updateBgImg(APIdata);

    const isNightTheme = themeHandler().isWeatherMatchNightTheme(APIdata.currentConditions.icon);
    if (isNightTheme) {
        themeHandler().changeToNightTheme();
    } else {
        themeHandler().changeToLightTheme();
    }
};

export { updateWholePageContent };
