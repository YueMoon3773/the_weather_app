const unitConverter = () => {
    const fahrenheitToCelsius = (fTemp) => ((fTemp - 32) / 1.8).toFixed(1);

    const celsiusToFahrenheit = (cTemp) => (cTemp * 1.8 + 32).toFixed(1);

    const kmhToMph = (kmhSpeed) => (kmhSpeed * 0.621371).toFixed(1);

    const mphToKmh = (mphSpeed) => (mphSpeed * 1.60934).toFixed(1);

    return {
        fahrenheitToCelsius,
        celsiusToFahrenheit,
        kmhToMph,
        mphToKmh,
    };
};

export default unitConverter;
