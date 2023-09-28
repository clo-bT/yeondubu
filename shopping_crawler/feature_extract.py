import os
import sys
import json
import h5py
import numpy as np
import urllib
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv
from rembg import remove
sys.path.append("../img_utils")
from feature_extractor import FeatureExtractor

def feature_list(json_data, module):
    features = []
    for idx in range(len(json_data)):
        img = json_data[idx]['image']
        try:
            res = urllib.request.urlopen(img).read()
            pic = Image.open(BytesIO(res))
            pic = remove(pic)
            feature = module.extract(img=pic)
            features.append(feature)
        except:
            features.append(np.zeros(4096,))
    return features

if __name__ == '__main__':
    load_dotenv()
    query_file    = os.environ.get('query_file')
    target_file   = os.environ.get('target_file')
    fe = FeatureExtractor()
    
    with open(query_file, 'r', encoding='utf-8') as file:
        queries = json.load(file)

    with h5py.File(target_file, 'a') as hdf5_file:
        for category in queries.keys():
            for subcategory, query in queries[category].items():
                json_data = hdf5_file[category][subcategory]['json'][()]
                # features = feature_list(json_data, fe)
                features = np.load('./tmp/feature/'+category+subcategory+'.npy')
                hdf5_file[category][subcategory].create_dataset('npy', data=np.array(features))
    