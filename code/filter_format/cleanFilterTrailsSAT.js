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


function getDistance(trail){
    let d = null
    if(trail.features && trail.features[0] && trail.features[0].properties)
        d = parseInt(trail.features[0].properties.distance)
    return d
}

function getName(trail){
    let name = null
    if(trail.features && trail.features[0] && trail.features[0].properties)
        name = trail.features[0].properties.name
    if(name && name.indexOf(' ') > 0)
        name = name.substr(name.indexOf(' ')+1)
    return (name != '')? name : undefined
}

function getSATID(trail){
    let name = null
    if(trail.features && trail.features[0] && trail.features[0].properties)
        name = trail.features[0].properties.name
    if(name && name.indexOf(' ') > 0)
        name = name.substr(0,name.indexOf(' '))
    return name
}

function getStartRoute(trail){
    let ld = null, lg = null, a  = null, d
    if(trail.features && trail.features[0] && trail.features[0].geometry && trail.features[0].geometry.coordinates){
        let coordinates = trail.features[0].geometry.coordinates
        ld = coordinates[0][0]
        lg = coordinates[0][1]
        a = coordinates[0][2]
    }

    if(trail.features && trail.features[0] && trail.features[0].properties)
        d = trail.features[0].properties['loc_inizio']

    return{
        latitude: ld,
        longitude: lg,
        altitude: a,
        description: d,
    }
    
}

function getEndRoute(trail){
    let ld = null, lg = null, a  = null, d
    if(trail.features && trail.features[0] && trail.features[0].geometry && trail.features[0].geometry.coordinates){
        let coordinates = trail.features[0].geometry.coordinates
        let last = coordinates.length - 1
        ld = coordinates[last][0]
        lg = coordinates[last][1]
        a = coordinates[last][2]
    }

    if(trail.features && trail.features[0] && trail.features[0].properties)
        d = trail.features[0].properties['loc_fine']

    return{
        latitude: ld,
        longitude: lg,
        altitude: a,
        description: d,
    }
    
}

function getRoute(trail){
    let descr = undefined
    if(trail.features && trail.features[0] && trail.features[0].properties)
        descr = trail.features[0].properties['description']
    
    let points = []
    if(trail.features && trail.features[0] && trail.features[0].geometry && trail.features[0].geometry.coordinates){
        let coordinates = trail.features[0].geometry.coordinates
        for(let p of coordinates)
            points.push({
                latitude: p[0],
                longitude: p[1],
                altitude: p[2]
            })
    }

    return{
        description: descr,
        geoPoints: points
    }

}

function getElevationProfile(trail){
    if(trail.features && trail.features[0] && trail.features[0].geometry && trail.features[0].geometry.coordinates){
        let coordinates = trail.features[0].geometry.coordinates
        let min = parseInt(coordinates[0][2]), max = parseInt(coordinates[0][2])
        let a = 0, d = 0

        for(let i = 0; i < coordinates.length; i++){
            min = Math.min(min, parseInt(coordinates[i][2]))
            max = Math.max(max, parseInt(coordinates[i][2]))
            if(i > 0 && parseFloat(coordinates[i][2]) > parseFloat(coordinates[i-1][2]))
                a += parseFloat(coordinates[i][2]) - parseFloat(coordinates[i-1][2])
            if(i > 0 && parseFloat(coordinates[i][2]) < parseFloat(coordinates[i-1][2]))
                d += parseFloat(coordinates[i-1][2]) - parseFloat(coordinates[i][2])
        }

        return {
            highestPoint: min,
            lowestPoint: max,
            ascent: parseInt(a),
            descent: parseInt(d),
            chartUrl: 'https://sentieri.sat.tn.it/download/profili-altimetrici/'+getSATID(trail)+'.png'
        }

    }else return undefined
}

function getEstimatedTime(trail){
    if(trail.features && trail.features[0] && trail.features[0].properties && trail.features[0].properties['t_andata']){
        let duration = trail.features[0].properties['t_andata']
        let dd = 0
        let hh = parseInt(duration)
        if(hh > 23){
            dd = parseInt(hh / 24)
            hh = hh % 24
        }
        let mm = parseInt(duration.substr(duration.indexOf(':')+1))
        let ss = parseInt(duration.substr(duration.lastIndexOf(':')+1))
        return{
            days: dd,
            hours: hh,
            minutes: mm,
            seconds: ss
        }
    }else return undefined
}

function getDifficulty(trail){
    if(trail.features && trail.features[0] && trail.features[0].properties && trail.features[0].properties['difficolta']){
        let diff = trail.features[0].properties['difficolta']
        if (diff == 'T' || diff == 'E')
            return 'EASY'
        else if (diff == 'EE')
            return 'MODERATE'
        else
            return 'DIFFICULT'
    }else return undefined
}

async function filterSATData(routesFolder, type){

    for(let i = 1; i < 1057; i++){
        let trail = await getJSON(routesFolder + i + '.geojson')
        if(trail != undefined){
            let newTrail = {
                sat_id: getSATID(trail),
                trailType: type,
                name: getName(trail),
                distance: getDistance(trail),
                open: undefined,
                elevation: getElevationProfile(trail),
                estimatedTime: getEstimatedTime(trail),
                startRoute: getStartRoute(trail),
                endRoute: getEndRoute(trail),
                route: getRoute(trail),
                difficulty: getDifficulty(trail),
                tags: undefined,
                equipment: (getDifficulty(trail) == 'DIFFICULT')? '\"Via Ferrata\": climbing harness and helmets required' : '',
                stats: undefined,
                grounds: undefined,
                monthTips: undefined,
                metadata:{
                    source: 'https://api.webmapp.it/trentino/geojson/routes/',
                    createdAt: '',
                    lastModifiedAt: '2020-07-02T08:14:00.000Z',//looked at it manually from the server
                    resource: 'https://api.webmapp.it/trentino/geojson/routes/'+i+'.geojson'
                }
            }

            console.log(newTrail)
            newDataSet.push(newTrail)
        }
    }
}

async function fillDataSet(newFileName){

    await filterSATData('.\\SAT\\routes\\','HIKING')

    fs.writeFile(newFileName, JSON.stringify(newDataSet), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
}

fillDataSet("SAT_trails.json")