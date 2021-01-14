import xml.etree.ElementTree as ET

tree = ET.parse('B&B_information_FINAL.xml')
root = tree.getroot()
id = 1503
for test in root.iter('prezzi-extraalbergo'):
    test.attrib["id"] = str(id)
    print(test.attrib)
    id += 1
name = "B&B_information_FINAL-"+ str(id -1503)+".xml"
tree.write(name)
