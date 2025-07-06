import { format, roundToNearestHours } from 'date-fns';
const dateTimeFormatter = () => {
    const getHourOnly = (time) => {
        // format time value to display properly
        // split time string into arr then format by library
        const timeSplit = time.split(':');
        // console.log(timeSplit);     //['20', '00', '00']
        const ret =
            format(new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2]), 'h') +
            ' ' +
            format(new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2]), 'a');
        // console.log(ret); //8 PM
        return ret;
    };

    const getHourAndMinute = (time) => {
        const timeSplit = time.split(':');
        // console.log(timeSplit);     //['20', '00', '00']
        const ret = format(new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2]), "hh':'mm");
        // console.log(ret); //8:00
        return ret;
    };

    const getDayOfWeek = (date) => {
        // format date value to display properly
        // split time string into arr then format by library
        const dateSplit = date.split('-');
        // console.log(dateSplit);  //['2025', '07', '02']
        const ret = format(new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]), 'iii');
        // console.log(ret); //Wed
        return ret;
    };

    const getDateAndMonth = (date) => {
        const dateSplit = date.split('-');
        // console.log(dateSplit);  //['2025', '07', '02']
        const ret = format(new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]), 'dd MMM');
        // console.log(ret); //02 Jul
        return ret;
    };

    const getNearestHour = (time) => {
        const timeSplit = time.split(':');
        // console.log(timeSplit);     //['20', '28', '14']

        const ret = format(
            roundToNearestHours(new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2]), {
                roundingMethod: 'ceil',
            }),
            "kk':'mm':'ss",
        );
        // console.log(ret); //{ret: '20:00:00'}
        return ret;
    };

    return {
        getHourOnly,
        getHourAndMinute,
        getDayOfWeek,
        getDateAndMonth,
        getNearestHour,
    };
};

export default dateTimeFormatter;
