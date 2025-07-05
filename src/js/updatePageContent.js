import { format } from 'date-fns';
import {
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
import pageControllerStatusHandler from './controllerStatusHandler.js';

export const hourCardConstructor = (parentElement, time, imgSrc, temp, tempUnit) => {
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

export const weekCardConstructor = (parentElement, imgSrc, date, minTemp, maxTemp, tempUnit) => {
    const dayOfWeek = dateTimeFormatter().getDayOfWeek(date);
    const dateAndMonth = dateTimeFormatter().getDateAndMonth(date);

    console.log(imgSrc);

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

export const updateGeneralContent = (tempUnit, speedUnit, APIdata) => {
    // update current general part
    generalIcon.src = getWeatherIcon(APIdata.currentConditions.icon);
    // generalIcon.src = `./img/svg_icon/${APIdata.currentConditions.icon}.svg`;

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

export const renderWeekCards = (tempUnit, APIdata) => {
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
