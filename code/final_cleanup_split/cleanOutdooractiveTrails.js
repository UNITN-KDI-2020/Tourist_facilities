const fs = require('fs')

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

let BASE_ID = 1057+965 //1056 trails in SAT dataset 
BASE_ID += 965 //+ 965  hiking trails in outdooractive hiking trails
BASE_ID += 438 //+ 438  hiking trails in outdooractive biking trails

async function fixDataset(hikingTrailsDS, trailType){
    let newId = 1 + BASE_ID
    let HIKINGTrails = []
    for(let trail of hikingTrailsDS){
        if(trail.trailType == trailType){
            trail.id = newId++
            HIKINGTrails.push(trail)
        }
    }
    console.log((HIKINGTrails.length)+" " + trailType + " TRAILS counted")
    return HIKINGTrails
}

async function fixDataset(hikingTrailsDS, trailType){
    let newId = 1 + BASE_ID
    let HIKINGTrails = []
    for(let trail of hikingTrailsDS){
        if(trail.trailType == trailType){
            trail.id = newId++
            HIKINGTrails.push(trail)
        }
    }
    console.log((HIKINGTrails.length)+" " + trailType + " TRAILS counted")
    return HIKINGTrails
}

async function splitDataset(hikingTrailsDS){
    let HIKINGTrailsDSS = [[]]
    for(let trail of hikingTrailsDS){
        let lastDSIndex = HIKINGTrailsDSS.length-1
        if(HIKINGTrailsDSS[lastDSIndex].length > 125){
            HIKINGTrailsDSS.push([])
            lastDSIndex++
        }
        HIKINGTrailsDSS[lastDSIndex].push(trail)
    }
    return HIKINGTrailsDSS
}

async function cleanFixTrailDataset(newFileName, trailType){
    let hikingTrailsDS = await getJSON('438_tourist-facilities-biking-trails-outdooractive.json')
    let hikingTrailsDSS = await splitDataset(hikingTrailsDS)
    let idDS = 1
    for(let trailDS of hikingTrailsDSS){
        console.log((trailDS.length) + " " + trailType + " TRAILS counted")
        fs.writeFile(hikingTrailsDS.length+"_"+idDS+"_("+trailDS.length + ")" + newFileName, JSON.stringify(trailDS), (err) => { 
            if (err) 
            console.log(err); 
            else { 
            console.log("File written successfully\n"); 
            } 
        }); 
        idDS++
    }
}

cleanFixTrailDataset("tourist-facilities-biking-trails-outdooractive.json", 'BIKING')