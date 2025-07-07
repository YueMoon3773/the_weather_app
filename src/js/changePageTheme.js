import { tr } from 'date-fns/locale';
import { navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer } from './index.js';

const themeHandler = () => {
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
    const getNightThemeConditions = () => nightThemeConditions;

    /**
     * Check if the current condition name got from API is match to night theme.
     * @param {string} currentWeather - the name of current condition icon.
     * example value: 'partly-cloudy-night', 'showers-night', or 'rain-snow-showers-night'.
     * @returns {boolean} true if match, false is not.
     */
    const isWeatherMatchNightTheme = (currentWeather) => {
        const foundItem = getNightThemeConditions().find((item) => {
            return item === currentWeather;
        });

        return foundItem === undefined ? false : true;
    };

    const elementList = [navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer];

    const changeToNightTheme = () => {
        elementList.forEach((element) => {
            if (!element.classList.contains('night')) {
                element.classList.add('night');
            }
        });
    };

    const changeToLightTheme = () => {
        elementList.forEach((element) => {
            if (element.classList.contains('night')) {
                element.classList.remove('night');
            }
        });
    };

    return {
        getNightThemeConditions,
        isWeatherMatchNightTheme,
        changeToLightTheme,
        changeToNightTheme,
    };
};

export default themeHandler;
