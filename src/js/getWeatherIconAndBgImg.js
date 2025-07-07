// IMPORT ICONS
import clearDayIcon from '../img/svg_icon/clear-day.svg';
import clearNightIcon from '../img/svg_icon/clear-night.svg';
import cloudyIcon from '../img/svg_icon/cloudy.svg';
import fogIcon from '../img/svg_icon/fog.svg';
import hailIcon from '../img/svg_icon/hail.svg';
import partlyCloudyDayIcon from '../img/svg_icon/partly-cloudy-day.svg';
import partlyCloudyNightIcon from '../img/svg_icon/partly-cloudy-night.svg';
import rainSnowShowersDayIcon from '../img/svg_icon/rain-snow-showers-day.svg';
import rainSnowShowersNightIcon from '../img/svg_icon/rain-snow-showers-night.svg';
import rainSnowIcon from '../img/svg_icon/rain-snow.svg';
import rainIcon from '../img/svg_icon/rain.svg';
import showersDayIcon from '../img/svg_icon/showers-day.svg';
import showersNightIcon from '../img/svg_icon/showers-night.svg';
import sleetIcon from '../img/svg_icon/sleet.svg';
import snowShowersDayIcon from '../img/svg_icon/snow-showers-day.svg';
import snowShowersNightIcon from '../img/svg_icon/snow-showers-night.svg';
import snowIcon from '../img/svg_icon/snow.svg';
import thunderRainIcon from '../img/svg_icon/thunder-rain.svg';
import thunderShowersDayIcon from '../img/svg_icon/thunder-showers-day.svg';
import thunderShowersNightIcon from '../img/svg_icon/thunder-showers-night.svg';
import thunderIcon from '../img/svg_icon/thunder.svg';
import windIcon from '../img/svg_icon/wind.svg';

// IMPORT BACKGROUND IMAGES
import clearDayBgImg from '../img/background/clear-day.png';
import clearNightBgImg from '../img/background/clear-night.png';
import cloudyBgImg from '../img/background/cloudy.png';
import fogBgImg from '../img/background/fog.png';
import hailBgImg from '../img/background/hail.png';
import partlyCloudyDayBgImg from '../img/background/partly-cloudy-day.png';
import partlyCloudyNightBgImg from '../img/background/partly-cloudy-night.png';
import rainSnowShowersDayBgImg from '../img/background/rain-snow-showers-day.png';
import rainSnowShowersNightBgImg from '../img/background/rain-snow-showers-night.png';
import rainSnowBgImg from '../img/background/rain-snow.png';
import rainBgImg from '../img/background/rain.png';
import showersDayBgImg from '../img/background/showers-day.png';
import showersNightBgImg from '../img/background/showers-night.png';
import sleetBgImg from '../img/background/sleet.png';
import snowShowersDayBgImg from '../img/background/snow-showers-day.png';
import snowShowersNightBgImg from '../img/background/snow-showers-night.png';
import snowBgImg from '../img/background/snow.png';
import thunderRainBgImg from '../img/background/thunder-rain.png';
import thunderShowersDayBgImg from '../img/background/thunder-showers-day.png';
import thunderShowersNightBgImg from '../img/background/thunder-showers-night.png';
import thunderBgImg from '../img/background/thunder.png';
import windBgImg from '../img/background/wind.png';

const weatherIconList = {
    'clear-day': clearDayIcon,
    'clear-night': clearNightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
    hail: hailIcon,
    'partly-cloudy-day': partlyCloudyDayIcon,
    'partly-cloudy-night': partlyCloudyNightIcon,
    'rain-snow-showers-day': rainSnowShowersDayIcon,
    'rain-snow-showers-night': rainSnowShowersNightIcon,
    'rain-snow': rainSnowIcon,
    rain: rainIcon,
    'showers-day': showersDayIcon,
    'showers-night': showersNightIcon,
    sleet: sleetIcon,
    'snow-showers-day': snowShowersDayIcon,
    'snow-showers-night': snowShowersNightIcon,
    snow: snowIcon,
    'thunder-rain': thunderRainIcon,
    'thunder-showers-day': thunderShowersDayIcon,
    'thunder-showers-night': thunderShowersNightIcon,
    thunder: thunderIcon,
    wind: windIcon,
};

const weatherBgImgList = {
    'clear-day': clearDayBgImg,
    'clear-night': clearNightBgImg,
    cloudy: cloudyBgImg,
    fog: fogBgImg,
    hail: hailBgImg,
    'partly-cloudy-day': partlyCloudyDayBgImg,
    'partly-cloudy-night': partlyCloudyNightBgImg,
    'rain-snow-showers-day': rainSnowShowersDayBgImg,
    'rain-snow-showers-night': rainSnowShowersNightBgImg,
    'rain-snow': rainSnowBgImg,
    rain: rainBgImg,
    'showers-day': showersDayBgImg,
    'showers-night': showersNightBgImg,
    sleet: sleetBgImg,
    'snow-showers-day': snowShowersDayBgImg,
    'snow-showers-night': snowShowersNightBgImg,
    snow: snowBgImg,
    'thunder-rain': thunderRainBgImg,
    'thunder-showers-day': thunderShowersDayBgImg,
    'thunder-showers-night': thunderShowersNightBgImg,
    thunder: thunderBgImg,
    wind: windBgImg,
};

const getWeatherIcon = (iconName) => weatherIconList[iconName];

const getBgImage = (bgName) => weatherBgImgList[bgName];

export { getWeatherIcon, getBgImage };
