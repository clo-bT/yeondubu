import os
import cv2
import urllib
import numpy as np

from dotenv import load_dotenv
from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path

load_dotenv()
CLIENT_ID = os.environ.get('NAVER_ID')
CLIENT_SECRET = os.environ.get('NAVER_PW')
TYPES = ['냉장고', '침대']
DISPLAY = 10
START = 1
COUNT = 1

def get_shopping_data(client_id, client_secret, query, display, sort, start, count):
    url = "https://openapi.naver.com/v1/search/shop.json?query={}&display={}&sort={}&start={}".format(query, display, sort, start + count*100)
    request = urllib.request.Request(url)
    request.add_header('X-Naver-Client-Id', client_id)
    request.add_header('X-Naver-Client-Secret', client_secret)
    response = urllib.request.urlopen(request)
    dic = response.read().decode('utf-8')
    return eval(dic)['items']

if __name__ == '__main__':
    fe = FeatureExtractor()
    result = []
    for q in TYPES:
        q = urllib.parse.quote(q)
        for cnt in range(COUNT):
            result += get_shopping_data(CLIENT_ID, CLIENT_SECRET, q, DISPLAY, 'sim', START, COUNT)

    for idx, product in enumerate(result):
        img = ''.join(product['image'].split('\\'))
        res = urllib.request.urlopen(img).read()
        image_np = np.frombuffer(res, dtype=np.uint8)
        image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
        cv2.imwrite('./tmp/' + str(idx) + '.png', image)
        '''
        BGrem 이 부분에서 식별해서 배경 제거할것
        OS.remove(원본파일)
        '''
        feature = fe.extract(img=Image.open('./tmp/' + str(idx) + '.png'))
        feature_path = Path("./static/feature") / (str(idx) + ".npy")
        '''
        OS.remove(배경제거파일)
        '''
        np.save(feature_path, feature)
        # os.remove('./tmp/tmp.png')
