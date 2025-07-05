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
        changeToLightTheme,
        changeToNightTheme,
    };
};

export default themeHandler;
