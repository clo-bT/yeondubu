import os
import json
import requests
from dotenv import load_dotenv

# .env 파일에 NAVER_TOKEN = 네이버 토큰으로 입력할것
load_dotenv()
naverToken = os.environ.get('NAVER_TOKEN')
cur_lng = 37.482968
cur_lat = 127.0634
lft = 127.0872525     # 좌
btm =  37.3176669     # 하
div = 0.02            # 한 변의 길이
rgt = lft + div
top = btm + div

URLBase = 'https://new.land.naver.com/api/complexes/single-markers/2.0'
headers = {
    "Accept-Encoding": "gzip",
    "authorization": f"Bearer {naverToken}",
    "Host": "new.land.naver.com",
    "Referer": "https://new.land.naver.com/complexes/8928?ms={},{},16&a=APT&b=A1&e=RETAIL".format(cur_lng, cur_lat),
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
}
data = {
    'cortarNo' : 4146510100,
    'zoom' : 17,
    'priceType' : 'RETAIL',
    'markerId' : '',
    'markerType' : '',
    'selectedComplexNo': '',
    'selectedComplexBuildingNo': '',
    'fakeComplexMarker': '',
    'realEstateType'  : 'APT',
    'tradeType' : 'A1',
    'tag' : '%3ATWOROOM%3A%3A%3A%3A%3A%3A%3A&',
    'rentPriceMin' : 0,
    'rentPriceMax' : 900000000,
    'priceMin' : 0,
    'priceMax' : 70000,
    'areaMin' : 66,
    'areaMax' : 165, 
    'oldBuildYears' : '',
    'recentlyBuildYears' : '',
    'minHouseHoldCount' : 300, 
    'maxHouseHoldCount' : '',
    'showArticle' : 'true', 
    'sameAddressGroup' : 'false',
    'minMaintenanceCost' : '',
    'maxMaintenanceCost' : '',
    'direction' : '',
    'leftLon' : {lft},
    'rightLon' : {rgt},
    'topLat' : {top},
    'bottomLat' : {btm},
    'isPresale' : 'false',
}
res = requests.get(URLBase,
                 params=data,
                 headers=headers
                 )

with open('output.json', 'w', encoding='UTF-8') as json_file:
    json.dump(res.json(), json_file, indent=4, ensure_ascii=False)
