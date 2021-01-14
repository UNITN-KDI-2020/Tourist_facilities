import xml.etree.ElementTree as ET

tree2 = ET.parse('cleaned_b&b.xml')
root2 = tree2.getroot()

for test in root2.iter('lista-posti-letto'):
    for stuff in test.findall('postiletto-mobili'):
        print(stuff)
        test.remove(stuff)

for test in root2.iter('prezzi-extraalbergo'):
    for stuff in test.findall('lista-servizi-aggiuntivi'):
        print(stuff)
        test.remove(stuff)
    for stuff in test.findall('lista-servizi-accessori'):
        print("HOOOOOLA",stuff)
        #test.remove(stuff)
        for cod in stuff.findall('servizio'):
            print("HHHHHHHHHHHHH", cod)
            if "codice" in cod.keys():
                cod.attrib.pop("codice")

for test in root2.iter('prezzi-eea'):
    if "struttura-sospesa" in test.keys():
        test.attrib.pop("struttura-sospesa")
    if "id-EsercizioRicettivo" in test.keys():
        test.attrib.pop("id-EsercizioRicettivo")



for test in root2.iter('prezzi-extraalbergo'):
    if "recapito-fax" in test.keys():
        test.attrib.pop("recapito-fax")
    if "tipologia-extraalberghiera" in test.keys():
        test.attrib.pop("tipologia-extraalberghiera")
for test in root2.iter('lista-posti-letto'):
    if "mobili" in test.keys():
        test.attrib.pop("mobili")


for test in root2.iter('prezzi-localita'):
    if "id-localita" in test.keys():
        test.attrib.pop("id-localita")

tree2.write("cleaned_b&b2.xml")
