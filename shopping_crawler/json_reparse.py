import json

def rewrite(json_file):
    for idx in range(len(json_file)):
        json_file[idx]['link'] = json_file[idx]['link'].replace('gate.nhn?id=', 'catalog/')
    return json_file

with open('./query.json', 'r', encoding='utf-8') as file:
    queries = json.load(file)

for category, subcategories in queries.items():
    for subcategory in subcategories:
        with open('./static/json/'+category+subcategory+'.json', 'r') as json_file:
            origin = json.load(json_file)
        new_json = rewrite(origin)
        with open('./static/json/'+category+subcategory+'2.json', 'w', encoding='utf-8') as f:
            json.dump(new_json, json_file)
        f.flush()