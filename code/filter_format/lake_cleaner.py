import rdflib
import  json

g = rdflib.Graph()
g.parse("lakes.rdf")
jsonFile = []
lakes ={}
lake = {"name": "", "surfaceArea": 0, "location": ""}
for uriref, type, data in g:
    if uriref not in lakes.keys():
        lakes[uriref] ={"name": "", "surfaceArea": 0, "location": ""}
    if (type == rdflib.term.URIRef('http://www.w3.org/2000/01/rdf-schema#label') and len (data)>4):
        lakes[uriref]["name"] = str(data)
    if (type == rdflib.term.URIRef('http://www.territorio.provincia.tn.it/geodati/ontology/surfaceArea')):
        lakes[uriref]["surfaceArea"] = str(data)
    if (type == rdflib.term.URIRef('http://www.territorio.provincia.tn.it/geodati/ontology/polygon')):
        lakes[uriref]["location"] = str(data)

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(list(lakes.values()), f, ensure_ascii=False, indent=4)
