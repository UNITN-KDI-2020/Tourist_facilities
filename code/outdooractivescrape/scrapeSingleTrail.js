const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const replaceall = require("replaceall")

async function getHTMLDOM(url){
    try {
        const response = await fetch(url)
        const innerHTML = await response.text()
        
        const { document } = new JSDOM(innerHTML, { includeNodeLocations: true }).window

        return document

    } catch (error) {
        console.log(error)
        return undefined
    }
}

async function extractData(outdooraID){
    let url = 'https://www.outdooractive.com/en/r/'+outdooraID

    let geoJSON = await extractgeoJson(outdooraID)

    if(!outdooraID)
        url = 'https://www.outdooractive.com/en/r/24836575'//24836575 , 19079951, 9849343
    
    let doc = await getHTMLDOM(url) 
    let name = doc.querySelector('.oax_inline')
    if(name)
        name = name.textContent
    let difficulty = doc.querySelector('.oax_abstractDifficulty')
    if(difficulty)
        difficulty = difficulty.textContent
    
    let oax_leftEls = doc.querySelectorAll('.oax_left')
    
    let distance = null
    let duration = null
    let ascent = null
    let descent = null
    let technique = null
    let stamina = null
    let experience = null
    let landscape = null
    let highestPoint = null
    let lowestPoint = null

    //recover all stats
    for(let oax_leftEl of oax_leftEls){

        if(oax_leftEl.textContent.indexOf('Distance') >= 0)
            distance = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')
        
        else if(oax_leftEl.textContent.indexOf('Duration') >= 0)
            duration = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')
        
        else if(oax_leftEl.textContent.indexOf('Ascent') >= 0)
            ascent = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')

        else if(oax_leftEl.textContent.indexOf('Descent') >= 0)
            descent = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')

        else if(oax_leftEl.textContent.indexOf('Technique') >= 0)
            technique = (oax_leftEl.nextElementSibling).querySelectorAll('.oax_active_dot').length

        else if(oax_leftEl.textContent.indexOf('Stamina') >= 0)
            stamina = (oax_leftEl.nextElementSibling).querySelectorAll('.oax_active_dot').length

        else if(oax_leftEl.textContent.indexOf('Experience') >= 0)
            experience = (oax_leftEl.nextElementSibling).querySelectorAll('.oax_active_dot').length
        
        else if(oax_leftEl.textContent.indexOf('Landscape') >= 0)
            landscape = (oax_leftEl.nextElementSibling).querySelectorAll('.oax_active_dot').length
        
        else if(oax_leftEl.textContent.indexOf('Highest point') >= 0)
            highestPoint = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')
        
        else if(oax_leftEl.textContent.indexOf('Lowest point') >= 0)
            lowestPoint = oax_leftEl.nextElementSibling.textContent.replace(/\s+/g, '')
        
    }

    //recover txt description
    let tabRouteEls = doc.querySelector('#oaxTabTourOverview')
    let route = null
    let description = null
    let recommendation = null
    if(tabRouteEls){
        tabRouteEls = tabRouteEls.nextElementSibling
        if(tabRouteEls)
            tabRouteEls.querySelector('.oax_bold')
        if(tabRouteEls)
            route = tabRouteEls.textContent

        let tabDescrEls = tabRouteEls.querySelectorAll('.oax_marg_top_22')
        for(let tabDescrEl of tabDescrEls){
            if(tabDescrEl.getAttribute('class') == 'oax_marg_top_22')
                description = tabDescrEl.textContent
        }
        if(description && description.length > 0)
            route += '\n' + description
        route = replaceall(' ', '@', route)
        route = route.replace(/\s+/g, '')
        route = replaceall('@', ' ', route)

        recommendation = tabRouteEls.querySelector('.oax_font_grey_dark')
        if(recommendation){recommendation = recommendation.textContent}
    }

    //recover filter tags
    let filterTagsEls = doc.querySelector('.oax_filter_tags')    
    let filterTags= []
    if(filterTagsEls){
        filterTagsEls = filterTagsEls.childNodes
        for(let filterTagEl of filterTagsEls){
            if(filterTagEl.textContent.replace(/\s+/g, '').length > 0)
                filterTags.push(filterTagEl.textContent.replace(/\s+/g, ''))
        }
    }
    

    //recover month tips
    let monthTipsEls = doc.querySelectorAll('.month')
    let monthTips= {}
    for(let monthTipEl of monthTipsEls){
        if(monthTipEl.getAttribute('class').indexOf('tip') >= 0)
            monthTips[monthTipEl.textContent.replace(/\s+/g, '')] = true
        else
            monthTips[monthTipEl.textContent.replace(/\s+/g, '')] = false
    }

    //equipment
    let equipment = doc.querySelector('#oax-tab-eq')
    if(equipment)
        equipment = equipment.nextElementSibling
    if(equipment)
        equipment = equipment.nextElementSibling
    if(equipment)
        equipment = equipment.querySelector('.oax_h3')
    if(equipment)
        equipment = equipment.parentElement
    if(equipment)
        equipment = equipment.textContent.replace('\n', '').replace('\t', '')
    if(equipment){
        equipment = equipment.indexOf('Equipment')==0 ? equipment.substr(9) : equipment
        equipment = replaceall(' ', '@', equipment)
        equipment = equipment.replace(/\s+/g, '')
        equipment = replaceall('@', ' ', equipment)
    }

    let directionsEl = doc.querySelector('#oaxTabTourDirections')
    if(directionsEl != null)
        directionsEl = directionsEl.nextElementSibling
    if(directionsEl != null)
        directionsEl = directionsEl.firstElementChild
    if(directionsEl != null)
        directionsEl = directionsEl.firstElementChild
    if(directionsEl != null)
        directionsEl = directionsEl.firstElementChild

    let startLoc = null
    let destLoc = null
    let turnByTurnDirection = null
    while(directionsEl != null){
        if(directionsEl.textContent.indexOf('Start') >= 0){
            startLoc = directionsEl.nextElementSibling
            if(startLoc) {startLoc = startLoc.textContent}

        }else if(directionsEl.textContent.indexOf('Destination') >= 0){
            destLoc = directionsEl.nextElementSibling
            if(destLoc) {destLoc = destLoc.textContent}

        }else if(directionsEl.textContent.indexOf('Turn-by-turn') >= 0){
            turnByTurnDirection = directionsEl.nextElementSibling
            if(turnByTurnDirection) {turnByTurnDirection = turnByTurnDirection.textContent}
        }
            
        directionsEl = directionsEl.nextElementSibling
    }

    let startLocTxt = startLoc
    let startCoord = null
    if(startLocTxt){
        if(startLocTxt.indexOf('Coordinates') >= 0){
            startLocTxt = startLocTxt.substr(0, startLocTxt.indexOf('Coordinates')-1)
            let DDtxt = (startLoc.substr(startLoc.indexOf('DD')+2, startLoc.indexOf('DMS') - startLoc.indexOf('DD') - 3)).replace(/\s+/g, '')
            let DMStxt = (startLoc.substr(startLoc.indexOf('DMS')+3, startLoc.indexOf('UTM') - startLoc.indexOf('DMS') - 3)).replace(/\s+/g, '')
            let UTMtxt = (startLoc.substr(startLoc.indexOf('UTM')+3, startLoc.indexOf('w3w') - startLoc.indexOf('UTM') - 3)).replace(/\s+/g, '')
            startCoord = {
                DD: DDtxt,
                DMS: DMStxt,
                UTM: UTMtxt
            }
        }
        startLocTxt = replaceall(' ', '@', startLocTxt)
        startLocTxt = startLocTxt.replace(/\s+/g, '')
        startLocTxt = replaceall('@', ' ', startLocTxt)
    }
    startLoc = {
        name: startLocTxt,
        coord: startCoord
    }

    let destLocTxt = destLoc
    let destCoord = null
    if(destLocTxt){
        if(destLocTxt.indexOf('Coordinates') >= 0){
            destLocTxt = destLocTxt.substr(0, destLocTxt.indexOf('Coordinates')-1)
            let DDtxt = (destLoc.substr(destLoc.indexOf('DD')+2, destLoc.indexOf('DMS') - destLoc.indexOf('DD') - 3)).replace(/\s+/g, '')
            let DMStxt = (destLoc.substr(destLoc.indexOf('DMS')+3, destLoc.indexOf('UTM') - destLoc.indexOf('DMS') - 3)).replace(/\s+/g, '')
            let UTMtxt = (destLoc.substr(destLoc.indexOf('UTM')+3, destLoc.indexOf('w3w') - destLoc.indexOf('UTM') - 3)).replace(/\s+/g, '')
            destCoord = {
                DD: DDtxt,
                DMS: DMStxt,
                UTM: UTMtxt
            }
        }
        destLocTxt = replaceall(' ', '@', destLocTxt)
        destLocTxt = destLocTxt.replace(/\s+/g, '')
        destLocTxt = replaceall('@', ' ', destLocTxt)
    }
    destLoc = {
        name: destLocTxt,
        coord: destCoord
    }

    if(turnByTurnDirection){
        turnByTurnDirection = replaceall(' ', '@', turnByTurnDirection)
        turnByTurnDirection = turnByTurnDirection.replace(/\s+/g, '')
        turnByTurnDirection = replaceall('@', ' ', turnByTurnDirection)
    }

    console.log('\n\n----------------\nRESPONSE\n')
    console.log("name: " + name)
    console.log("difficulty: " + difficulty)
    console.log("distance: " + distance)
    console.log("duration: " + duration)
    console.log("start: " + JSON.stringify(startLoc))
    console.log("destination: " + JSON.stringify(destLoc))
    console.log("geoJSON: " + JSON.stringify(geoJSON))
    console.log("turnByTurnDirection: " + turnByTurnDirection)
    console.log("ascent: " + ascent)
    console.log("descent: " + descent)
    console.log("route: " + route)
    console.log("technique: " + technique)
    console.log("stamina: " + stamina)
    console.log("experience: " + experience)
    console.log("landscape: " + landscape)
    console.log("highestPoint: " + highestPoint)
    console.log("lowestPoint: " + lowestPoint)
    console.log("filter tags: " + filterTags)
    console.log("equipment: " + equipment)
    console.log("recommendation: " + recommendation)
    console.log("month tips: " + monthTips)

    return {
        name: name,
        difficulty: difficulty,
        distance: distance,
        duration: duration,
        start: startLoc,
        dest: destLoc,
        geoJson: geoJSON,
        turnByTurnDirection: turnByTurnDirection,
        ascent: ascent,
        descent: descent,
        route: route,
        technique: technique,
        stamina: stamina,
        experience: experience,
        landscape: landscape,
        highestPoint: highestPoint,
        lowestPoint: lowestPoint,
        filterTags: filterTags,
        equipment: equipment,
        recommendation: recommendation,
        monthTips: monthTips
    }
}

async function extractgeoJson(outdooractiveID){
    const base = 'https://www.outdooractive.com/api/v2/project/outdooractive/contents/'
    const queryp = '?display=verbose&key=KK7FCKIF-EMWGMZBX-4OSSFOAR'
    let url = base + outdooractiveID + queryp

    try {
        const response = await fetch(url)
        const responseJson = JSON.parse(await response.text())
        
        return responseJson.answer.contents[0].geoJson.coordinates
    } catch (error) {
        console.log(error)
        return undefined
    }

}

async function extractJsonAPI(outdooractiveID){
    const base = 'https://www.outdooractive.com/api/v2/project/outdooractive/contents/'
    const queryp = '?display=verbose&key=KK7FCKIF-EMWGMZBX-4OSSFOAR'
    let url = base + outdooractiveID + queryp

    try {
        const response = await fetch(url)
        const responseJson = JSON.parse(await response.text())
        
        return (responseJson.answer.contents[0])

    } catch (error) {
        console.log(error)
        return undefined
    }

}


module.exports = {extractData, extractgeoJson, extractJsonAPI}