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

/*
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
*/

async function splitDataset(trailsDS){
    let TrailsDSS = [[]]
    for(let trail of trailsDS){
        let lastDSIndex = TrailsDSS.length-1
        if(TrailsDSS[lastDSIndex].length > 125){
            TrailsDSS.push([])
            lastDSIndex++
        }
        TrailsDSS[lastDSIndex].push(trail)
    }
    return TrailsDSS
}

function splitTags(trailsDS){
    for(let trail of trailsDS){
        let i = 0
        for(let tag of trail.tags){
            i++
            trail['tag_'+i] = tag
        }
    }
    return trailsDS
}

async function cleanFixTrailDatasets(){
    
    let BIKINGTrailsDS = await getJSON('438_tourist-facilities-biking-trails-outdooractive.json')
    BIKINGTrailsDS = splitTags(BIKINGTrailsDS) 
    let BIKINGTrailsDSS = await splitDataset(BIKINGTrailsDS)
    
    let idDS = 1
    for(let trailDS of BIKINGTrailsDSS){
        console.log((trailDS.length) + " BIKING TRAILS counted")
        fs.writeFile(BIKINGTrailsDS.length+"_"+idDS+"_("+trailDS.length + ")tourist-facilities-biking-trails-outdooractive.json", JSON.stringify(trailDS), (err) => { 
            if (err) 
            console.log(err); 
            else { 
            console.log("File written successfully\n"); 
            } 
        }); 
        idDS++
    }

    
    let HIKINGTrailsDS = await getJSON('965_tourist-facilities-hiking-trails-outdooractive.json')
    HIKINGTrailsDS = splitTags(HIKINGTrailsDS) 
    let HIKINGTrailsDSS = await splitDataset(HIKINGTrailsDS)
    
    idDS = 1
    for(let trailDS of HIKINGTrailsDSS){
        console.log((trailDS.length) + " HIKING TRAILS counted")
        fs.writeFile(HIKINGTrailsDS.length+"_"+idDS+"_("+trailDS.length + ")tourist-facilities-hiking-trails-outdooractive.json", JSON.stringify(trailDS), (err) => { 
            if (err) 
            console.log(err); 
            else { 
            console.log("File written successfully\n"); 
            } 
        }); 
        idDS++
    }

    let SNOWSHOETrailsDS = await getJSON('86_tourist-facilities-snowshoe-trails-outdooractive.json')
    SNOWSHOETrailsDS = splitTags(SNOWSHOETrailsDS) 
    let trailDS = SNOWSHOETrailsDS
    idDS = 1
    console.log((trailDS.length) + " SNOWSHOE TRAILS counted")
    fs.writeFile(SNOWSHOETrailsDS.length+"_"+idDS+"_("+trailDS.length + ")tourist-facilities-snowshoe-trails-outdooractive.json", JSON.stringify(trailDS), (err) => { 
        if (err) 
        console.log(err); 
        else { 
        console.log("File written successfully\n"); 
        } 
    }); 
    idDS++
    
}

cleanFixTrailDatasets()