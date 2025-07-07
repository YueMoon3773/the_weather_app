import { content, loadingImgWrapper } from './index.js';

const handleAPI = () => {
    const APIKey = 'TNR5YYWZYAT8YJ8X2M8P8EQ47';

    const getAPIKey = () => APIKey;

    /**
     * Return the needed URL for each request.
     * @param {string} type - The type of request URL - could be inp location, user current location.
     * accept value: 'simpleLocation', 'currentLocation', or ''.
     * @param {string} simpleLocation - location usr request through search inp.
     * @param {string} longitude - user's current location get by user information.
     * @param {string} latitude - user's current location get by user information.
     * @returns {string} A completed URL.
     */
    const URLHandler = (type = '', simpleLocation = '', longitude = '', latitude = '') => {
        let retURL;
        const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

        if (type === 'simpleLocation') {
            retURL = baseURL + simpleLocation + '?unitGroup=metric&key=' + getAPIKey();
        } else if (type === 'currentLocation') {
            retURL = baseURL + longitude + ',' + latitude + '?unitGroup=metric&key=' + getAPIKey();
        } else {
            retURL = baseURL + 'hochiminh?unitGroup=metric&key=' + getAPIKey();
        }
        // console.log({ retURL });

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
    const getDataFromAPI = async (type = '', simpleLocation = '', longitude = '', latitude = '') => {
        let URL;

        try {
            content.classList.add('hide');
            loadingImgWrapper.classList.remove('hide');

            URL = URLHandler(type, simpleLocation, longitude, latitude);
            const res = await fetch(URL);
            const data = await res.json();
            console.log({ data });

            return data;
        } catch (e) {
            console.log('getDataFromAPI: ', e);
            // console.log('getDataFromAPI msg: ', e.message);
            alert('Cannot find requested weather information, please try again later. Displaying default location.');
            URL = URLHandler();
            const res = await fetch(URL);
            const data = await res.json();
            console.log({ data });
            return data;
        } finally {
            loadingImgWrapper.classList.add('hide');
            content.classList.remove('hide');
        }
    };

    return {
        getDataFromAPI,
    };
};

export default handleAPI;
