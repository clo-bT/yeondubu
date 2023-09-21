import json
import h5py
import numpy as np
import urllib
from io import BytesIO
from PIL import Image
from feature_extractor import FeatureExtractor
import threading

FE = FeatureExtractor()

def data_parser(json_data):
    features = []
    for idx in range(len(json_data)):
        img = json_data[idx]['image']
        try:
            res = urllib.request.urlopen(img).read()
            pic = Image.open(BytesIO(res))
            feature = FE.extract(img=pic)
            features.append(feature)
        except:
            features.append(np.zeros(4096,))
    return features

def process_category(category, subcategory): 
    with open('./tmp/'+category+subcategory+'2.json', 'r', encoding='utf-8') as f:
        json_data = json.load(f)
        features = data_parser(json_data)
        np.save('./tmp/'+category+subcategory+'.npy', features)

if __name__ == '__main__':
    with open('./query.json', 'r', encoding='utf-8') as file:
        queries = json.load(file)
    threads = []
    for category, subcategories in queries.items():
        for subcategory, _ in subcategories.items():
            thread = threading.Thread(target=process_category, args=(category, subcategory))
            threads.append(thread)
            thread.start()

    for thread in threads:
        thread.join()

    with h5py.File('data.h5', 'w') as hdf5_file:
        for category in queries.keys():
            category_group = hdf5_file.create_group(category)
            for subcategory, query in queries[category].items():
                subcategory_group = category_group.create_group(subcategory)
                features = np.load('./tmp/'+category+subcategory+'.npy')
                with open('./tmp/'+category+subcategory+'.json', 'r') as json_file:
                    json_data = json.load(json_file)
                subcategory_group.create_dataset('json', data=json.dumps(json_data))
                subcategory_group.create_dataset('npy', data=np.array(features))