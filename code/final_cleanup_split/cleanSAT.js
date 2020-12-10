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

async function fixSATDataset(hikingTrailsDS){
    //
}

async function cleanFixSATDataset(newFileName){
    let hikingTrailsDS = await getJSON('SAT_trails.json')
    newId = 1
    for(let trail of hikingTrailsDS)
        trail.id = newId++
    
    console.log((newId-1) + " counted entities")

    fs.writeFile(newFileName, JSON.stringify(hikingTrailsDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
}

cleanFixSATDataset("tourist-facilities-hiking-trails-SAT.json")