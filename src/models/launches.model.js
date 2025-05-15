const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler',
    rocket: 'explorer',
    launchDate: new Date('Decenber 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

async function test() {
    try{
        await saveLaunch(launch)
     }catch(err){
     console.log(err)
     }
}

test();


async function existslaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    };
    return latestLaunch.flightNumber;
}


async function getAllLaunches() {
    return await launchesDatabase.find({}, {'_id': 0, '__v': 0})
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet){
        throw new Error('no matching planets found')
    }

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    });
};


async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    console.log(newFlightNumber);
    const newLaunch = Object.assign(
        launch, {
            flightNumber: newFlightNumber,
            customer: ['amine'],
            upcoming: true,
            success: true
        }
    )
    await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId) {

    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false, 
        success:false
    });

    return aborted.modifiedCount === 1;


}


module.exports = {
    getAllLaunches,
    existslaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
};