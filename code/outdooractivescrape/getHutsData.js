const fetch = require('node-fetch')
const fs = require('fs')
const { JSDOM } = require('jsdom')

//the following scripts assumed you already have downloaded the html page of outdoor active with all the html stuff
async function getHTMLDOM(filepath){
    try {
        
        const innerHTML = fs.readFileSync(filepath).toString()
        const { document } = new JSDOM(innerHTML, { includeNodeLocations: true }).window

        return document

    } catch (error) {
        console.log(error)
        return undefined
    }
}



async function extractHutsIds(){
    let hutsIds = []

    //alpine-dairies
    let doc = await getHTMLDOM('alpine-dairies.html')
    let els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }
    
    //bivouacs
    doc = await getHTMLDOM('bivouacs.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    //bothys
    doc = await getHTMLDOM('bothys.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    //bothys
    doc = await getHTMLDOM('huts.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    //mountain-huts
    doc = await getHTMLDOM('mountain-huts.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    //private-cabins
    doc = await getHTMLDOM('private-cabins.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    //serviced-huts
    doc = await getHTMLDOM('serviced-huts.html')
    els = doc.querySelectorAll('.myhut')
    for(let a of els){
        let url = a.getAttribute('href')
        if(url.endsWith('/')) {url = url.substr(0, url.length-1)}
        let id = url.substr(url.lastIndexOf('/')+1)
        hutsIds.push(id)
    }

    return hutsIds
}

async function extractJsonAPI(outdooractiveID){
    const base = 'https://www.outdooractive.com/api/v2/project/outdooractive/contents/'
    const queryp = '?display=verbose&key=KK7FCKIF-EMWGMZBX-4OSSFOAR'
    let url = base + outdooractiveID + queryp

    try {
        const response = await fetch(url)
        const responseJson = JSON.parse(await response.text())
        console.log(responseJson.answer.contents[0])
        return (responseJson.answer.contents[0])

    } catch (error) {
        console.log(error)
        return undefined
    }

}

async function extratsData(){
    let hutsIds = await extractHutsIds()
    let dataset = []
    for(let i=0; i<hutsIds.length; i++){
        let id = hutsIds[i]
        console.log('\n\n------------------------\n' + i + ' OUT OF ' + hutsIds.length)
        console.log('Fetching ' + id)
        dataset.push(await extractJsonAPI(id))
    }
    fs.writeFile("outdooractive_huts.json", JSON.stringify(dataset), (err) => { 
        if (err) 
            console.log(err); 
        else { 
            console.log("File written successfully\n"); 
        } 
    }); 
}

extratsData()
