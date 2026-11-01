interface UnitConverterManageObjType {
    fahrenheitToCelsius: (fTemp: number) => number;
    celsiusToFahrenheit: (cTemp: number) => number;
    kmhToMph: (kmhSpeed: number) => number;
    mphToKmh: (mphSpeed: number) => number;
}

const unitConverterManageObj = (): UnitConverterManageObjType => {
    const fahrenheitToCelsius = (fTemp: number): number => Number(((fTemp - 32) / 1.8).toFixed(1));

    const celsiusToFahrenheit = (cTemp: number): number => Number((cTemp * 1.8 + 32).toFixed(1));

    const kmhToMph = (kmhSpeed: number): number => Number((kmhSpeed * 0.621371).toFixed(1));

    const mphToKmh = (mphSpeed: number): number => Number((mphSpeed * 1.60934).toFixed(1));

    return {
        fahrenheitToCelsius,
        celsiusToFahrenheit,
        kmhToMph,
        mphToKmh,
    };
};

export default unitConverterManageObj;
