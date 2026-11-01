import { format, roundToNearestHours } from 'date-fns';

interface DateTimeFormatterManageObjType {
    getHourOnly: (time: string) => string;
    getHourAndMinute: (time: string) => string;
    getDayOfWeek: (date: string) => string;
    getDateAndMonth: (date: string) => string;
    getNearestHour: (time: string) => string;
}

const dateTimeFormatterManageObj = (): DateTimeFormatterManageObjType => {
    const getHourOnly = (time: string): string => {
        // format time value to display properly
        // split time string into arr then format by library
        const timeSplit: string[] = time.split(':');
        // console.log(timeSplit);     //['20', '00', '00']
        const ret: string =
            format(new Date(0, 0, 0, Number(timeSplit[0]), Number(timeSplit[1]), Number(timeSplit[2])), 'h') +
            ' ' +
            format(new Date(0, 0, 0, Number(timeSplit[0]), Number(timeSplit[1]), Number(timeSplit[2])), 'a');
        // console.log(ret); //8 PM
        return ret;
    };

    const getHourAndMinute = (time: string): string => {
        const timeSplit: string[] = time.split(':');
        // console.log(timeSplit);     //['20', '00', '00']
        const ret: string = format(
            new Date(0, 0, 0, Number(timeSplit[0]), Number(timeSplit[1]), Number(timeSplit[2])),
            "hh':'mm",
        );
        // console.log(ret); //8:00
        return ret;
    };

    const getDayOfWeek = (date: string): string => {
        // format date value to display properly
        // split time string into arr then format by library
        const dateSplit: string[] = date.split('-');
        // console.log(dateSplit);  //['2025', '07', '02']
        const ret: string = format(
            new Date(Number(dateSplit[0]), Number(dateSplit[1]) - 1, Number(dateSplit[2])),
            'iii',
        );
        // console.log(ret); //Wed
        return ret;
    };

    const getDateAndMonth = (date: string): string => {
        const dateSplit: string[] = date.split('-');
        // console.log(dateSplit);  //['2025', '07', '02']
        const ret: string = format(
            new Date(Number(dateSplit[0]), Number(dateSplit[1]) - 1, Number(dateSplit[2])),
            'dd MMM',
        );
        // console.log(ret); //02 Jul
        return ret;
    };

    const getNearestHour = (time: string): string => {
        const timeSplit: string[] = time.split(':');
        // console.log(timeSplit);     //['20', '28', '14']

        const ret: string = format(
            roundToNearestHours(new Date(0, 0, 0, Number(timeSplit[0]), Number(timeSplit[1]), Number(timeSplit[2])), {
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

export default dateTimeFormatterManageObj;
