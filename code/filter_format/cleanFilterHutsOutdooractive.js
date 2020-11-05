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

function getHutType(hut){
    let name = hut.title.toLowerCase()
    if(name.indexOf('malga') >= 0)
        return 'ALPINE_DAIRY'
    
    if(name.indexOf('rifugio') >= 0 || hut.myType == 'BOTHY')
        return 'CABIN'

    if(name.indexOf('bivacco') >= 0)
        return 'BIVOUAC'

    return hut.myType
}


function getContactInfo(hut){
    if(hut.contact){
        
        let phone = undefined
        if(hut.contact.phone != undefined)
            phone = hut.contact.phone
        else
            phone = hut.contact.cellPhone
        
        return {
            phoneNumber: phone,
            website: hut.contact.homepage,
            email: hut.contact.email
        }
    
    }else return undefined
}

function getAddress(hut){
    if(hut.contact && hut.contact.address)
        return {
            city: hut.contact.address.town,
            cap: hut.contact.address.zipcode,
            province: undefined,
            street: hut.contact.address.street,
            civicNumber: hut.contact.address.streetAddress
        }
    else return undefined    
}

function getLocation(hut){
    if(hut && hut.coordinates){
        let DD = hut.coordinates[0].value
        ld = parseFloat(DD)
        lg = parseFloat(DD.substr(DD.indexOf(',')+1))
        return {
            latitude: ld,
            longitude: lg
        }
    }else return undefined
}

function getAccomodationInfo(hut){
    if(hut)
        return {
            description: hut.teaserText,
            address: getAddress(hut),
            openTimes: hut.openTimes, //TO STRUCTURE MANUALLY
            location: getLocation(hut),
            stars: undefined
        }
    else return undefined
}

function getMetadata(hut){
    let metadata = {}
    metadata['source'] = 'https://www.outdooractive.com/'
    if(hut.meta){
        if(hut.meta.timestamp){
            metadata['created'] = hut.meta.timestamp.createdAt
            metadata['lastModified'] = hut.meta.timestamp.lastModifiedAt
        }
    }
    metadata['resource'] = hut.url
    return metadata
}

function getRoomOptions(hut){
    if(hut.bedCountInfo && hut.bedCountInfo){
        let rooms = []
        for(let option in hut.bedCountInfo)
            rooms.push({roomType: option})
        return rooms
    }else return undefined
}

function alreadyCounted(newHut){
    for(let hut of newDataSet){
        if(newHut.url == hut.metadata.resource)
            return true
    }
    return false
}

function getLandLordInfo(hut){
    if(hut.landlordInfo)
        return {name: hut.landlordInfo.name}
    else return undefined
}

function getServices(hut){
    if(hut){
        let services = []
        if(hut.classifications)
            for(let c of hut.classifications)
                for(let t of c.tags)
                    services.push(t.name)

        return services
    }else return undefined
}

function getInformation(hut){
    if(hut){
        let info = []
        if(hut.hutInfo)
            for(let inf of hut.hutInfo)
                info.push(inf)
        if(hut.classifications)
            for(let c of hut.classifications)
                for(let t of c.tags)
                    info.push(t.name)

        return info
    }else return undefined
}

function filterOutdoorActiveScrapedData(hutsDS){
    let i = 0
    for(let hut of hutsDS){
        if(!alreadyCounted(hut)){
            let newHut = {
                accomodationType: 'OTHER',
                name: hut.title,
                contactInfo: getContactInfo(hut),
                accomodationInfo: getAccomodationInfo(hut),
                capacity: hut.bedCount,
                roomOptions: getRoomOptions(hut),
                services: getServices(hut),
                hut_type: getHutType(hut),
                information: getInformation(hut),
                landlordInformation: getLandLordInfo(hut),
                metadata: getMetadata(hut)
            }
            console.log(i + "\t" + hut.id)
            newDataSet.push(newHut)
        }
        i++
    }
}

async function fillDataSet(newFileName){
    let hutsRawDS = await getJSON('outdooractive_huts_API.json')
    filterOutdoorActiveScrapedData(hutsRawDS)

    fs.writeFile(newFileName, JSON.stringify(newDataSet), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
}

fillDataSet('outdooractive_huts.json')