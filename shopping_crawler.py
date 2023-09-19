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
furniture_queries = {
    "sofa":"소파",
    "desk":"책상",
    "drawer":"서랍장",
    "bed":"침대",
    "dressing_table":"화장대",
    "table":"식탁",
    "cabinet":"장식장",
    "wardrobe":"장롱",
    "chair":"의자"
}

appliance_queries = {
    "refrigerator": "냉장고",
    "dryer":"건조기",
    "air_cleaner":"공기청정기",
    "rice_cooker":"밥솥",
    "microwave":"전자레인지",
    "air_conditioner":"에어컨",
    "styler":"스타일러",
    "fan":"선풍기",
    "washing_machine":"세탁기",
    "robot_vacuum_cleaner":"로봇청소기",
    "vacuum_cleaner":"청소기",
    "air_fryer":"에어프라이어"
}

queries = [furniture_queries, appliance_queries]

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
    for i in range(2):
        answer = {}
        for cat, query in queries[i].items():
            result = []
            query = urllib.parse.quote(query)
            for cnt in range(COUNT):
                result += get_shopping_data(CLIENT_ID, CLIENT_SECRET, query, DISPLAY, 'sim', START, cnt)

            features = []
            features_path = Path("./static/feature") / (str(cat) + ".npy")
            for idx, product in enumerate(result):
                link = ''.join(product['link'].split('\\'))
                img = ''.join(product['image'].split('\\'))
                cat1 = ''.join(product['category1'].split('\\'))
                result[idx]['link'] = link
                result[idx]['image'] = img
                result[idx]['category1'] = cat1
                result[idx].pop('hprice')
                result[idx].pop('productId')
                result[idx].pop('mallName')
                result[idx].pop('productType')
                result[idx].pop('maker')
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
            answer[cat] = result
            '''
            hdf5 파일 저장 코드 필요
            json 저장
            '''
            np.save(features_path, np.array(features))
        if not i:
            with open('./furniture.json', 'w', encoding='utf-8') as f:
                json.dump(answer, f, ensure_ascii=False, indent=4)
        if i:
            with open('./appliance.json', 'w', encoding='utf-8') as f:
                json.dump(answer, f, ensure_ascii=False, indent=4)