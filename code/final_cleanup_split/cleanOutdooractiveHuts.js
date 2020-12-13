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

function injectIDs(hutsDS){
    newId = 1
    for(let hut of hutsDS){
        hut.id = newId
        newId++
    }
    return hutsDS
}

function splitServiceInfo(hutsDS){
  for(let hut of hutsDS){
    let i = 0
    for(let s of hut.services){
      hut["serv_"+i] = s
      i++
    }
    i = 0
    for(let inf of hut.information){
      hut["inf_"+i] = inf
      i++
    }
  }
  return hutsDS
}

function getSubtypeDS(hutsDS, hutType){
    let DS = []
    for(let hut of hutsDS)
        if(hut.hut_type == hutType)
            DS.push(hut)

    return DS
}

function getroomOptionsDS(hutsDS){
  let DS = []
  for(let hut of hutsDS){
    if(hut.roomOptions){
      for(let roomOpt of hut.roomOptions)  
        DS.push({
          idHut: hut.id,
          roomOptionName: roomOpt.roomType
        })
    }
  }

  return DS
}

function removeTags(str) {
  if ((str===null) || (str===''))
    return false;
  else
    str = str.toString();
  return str.replace( /(<([^>]+)>)/ig, '');
}

function cleanAccommodationInfo(hutsDS){
  let DS = []
  for(let hut of hutsDS){
    
    if(hut.accomodationInfo && hut.accomodationInfo.openTimes && hut.accomodationInfo.openTimes.additionalInfo)
      hut.accomodationInfo.openTimes.additionalInfo = removeTags(hut.accomodationInfo.openTimes.additionalInfo)
    
    hut.accommodationInfo = hut.accomodationInfo
    hut.accomodationInfo = undefined
    DS.push(hut)
  }

  return DS
}

async function cleanSplitHutsDataset(fileName){
    let allhutsDS = await getJSON(fileName)
    allhutsDS = cleanAccommodationInfo(allhutsDS)
    allhutsDS = injectIDs(allhutsDS)
    allhutsDS = splitServiceInfo(allhutsDS)
    
    let alpineDairyDS = getSubtypeDS(allhutsDS, 'ALPINE_DAIRY')
    let alpineDairyroomOptionsDS = getroomOptionsDS(alpineDairyDS)
    console.log((alpineDairyDS.length) + " counted entities for ALPINE_DAIRY")

    fs.writeFile((alpineDairyDS.length)+"_outdooractive_alpine_dairy.json", JSON.stringify(alpineDairyDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 

    fs.writeFile((alpineDairyroomOptionsDS.length)+"_outdooractive_room_options_alpine_dairy.json", JSON.stringify(alpineDairyroomOptionsDS), (err) => { 
      if (err) 
        console.log(err); 
      else { 
        console.log("File written successfully\n"); 
      } 
  }); 

    let cabinDS = await getSubtypeDS(allhutsDS, 'CABIN')
    let cabinroomOptionsDS = getroomOptionsDS(cabinDS)
    console.log((cabinDS.length) + " counted entities for CABIN")

    fs.writeFile((cabinDS.length)+"_outdooractive_cabin.json", JSON.stringify(cabinDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 

    fs.writeFile((cabinroomOptionsDS.length)+"_outdooractive_room_options_cabin.json", JSON.stringify(cabinroomOptionsDS), (err) => { 
      if (err) 
        console.log(err); 
      else { 
        console.log("File written successfully\n"); 
      } 
  }); 

    let hutDS = await getSubtypeDS(allhutsDS, 'HUT')
    let hutroomOptionsDS = getroomOptionsDS(hutDS)
    console.log((hutDS.length) + " counted entities for HUT")

    fs.writeFile((hutDS.length)+"_outdooractive_hovel.json", JSON.stringify(hutDS), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
    }); 

    fs.writeFile((hutroomOptionsDS.length)+"_outdooractive_room_options_hovel.json", JSON.stringify(hutroomOptionsDS), (err) => { 
      if (err) 
        console.log(err); 
      else { 
        console.log("File written successfully\n"); 
      } 
  }); 
    
}

cleanSplitHutsDataset("81_outdooractive_huts.json")