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

async function injectIDs(hutsDS){
    newId = 1
    for(let hut of hutsDS)
        hut.id = newId++
    return hutsDS
}

async function getSubtypeDS(hutsDS, hutType){
    let DS = []
    for(let hut of hutsDS)
        if(hut.hut_type == hutType)
            DS.push(hut)

    return DS
}

async function cleanSplitHutsDataset(newFileName){
    let allhutsDS = await getJSON('81_outdooractive_huts.json')
    allhutsDS = await injectIDs(allhutsDS)

    let alpineDairyDS = await getSubtypeDS(allhutsDS, 'ALPINE_DAIRY')
    console.log((alpineDairyDS.length) + " counted entities for ALPINE_DAIRY")

    fs.writeFile((alpineDairyDS.length)+"_outdooractive_alpine_dairy.json", JSON.stringify(alpineDairyDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 

    let cabinDS = await getSubtypeDS(allhutsDS, 'CABIN')
    console.log((cabinDS.length) + " counted entities for CABIN")

    fs.writeFile((cabinDS.length)+"_outdooractive_cabin.json", JSON.stringify(cabinDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 

    let hutDS = await getSubtypeDS(allhutsDS, 'HUT')
    console.log((hutDS.length) + " counted entities for HUT")

    fs.writeFile((hutDS.length)+"_outdooractive_hovel.json", JSON.stringify(hutDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
    
}

cleanSplitHutsDataset("81_outdooractive_huts.json")