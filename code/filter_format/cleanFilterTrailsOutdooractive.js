const fs = require('fs')

let newDataSet = []

async function getJSON(filepath){
    try {
        
        const jsonString = fs.readFileSync(filepath).toString()
        const jsonObj = JSON.parse(jsonString);

        return jsonObj

    } catch (error) {
        console.log(error)
        return undefined
    }
}

function getRoute(trail, trailAPI){
    let points = []
    if(trail.geoJson)    
        for(let p of trail.geoJson)
            points.push({
                latitude: p[0],
                longitude: p[1],
                altitude: p[2]
            })
        
    return {
        description: trail.route,
        geoPoints: points
    }
}

function getOpeningMonths(trail, trailAPI){
    if(trail.monthTips){
        let monthTips = []
        for(let m in trail.monthTips)
            monthTips.push({
                month: m,
                open: trail.monthTips[m]
            })
        return monthTips

    }else return undefined
}

function getStartRoute(trail, trailAPI){
    let ld = null, lg = null, a  = null
    if(trail.start && trail.start.coord && trail.start.coord.DD){
        let DD = trail.start.coord.DD
        ld = parseFloat(DD)
        lg = parseFloat(DD.substr(DD.indexOf(',')+1))
    }
    if(trail.geoJson){
        a = trail.geoJson[0][2]
        if(ld == null)
            ld = trail.geoJson[0][0]

        if(lg == null)
            lg = trail.geoJson[0][1]
    }
    return{
        latitude: ld,
        longitude: lg,
        altitude: a,
        description: (trail.start)? trail.start.name : undefined,
    }
}

function getEndRoute(trail, trailAPI){
    let ld, lg, a  = null
    if(trail.dest && trail.dest.coord && trail.dest.coord.DD){
        let DD = trail.dest.coord.DD
        ld = parseFloat(DD)
        lg = parseFloat(DD.substr(DD.indexOf(',')+1))
    }
    if(trail.geoJson){
        let last = trail.geoJson.length - 1
        a = trail.geoJson[last][2]
        if(ld == null)
            ld = trail.geoJson[last][0]

        if(lg == null)
            lg = trail.geoJson[last][1]
    }
    return{
        latitude: ld,
        longitude: lg,
        altitude: a,
        description: (trail.dest)? trail.dest.name : undefined,
    }
}

function getTrailGrounds(trail, trailAPI){
    if(trailAPI.wayTypeInfo && trailAPI.wayTypeInfo.elements){
        let grounds = []
        for(let el of trailAPI.wayTypeInfo.elements){
            let prc = parseFloat(el.to) - parseFloat(el.from)
            grounds.push({
                groundType: el.type,
                percentage: (!isNaN(prc))? prc : undefined
            })
        }
        return grounds
    }else return undefined
}

function getTrailStats(trail, trailAPI){
    return {
        technique: trail.technique,
        stamina: trail.stamina,
        experience: trail.experience,
        landscape: trail.landscape,
    }
}

function getElevationProfile(trail, trailAPI){
    let hp = parseInt(trail.highestPoint)
    let lp = parseInt(trail.lowestPoint)
    
    let a = null
    let d = null
    let crtUrl = null
    if(trailAPI.metrics && trailAPI.metrics.elevation){
        if(trailAPI.metrics.elevation.elevationProfile)
            crtUrl = trailAPI.metrics.elevation.elevationProfile.url
        a = trailAPI.metrics.elevation.ascent
        d = trailAPI.metrics.elevation.descent
    }

    return {
        highestPoint: (!isNaN(hp))? hp : undefined,
        lowestPoint: (!isNaN(lp))? lp : undefined,
        ascent: a,
        descent: d,
        chartUrl: crtUrl
    }
}

function getMetadata(trail, trailAPI){
    let metadata = {}
    metadata['source'] = 'https://www.outdooractive.com/'
    if(trailAPI.meta){
        if(trailAPI.meta.timestamp){
            metadata['created'] = trailAPI.meta.timestamp.createdAt
            metadata['lastModified'] = trailAPI.meta.timestamp.lastModifiedAt
        }
    }
    metadata['resource'] = trail.url
    return metadata
}

function getOpenState(trail, trailAPI){
    if (trailAPI.openState == 'opened' || trailAPI.openState == 'closed')
        return trailAPI.openState == 'opened'
    else
        return undefined
}

function getEstimatedTime(trail, trailAPI){
    let duration = trail.duration
    if(duration){
        let dd= 0
        let hh = parseInt(duration)
        if(hh > 23){
            dd = parseInt(hh / 24)
            hh = hh % 24
        }
        let mm = parseInt(duration.substr(duration.indexOf(':')+1))
        return{
            days: dd,
            hours: hh,
            minutes: mm,
            seconds: 0
        }
        
    }else return undefined
}

function findEntityByID(id, trailsAPIDS){
    for(let el of trailsAPIDS)
        if(el.id == id)
            return el

    return null
}

function filterOutdoorActiveScrapedData(trailsDS, trailsAPIDS, type){

    for(let trail of trailsDS){
        let outdoorID = trail.url.substr(trail.url.lastIndexOf('/')+1)
        console.log("\nCleaning trail " + outdoorID)
        let trailAPI = findEntityByID(outdoorID, trailsAPIDS)

        let newTrail = {
            trailType: type,
            name: trail.name,
            distance: (trailAPI.metrics)? trailAPI.metrics.length : undefined,
            open: getOpenState(trail, trailAPI),
            elevation: getElevationProfile(trail, trailAPI),
            estimatedTime: getEstimatedTime(trail, trailAPI),
            startRoute: getStartRoute(trail, trailAPI),
            endRoute: getEndRoute(trail, trailAPI),
            route: getRoute(trail, trailAPI),
            difficulty: (trail.difficulty)? trail.difficulty.toUpperCase() : undefined,
            tags: trail.filterTags,
            equipment: trail.equipment,
            stats: getTrailStats(trail, trailAPI),
            grounds: getTrailGrounds(trail, trailAPI),
            monthTips: getOpeningMonths(trail, trailAPI),
            metadata: getMetadata(trail, trailAPI)
        }

        console.log(newTrail)
        newDataSet.push(newTrail)
    }
}

async function fillDataSet(newFileName){
    let hikingTrailsDS = await getJSON('outdooractive_trails_scrape+GEOJson.json')
    let hikingTrailsDSAPI = await getJSON('outdooractive_trails_API.json')
    filterOutdoorActiveScrapedData(hikingTrailsDS, hikingTrailsDSAPI, 'HIKING')

    let bikingTrailsDS = await getJSON('outdooractive_biketrails_scrape+GEOJson.json')
    let bikingTrailsDSAPI = await getJSON('outdooractive_biketrails_API.json')
    filterOutdoorActiveScrapedData(bikingTrailsDS, bikingTrailsDSAPI, 'BIKING')

    let snowshoeTrailsDS = await getJSON('outdooractive_snowshoetrails_scrape+GEOJson.json')
    let snowshoeTrailsDSAPI = await getJSON('outdooractive_snowshoetrails_API.json')
    filterOutdoorActiveScrapedData(snowshoeTrailsDS, snowshoeTrailsDSAPI, 'SNOWSHOE')

    fs.writeFile(newFileName, JSON.stringify(newDataSet), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
}

fillDataSet("outdooractive_trails.json")