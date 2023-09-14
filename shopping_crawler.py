import os
import cv2
from io import BytesIO
import numpy as np
from pathlib import Path
from PIL import Image
import urllib

import json
from dotenv import load_dotenv
from feature_extractor import FeatureExtractor

load_dotenv()
CLIENT_ID = os.environ.get('NAVER_ID')
CLIENT_SECRET = os.environ.get('NAVER_PW')

# with open('furniture.json', 'r') as file1:
#     furniture = json.load(file1)
# with open('appliances.json', 'r') as file2:
#     appliances = json.load(file2)
# queries = {**furniture, **appliances}

# queries = {"sofa":"소파", "desk":"책상", "drawer":"서랍장"}
queries = {"desk":"책상"}

#총 1000개 상품 크롤링
# START = 1
# COUNT = 10
# DISPLAY = 100
START = 1
COUNT = 1
DISPLAY = 10

def get_shopping_data(client_id, client_secret, query, display, sort, start, count):
    url = "https://openapi.naver.com/v1/search/shop.json?query={}&display={}&sort={}&start={}".format(query, display, sort, start + count*display)
    request = urllib.request.Request(url)
    request.add_header('X-Naver-Client-Id', client_id)
    request.add_header('X-Naver-Client-Secret', client_secret)

    response = urllib.request.urlopen(request)
    dic = response.read().decode('utf-8')
    return eval(dic)['items']

if __name__ == '__main__':
    fe = FeatureExtractor()
    for cat, query in queries.items():
        result = []
        query = urllib.parse.quote(query)
        for cnt in range(COUNT):
            result += get_shopping_data(CLIENT_ID, CLIENT_SECRET, query, DISPLAY, 'sim', START, cnt)

        features = []
        features_path = Path("./static/feature") / (str(cat) + ".npy")
        for idx, product in enumerate(result):
            img = ''.join(product['image'].split('\\'))
            # res = urllib.request.urlopen(img).read()
            # image_np = np.frombuffer(res, dtype=np.uint8)
            # image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
            # cv2.imwrite('./tmp/' + str(idx) + '.png', image)
            # res = requests.get(img, stream=True)
            res = urllib.request.urlopen(img).read()
            pic = Image.open(BytesIO(res))
            print(type(pic))

            '''
            BGrem 이 부분에서 식별해서 배경 제거할것
            OS.remove(원본파일)
            '''
            # feature = fe.extract(img=Image.open('./tmp/' + str(idx) + '.png'))
            # features.append(feature)
            '''
            OS.remove(배경제거파일)
            '''
        np.save(features_path, np.array(features))
