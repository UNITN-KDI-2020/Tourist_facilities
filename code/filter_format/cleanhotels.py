import xml.etree.ElementTree as ET

tree = ET.parse('Hotels_information.xml')
root = tree.getroot()
for i in range(len(root)):

    root[i].attrib.pop("denominazione-ente")
    root[i].attrib.pop("denominazione")
    root[i].attrib.pop("denominazione-ente-annuario")


    root[i][0].attrib.pop("denominazione")
    root[i][0].attrib.pop("altitudine")
    root[i][0].attrib.pop("cap")
    root[i][0].attrib.pop("id-localita")

    print(root[i][0][0].attrib)
    root[i][0][0].attrib.pop("numero-unita")
    root[i][0][0].attrib.pop("numero-posti-letto")
    root[i][0][0].attrib.pop("tipologia-servizio")
    if ("recapito-fax" in root[i][0][0].attrib.keys()):
        root[i][0][0].attrib.pop("recapito-fax")
    root[i][0][0].attrib.pop("id-EsercizioRicettivo")
    root[i][0][0].attrib.pop("p-iva")
#recapito-fax="0461-722128 "
    if ("frazione" in root[i][0][0][0].attrib.keys()):
        root[i][0][0][0].attrib.pop("frazione")
    if ("prezzo-max-letto-aggiunto" in root[i][0][0][0].attrib.keys()):
        root[i][0][0][0].attrib.pop("prezzo-max-letto-aggiunto")
    if ("struttura-chiusa" in root[i][0][0][0].attrib.keys()):
        root[i][0][0][0].attrib.pop("struttura-chiusa")

    #root[i][0][0][0][0][0].attrib.pop("struttura-chiusa")

tree.write("modif.xml")

tree2 = ET.parse('apartments_b&B.xml')
root2 = tree2.getroot()
for i in range(len(root2)):

    root2[i].attrib.pop("denominazione-annuario-Localita-Turistica")
    root2[i].attrib.pop("denominazione-ente-annuario-Localita-Turistica")

    root2[i].attrib.pop("altitudine-Localita-Turistica")
    root2[i].attrib.pop("cap-Localita-Turistica")
    root2[i][0].attrib.pop("id-localita")
    if "id-EsercizioRicettivo" in root2[i][0][0][0].keys():
        root2[i][0][0][0].attrib.pop("id-EsercizioRicettivo")
    print("hola", root2[0][0][0][0][0].attrib)
    root2[i][0][0][0][0].attrib.pop("p-iva")
    root2[i][0][0][0][0].attrib.pop("struttura-sospesa")
    root2[i][0][0][0][0].attrib.pop("frazione")
    root2[i][0][0][0][0].attrib.pop("livello-classifica")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-letto-aggiunto")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-consumazione-pasto")
    root2[i][0][0][0][0].attrib.pop("prezzo-max-colazione")
    root2[i][0][0][0][0].attrib.pop("struttura-chiusa")
    root2[i][0][0][0][0].attrib.pop("numero-camere")
    root2[i][0][0][0][0].attrib.pop("numero-posti-letto")
    root2[i][0][0][0][0].attrib.pop("numero-bagni-comuni")

tree.write("cleaned_b&b.xml")
