import xml.etree.ElementTree as ET

tree2 = ET.parse('B&B_information_FINAL-1357.xml')
root2 = tree2.getroot()
str = ""
for test in root2.iter('prezzi-localita'):
    for stuff in test.findall('tipo-extraalbergo'):
        if "tipologia-extraalberghiera" in stuff.attrib:
            if stuff.attrib["tipologia-extraalberghiera"] == "CASA-VACANZE":
                 #print(test[0].attrib["tipologia-extraalberghiera"])
                 xmlstr = ET.tostring(test, encoding='unicode', method='xml')
                 str += xmlstr

text_file = open("sample2.txt", "w", errors= "ignore")
n = text_file.write(str)
print(n)
text_file.close()
