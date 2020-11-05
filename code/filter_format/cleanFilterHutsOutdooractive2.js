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

function findOpeningMonths(url, hutsDS_Devis){
    for(let hut of hutsDS_Devis){
        if(hut.metadata.resource == url)
            return hut.accomodationInfo.openingMonths
    }
}

function fixOpeningTimes(hutsDS_Devis, hutsDS){
    for(let hut of hutsDS){
        if(hut.accomodationInfo.openTimes){

            let openingMonths = findOpeningMonths(hut.metadata.resource, hutsDS_Devis) 
            hut.accomodationInfo.openingMonths = openingMonths
            if(hut.accomodationInfo.openTimes.weekdays){
                
                let days = []
                for(let dd of hut.accomodationInfo.openTimes.weekdays){
                    let d = {day: dd.title, openingHours: []}
                    for(let times of dd.times)
                        d.openingHours.push({startTime: times.from, endTime:times.to})

                    days.push(d)
                }
                hut.accomodationInfo.openingHours = {days:days}
                hut.accomodationInfo.openTimes = undefined
            }
            
        }
        
        newDataSet.push(hut)
    }
}

async function fillDataSet(newFileName){
    let hutsDS_Devis = await getJSON('outdooractive_huts_Devis.json')
    let hutsDS = await getJSON('outdooractive_huts.json')
    fixOpeningTimes(hutsDS_Devis, hutsDS)
    console.log(hutsDS_Devis.length)
    console.log(hutsDS.length)
    console.log(newDataSet.length)
    fs.writeFile(newFileName, JSON.stringify(newDataSet), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    });
}

fillDataSet('outdooractive_huts_final.json')