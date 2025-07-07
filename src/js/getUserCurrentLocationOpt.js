const handleUserLocation = () => {
    let userLocation = {
        latitude: '',
        longitude: '',
    };

    const getUserLocationData = async () => userLocation;

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    };

    const success = (pos) => {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        userLocation.latitude = crd.latitude;
        userLocation.longitude = crd.longitude;
    };

    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const getUserCurrentLocation = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return {
        getUserLocationData,
        getUserCurrentLocation,
    };
};

export default handleUserLocation;
