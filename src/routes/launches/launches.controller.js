const {
    getAllLaunches, 
    existslaunchWithId,
    abortLaunchById,
    scheduleNewLaunch

} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return  res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {

    launch = req.body;

    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target) {
        return res.status(400).json({
            error: 'Misssing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {

    const launchId = Number(req.params.id);

    const existsLaunch = await existslaunchWithId(launchId)

    if(!existsLaunch){
        return res.status(404).json({
            error: 'launch not found',
        })
    }
  
    const aborted = await abortLaunchById(launchId);
    if (!aborted){
        return res.status(400).json({
            error: 'launch not aborted',
        })
    }
       
    return res.status(200).json({
        ok: true,
    })
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
} ;