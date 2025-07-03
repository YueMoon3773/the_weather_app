import { navBar, generalLeft, generalRight, currentDetails, hoursBrief, weekBrief, footer } from './index.js';

const pageControllerStatusHandler = () => {
    const pageControllerStatusList = {
        tempUnit: ['c', 'f'],
        speedUnit: ['km/h', 'mph'],
    };

    let pageCurrentControllerStatus = {
        tempUnit: 'c',
        speedUnit: 'km/h',
    };

    const getPageCurrentControllerStatus = () => pageCurrentControllerStatus;

    const changeTempPageCurrentControllerStatus = (tempType) => {
        if (tempType === getPageCurrentControllerStatus().tempUnit) {
            return;
        } else {
            if (pageControllerStatusList.tempUnit.includes(tempType)) {
                pageCurrentControllerStatus.tempUnit = tempType;
            } else {
                return;
            }
        }
    };

    const changeSpeedPageCurrentControllerStatus = (speedType) => {
        if (speedType === getPageCurrentControllerStatus().speedUnit) {
            return;
        } else {
            if (pageControllerStatusList.speedUnit.includes(speedType)) {
                pageCurrentControllerStatus.speedUnit = speedType;
            } else {
                return;
            }
        }
    };

    return {
        getPageCurrentControllerStatus,
        changeTempPageCurrentControllerStatus,
        changeSpeedPageCurrentControllerStatus,
    };
};

export default pageControllerStatusHandler;
