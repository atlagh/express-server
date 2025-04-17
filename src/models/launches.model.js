const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler',
    rocket: 'explorer',
    launchDate: new Date('Decenber 27, 2030'),
    target: 'kepler',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);


function existslaunchWithId(launchId) {
    return launches.has(launchId)
}


function getAllLaunches() {
    console.log('test');
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(
            launch, {
                flightNumber: latestFlightNumber,
                customer: ['amine'],
                upcoming: true,
                success: true
            })
    );
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;

}


module.exports = {
    getAllLaunches,
    existslaunchWithId,
    addNewLaunch,
    abortLaunchById
};