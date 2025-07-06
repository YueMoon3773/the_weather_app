const verifyCurrentDayHasEnoughHours = (nearestTime) => {
    let ret = {
        isPass: true,
        hoursNeeded: 0,
    };
    const timeSplit = nearestTime.split(':');
    // console.log(timeSplit); //['20', '28', '14']

    if (Number(timeSplit[0]) > 16 && timeSplit[0] !== '24') {
        ret.hoursNeeded = 7 - (23 - Number(timeSplit[0]));
        ret.isPass = false;
    } else if (timeSplit[0] === '24') {
        ret.hoursNeeded = 7;
        ret.isPass = false;
    }
    return ret;
};

const getNearestHourIndex = (nearestTime, arrayToSearch) => {
    let index;
    if (nearestTime === '24:00:00') {
        index = -1;
    } else {
        index = arrayToSearch.findIndex((item) => {
            return item.datetime === nearestTime;
        });
    }
    return index;
};

export { verifyCurrentDayHasEnoughHours, getNearestHourIndex };
