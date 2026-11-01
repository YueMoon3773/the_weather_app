import { tr } from 'date-fns/locale';
import { navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer } from './index';

type WeatherConditionType =
    | 'clear-night'
    | 'cloudy'
    | 'partly-cloudy-night'
    | 'rain-snow-showers-night'
    | 'showers-night'
    | 'snow-showers-night'
    | 'thunder'
    | 'thunder-rain'
    | 'thunder-showers-day'
    | 'thunder-showers-night'
    | 'wind';

interface ThemeHandlerManageObjType {
    getNightThemeConditions: () => WeatherConditionType[];
    isWeatherMatchNightTheme: (currentWeather: WeatherConditionType) => boolean;
    changeToLightTheme: () => void;
    changeToNightTheme: () => void;
}

const themeHandlerManageObj = (): ThemeHandlerManageObjType => {
    const nightThemeConditions: WeatherConditionType[] = [
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
    const getNightThemeConditions = (): WeatherConditionType[] => nightThemeConditions;

    /**
     * Check if the current condition name got from API is match to night theme.
     * @param {string} currentWeather - the name of current condition icon.
     * example value: 'partly-cloudy-night', 'showers-night', or 'rain-snow-showers-night'.
     * @returns {boolean} true if match, false is not.
     */
    const isWeatherMatchNightTheme = (currentWeather: WeatherConditionType): boolean => {
        const foundItem: WeatherConditionType | undefined = getNightThemeConditions().find(
            (item: WeatherConditionType): boolean => {
                return item === currentWeather;
            },
        );

        return foundItem === undefined ? false : true;
    };

    const elementList: Element[] = [navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer];

    const changeToNightTheme = (): void => {
        elementList.forEach((element: Element) => {
            if (!element.classList.contains('night')) {
                element.classList.add('night');
            }
        });
    };

    const changeToLightTheme = (): void => {
        elementList.forEach((element: Element) => {
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

export default themeHandlerManageObj;
