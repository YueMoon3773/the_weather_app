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

    const getPageCurrentTempUnit = () => pageCurrentControllerStatus.tempUnit;

    const getPageCurrentSpeedUnit = () => pageCurrentControllerStatus.speedUnit;

    /**
     * Change the unit of the temp based on the data-value of the btn.
     * @param {string} tempUnit - the value of current btn.
     * accept value: 'c', or 'f'.
     * @returns none if update fail.
     */
    const changeTempPageCurrentControllerStatus = (tempUnit) => {
        // console.log({ tempUnit });

        if (tempUnit === getPageCurrentControllerStatus().tempUnit) {
            return;
        } else {
            if (pageControllerStatusList.tempUnit.includes(tempUnit)) {
                pageCurrentControllerStatus.tempUnit = tempUnit;
            } else {
                return;
            }
        }
    };

    /**
     * Change the unit of the speed based on the data-value of the btn.
     * @param {string} speedUnit - the value of current btn.
     * accept value: 'km/h', or 'mph'.
     * @returns none if update fail.
     */
    const changeSpeedPageCurrentControllerStatus = (speedUnit) => {
        // console.log({ speedUnit });

        if (speedUnit === getPageCurrentControllerStatus().speedUnit) {
            return;
        } else {
            if (pageControllerStatusList.speedUnit.includes(speedUnit)) {
                pageCurrentControllerStatus.speedUnit = speedUnit;
            } else {
                return;
            }
        }
    };

    /**
     * switch the activate staus of the clicked btn and deactivate its sibling.
     * @param {string} btnToActivate - btn element.
     * @param {string} btnToDeactivate - btn element.
     */
    const switchActiveControlBtn = (btnToActivate, btnToDeactivate) => {
        if (!btnToActivate.classList.contains('active')) {
            btnToActivate.classList.add('active');
            if (btnToActivate.dataset.type === 'temp') {
                changeTempPageCurrentControllerStatus(btnToActivate.dataset.value);
            } else if (btnToActivate.dataset.type === 'speed') {
                changeSpeedPageCurrentControllerStatus(btnToActivate.dataset.value);
            }
            btnToDeactivate.classList.remove('active');
        }
    };

    return {
        getPageCurrentControllerStatus,
        getPageCurrentTempUnit,
        getPageCurrentSpeedUnit,
        switchActiveControlBtn,
        changeTempPageCurrentControllerStatus,
        changeSpeedPageCurrentControllerStatus,
    };
};

export default pageControllerStatusHandler;
