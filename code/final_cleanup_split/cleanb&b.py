import xml.etree.ElementTree as ET

tree2 = ET.parse('apartments_b&B.xml')
root2 = tree2.getroot()
for i in range(len(root2)):

    root2[i].attrib.pop("denominazione-annuario-Localita-Turistica")
    root2[i].attrib.pop("denominazione-ente-annuario-Localita-Turistica")
    root2[i].attrib.pop("denominazione-Localita-Turistica")
    root2[i].attrib.pop("altitudine-Localita-Turistica")
    root2[i].attrib.pop("cap-Localita-Turistica")

    root2[i][0].attrib.pop("id-localita")
    #print("hola", root2[i][0][0][0].attrib)


    if "id-EsercizioRicettivo" in root2[i][0][0][0].keys():
        root2[i][0][0][0].attrib.pop("id-EsercizioRicettivo")
    if "recapito-fax" in root2[i][0][0][0].keys():
        root2[i][0][0][0].attrib.pop("recapito-fax")
    if "tipologia-extraalberghiera" in root2[i][0][0][0].keys():
        root2[i][0][0][0].attrib.pop("tipologia-extraalberghiera")

    root2[i][0][0][0][0].attrib.pop("p-iva")
    root2[i][0][0][0][0].attrib.pop("struttura-sospesa")
    root2[i][0][0][0][0].attrib.pop("frazione")
    if "tipologia-extraalberghiera" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("tipologia-extraalberghiera")
    root2[i][0][0][0][0].attrib.pop("livello-classifica")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-letto-aggiunto")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-consumazione-pasto")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-colazione")
    root2[i][0][0][0][0].attrib.pop("struttura-chiusa")
    if "numero-camere" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-camere")
    if "numero-posti-letto" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-posti-letto")
    if "numero-bagni-comuni" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-bagni-comuni")
    if "numero-lavelli" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-lavelli")
    if "numero-wc" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-wc")
    if "numero-docce" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-docce")
    if "numero-piazzole" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-piazzole")
    if "allestimenti-stabili" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("allestimenti-stabili")
    if "allestimenti-mobili" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("allestimenti-mobili")
    if "capacita-ricettiva" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("capacita-ricettiva")


    if (len(root2[i][0][0])>1):
        for z in range(1,len(root2[i][0][0])):
            root2[i][0][0][z][0].attrib.pop('id-EsercizioRicettivo')
            root2[i][0][0][z][0].attrib.pop('p-iva')
            root2[i][0][0][z][0].attrib.pop('frazione')
            root2[i][0][0][z][0].attrib.pop('livello-classifica')
            if "prezzo-max-letto-aggiunto" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('prezzo-max-letto-aggiunto')
            if "prezzo-max-consumazione-pasto" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('prezzo-max-consumazione-pasto')
            if "prezzo-max-colazione" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('prezzo-max-colazione')
            if "struttura-sospesa" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('struttura-sospesa')
            if "struttura-chiusa" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('struttura-chiusa')
            if "numero-camere" in root2[i][0][0][1][0].keys():
                root2[i][0][0][z][0].attrib.pop('numero-camere')
            if "numero-posti-letto" in root2[i][0][0][1][0].keys():
               root2[i][0][0][1][0].attrib.pop('numero-posti-letto')
            if "numero-bagni-comuni" in root2[i][0][0][1][0].keys():
                root2[i][0][0][1][0].attrib.pop("numero-bagni-comuni")
            if "numero-lavelli" in root2[i][0][0][1][0].keys():
                root2[i][0][0][1][0].attrib.pop("numero-lavelli")
            if "numero-wc" in root2[i][0][0][1][0].keys():
                root2[i][0][0][1][0].attrib.pop("numero-wc")
            if "numero-docce" in root2[i][0][0][1][0].keys():
                root2[i][0][0][1][0].attrib.pop("numero-docce")
            #print(root2[i][0][0][1][0].attrib)
    if (len(root2[i][0])>1):
        for z in range(1, len(root2[i][0])):
            for p in range(len(root2[i][0][z])):
                root2[i][0][z][p][0].attrib.pop('id-EsercizioRicettivo')
                root2[i][0][z][p][0].attrib.pop('p-iva')
                root2[i][0][z][p][0].attrib.pop('frazione')
                root2[i][0][z][p][0].attrib.pop('livello-classifica')
                root2[i][0][z][p][0].attrib.pop('prezzo-max-letto-aggiunto')
                root2[i][0][z][p][0].attrib.pop('prezzo-max-consumazione-pasto')
                root2[i][0][z][p][0].attrib.pop('prezzo-max-colazione')
                root2[i][0][z][p][0].attrib.pop('struttura-sospesa')
                root2[i][0][z][p][0].attrib.pop('struttura-chiusa')
                root2[i][0][z][p][0].attrib.pop('numero-camere')
                root2[i][0][z][p][0].attrib.pop('numero-posti-letto')
                if "numero-bagni-comuni" in root2[i][0][z][p][0].keys():
                    root2[i][0][z][p][0].attrib.pop("numero-bagni-comuni")
                if "numero-lavelli" in root2[i][0][z][p][0].keys():
                    root2[i][0][z][p][0].attrib.pop("numero-lavelli")
                if "numero-wc" in root2[i][0][z][p][0].keys():
                    root2[i][0][z][p][0].attrib.pop("numero-wc")
                if "numero-docce" in root2[i][0][z][p][0].keys():
                    root2[i][0][z][p][0].attrib.pop("numero-docce")

    if (len(root2[i]) > 1):
        for z in range(len(root2[i])):
                for y in range(len(root2[i][z])):
                    for k in range(len(root2[i][z][y])):
                        for e in range(len(root2[i][z][y][k])):
                            print("hola", root2[i][z][y][k][e].attrib)
                            if "id-localita" in root2[i][z][y][k][e].attrib:
                                root2[i][z][y][k][e].attrib.pop("id-localita")
                            if "numero-lavelli" in root2[i][z][y][k][e].attrib:
                                root2[i][z][y][k][e].attrib.pop("numero-lavelli")
                            if "tipologia-extraalberghiera" in root2[i][z][y][k][e].attrib:
                                root2[i][z][y][k][e].attrib.pop("tipologia-extraalberghiera")
                            #root2[i][1][0][0].attrib.pop("recapito-fax")
                            if "p-iva" in root2[i][z][y][k][e].attrib:
                                root2[i][z][y][k][e].attrib.pop("p-iva")
                            if "frazione" in root2[i][z][y][k][e].attrib:
                                root2[i][z][y][k][e].attrib.pop("frazione")
                            if "numero-lavelli" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-lavelli")
                            if "struttura-sospesa" in root2[i][z][y][k][0].keys():
                                root2[i][z][y][k][e].attrib.pop("struttura-sospesa")
                            if "numero-wc" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-wc")
                            if "livello-classifica" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("livello-classifica")
                            if "numero-docce" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-docce")
                            if "livello-classifica" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("livello-classifica")
                            if "prezzo-max-letto-aggiunto" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("prezzo-max-letto-aggiunto")
                            if "prezzo-max-consumazione-pasto" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][0].attrib.pop("prezzo-max-consumazione-pasto")
                            if "prezzo-max-colazione" in root2[i][z][y][k][0].keys():
                                root2[i][z][y][k][e].attrib.pop("prezzo-max-colazione")
                            if "struttura-chiusa" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("struttura-chiusa")
                            if "numero-camere" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-camere")
                            if "numero-posti-letto" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-posti-letto")
                            if "numero-bagni-comuni" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-bagni-comuni")
                            if "numero-piazzole" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("numero-piazzole")
                            if "allestimenti-stabili" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("allestimenti-stabili")
                            if "allestimenti-mobili" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("allestimenti-mobili")
                            if "capacita-ricettiva" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("capacita-ricettiva")
                            if "id-EsercizioRicettivo" in root2[i][z][y][k][e].keys():
                                root2[i][z][y][k][e].attrib.pop("id-EsercizioRicettivo")
                            #print(root2[i][1][0][0][0].attrib)
                            #print("")
                            #print(root2[i][1][0][0].attrib)

tree2.write("cleaned_b&b.xml")
