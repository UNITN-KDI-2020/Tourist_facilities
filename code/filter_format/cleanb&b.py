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
    if "numero-camere" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-camere")
    if "numero-posti-letto" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-posti-letto")
    if "numero-bagni-comuni" in root2[i][0][0][0][0].keys():
        root2[i][0][0][0][0].attrib.pop("numero-bagni-comuni")

tree2.write("cleaned_b&b.xml")
