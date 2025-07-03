const unitConverter = () => {
    const fahrenheitToCelsius = (fTemp) => {
        const ret = (fTemp - 32) / 1.8;
        return ret;
    };

    const celsiusToFahrenheit = (cTemp) => {
        const ret = cTemp * 1.8 + 32;
        return ret;
    };

    const kmhToMph = (kmhSpeed) => kmhSpeed * 0.621371;

    const mphToKmh = (mphSpeed) => mphSpeed * 1.60934;

    return {
        fahrenheitToCelsius,
        celsiusToFahrenheit,
        kmhToMph,
        mphToKmh,
    };
};

export default unitConverter;
