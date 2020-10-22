const fs = require('fs')
const { JSDOM } = require('jsdom')
const scrapeTrail = require('./scrapeSingleTrail')
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

let urls = []

async function extractUrls(){
    //put the html into a DOM
    let doc = await getHTMLDOM('hikingTracks-big.html')
    let els = doc.querySelectorAll('.out12Link')
    for(let a of els){
        urls.push(a.getAttribute('href'))
    }
}

async function extractData(){
    await extractUrls() //fill up all the urls
    let dataset = []
    for(let i=0; i<urls.length; i++){
        let outdooraID = urls[i].substr(urls[i].lastIndexOf('/')+1)
        console.log('\n\n------------------------\n' + i + ' OUT OF ' + urls.length)
        console.log('Fetching ' + outdooraID)
        let json = await scrapeTrail.extractData(outdooraID)
        json['url'] = urls[i]
        
        console.log(json)
        dataset.push(json) 
    }
    fs.writeFile("outdooractive_trails0.json", JSON.stringify(dataset), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 
}

extractData()