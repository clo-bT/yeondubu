import os
import sys
import json
import h5py
import numpy as np
import urllib
from io import BytesIO
from PIL import Image
sys.path.append("../img_utils")
from feature_extractor import FeatureExtractor
from bgrem import background_remove

FE = FeatureExtractor()
THREAD_MAX = 2

def data_parser(json_data):
    features = []
    for idx in range(len(json_data)):
        img = json_data[idx]['image']
        try:
            res = urllib.request.urlopen(img).read()
            pic = Image.open(BytesIO(res))
            pic = background_remove(pic)
            feature = FE.extract(img=pic)
            features.append(feature)
        except:
            features.append(np.zeros(4096,))
    return features

def process_category(category, subcategory): 
    with open('./tmp/json/'+category+subcategory+'.json', 'r', encoding='utf-8') as f:
        json_data = json.load(f)
        features = data_parser(json_data)
        np.save('./tmp/feature/'+category+subcategory+'.npy', features)

if __name__ == '__main__':
    with open('./query_3.json', 'r', encoding='utf-8') as file:
        queries = json.load(file)

    for category, subcategories in queries.items():
        for subcategory, _ in subcategories.items():
            process_category(category, subcategory)

    # hdf5 파일로 저장
    # with h5py.File('../static/data.h5', 'w') as hdf5_file:
    #     for category in queries.keys():
    #         category_group = hdf5_file.create_group(category)
    #         for subcategory, query in queries[category].items():
    #             with open('./tmp/json/'+category+subcategory+'.json', 'r') as json_file:
    #                 json_data = json.load(json_file)
    #             features = np.load('./tmp/feature/'+category+subcategory+'.npy')

    #             subcategory_group = category_group.create_group(subcategory)
    #             subcategory_group.create_dataset('json', data=json.dumps(json_data))
    #             subcategory_group.create_dataset('npy', data=np.array(features))
    
    # # DB 구성 완료 후 임시저장 json, npy 삭제
    # for category in queries.keys():
    #     for subcategory in queries[category].keys():
    #         os.remove("./tmp/json/"+category+subcategory+".json")
    #         os.remove("./tmp/feature/"+category+subcategory+".npy")