import os
import urllib
import h5py
import numpy as np
import json
from dotenv import load_dotenv
from io import BytesIO
from PIL import Image
from feature_extractor import FeatureExtractor

load_dotenv()
CLIENT_ID = os.environ.get('NAVER_ID')
CLIENT_SECRET = os.environ.get('NAVER_PW')
START = 1
COUNT = 10
DISPLAY = 100

def get_shopping_data(client_id, client_secret, query, display, sort, start, count):
    url = "https://openapi.naver.com/v1/search/shop.json?query={}&display={}&sort={}&start={}".format(query, display, sort, start + count*display)
    request = urllib.request.Request(url)
    request.add_header('X-Naver-Client-Id', client_id)
    request.add_header('X-Naver-Client-Secret', client_secret)
    response = urllib.request.urlopen(request)
    dic = response.read().decode('utf-8')
    return eval(dic)['items']

def data_parser(query, fe):
    query = urllib.parse.quote(query)
    result = []
    for cnt in range(COUNT):
        result += get_shopping_data(CLIENT_ID, CLIENT_SECRET, query, DISPLAY, 'sim', START, cnt)
    features = []
    for idx, product in enumerate(result):
        img = result[idx]['image'] = ''.join(product['image'].split('\\'))
        result[idx]['link'] = ''.join(product['link'].split('\\'))
        result[idx]['category1'] = ''.join(product['category1'].split('\\'))
        result[idx]['category2'] = ''.join(product['category2'].split('\\'))
        result[idx]['category3'] = ''.join(product['category3'].split('\\'))
        result[idx]['category4'] = ''.join(product['category4'].split('\\'))
        result[idx]['title'] = product['title'].split("<b>")[0]
        result[idx].pop('hprice')
        result[idx].pop('productId')
        result[idx].pop('mallName')
        result[idx].pop('productType')
        result[idx].pop('maker')
        
        res = urllib.request.urlopen(img).read()
        pic = Image.open(BytesIO(res))
        '''
        배경제거 코드 들어감
        '''
        feature = fe.extract(img=pic)
        features.append(feature)
    return result, features

if __name__ == '__main__':
    fe = FeatureExtractor()
    with open('./query.json', 'r', encoding='utf-8') as file:
        queries = json.load(file)
    with h5py.File('data.h5', 'w') as hdf5_file:
        for category in queries.keys():
            category_group = hdf5_file.create_group(category)
            for subcategory, query in queries[category].items():
                subcategory_group = category_group.create_group(subcategory)
                json_data, features = data_parser(query, fe)
                subcategory_group.create_dataset('json', data=json.dumps(json_data))
                subcategory_group.create_dataset('npy', data=np.array(features))