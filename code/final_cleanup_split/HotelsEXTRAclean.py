import xml.etree.ElementTree as ET

tree = ET.parse('Clean_hotel_information.xml')
root = tree.getroot()
for i in range(len(root)):
    if (len(root[i])>1):
        root[i][1].attrib.pop("altitudine")
        root[i][1].attrib.pop("cap")
        root[i][1].attrib.pop("denominazione")
        root[i][1].attrib.pop("id-localita")

        #if ("id-EsercizioRicettivo" in root[i][1][0].attrib.keys()):
         #   root[i][1][0].attrib.pop("id-EsercizioRicettivo")
        if ("numero-posti-letto" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("numero-posti-letto")
        if ("numero-unita" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("numero-unita")
        if ("p-iva" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("p-iva")
        if ("recapito-fax" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("recapito-fax")
        if ("numero-posti-letto" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("numero-posti-letto")
        if ("tipologia-alberghiera" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("tipologia-alberghiera")
        if ("tipologia-servizio" in root[i][1][0].attrib.keys()):
            root[i][1][0].attrib.pop("tipologia-servizio")

        if ("frazione" in root[i][1][0][0].attrib.keys()):
            root[i][1][0][0].attrib.pop("frazione")
        if ("prezzo-max-consumazione-pasto" in root[i][1][0][0].attrib.keys()):
            root[i][1][0][0].attrib.pop("prezzo-max-consumazione-pasto")
        if ("prezzo-max-letto-aggiunto" in root[i][1][0][0].attrib.keys()):
            root[i][1][0][0].attrib.pop("prezzo-max-letto-aggiunto")
        if ("struttura-chiusa" in root[i][1][0][0].attrib.keys()):
            root[i][1][0][0].attrib.pop("struttura-chiusa")

    if(len(root[i][0])>1):
        #if ("id-EsercizioRicettivo" in root[i][0][1].attrib.keys()):
         #   root[i][0][1].attrib.pop("id-EsercizioRicettivo")
        if ("numero-posti-letto" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("numero-posti-letto")
        if ("numero-unita" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("numero-unita")
        if ("p-iva" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("p-iva")
        if ("recapito-fax" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("recapito-fax")
        if ("numero-posti-letto" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("numero-posti-letto")
        if ("tipologia-alberghiera" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("tipologia-alberghiera")
        if ("tipologia-servizio" in root[i][0][1].attrib.keys()):
            root[i][0][1].attrib.pop("tipologia-servizio")

        #print(root[i][0][1][0].attrib)
        if ("frazione" in root[i][0][1][0].attrib.keys()):
            root[i][0][1][0].attrib.pop("frazione")
        if ("prezzo-max-consumazione-pasto" in root[i][0][1][0].attrib.keys()):
            root[i][0][1][0].attrib.pop("prezzo-max-consumazione-pasto")
        if ("prezzo-max-letto-aggiunto" in root[i][0][1][0].attrib.keys()):
            root[i][0][1][0].attrib.pop("prezzo-max-letto-aggiunto")
        if ("struttura-chiusa" in root[i][0][1][0].attrib.keys()):
            root[i][0][1][0].attrib.pop("struttura-chiusa")
        #print(root[i][0][1][0].attrib)
        print("")
for test in root.iter('prezzi-albergo'):
    for stuff in test.findall('lista-servizi'):
        print("HOOOOOLA", stuff)
        # test.remove(stuff)
        for cod in stuff.findall('servizio'):
            print("HHHHHHHHHHHHH", cod)
            if "codice" in cod.keys():
                cod.attrib.pop("codice")
    for prezz in test.findall("prezzi-saa"):
        if "prezzo-max-consumazione-pasto" in prezz.keys():
            prezz.attrib.pop("prezzo-max-consumazione-pasto")
tree.write("modif.xml")
