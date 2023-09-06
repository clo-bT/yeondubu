import os
import json
import requests
# from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()
# .env 파일에 NAVER_TOKEN = 네이버 토큰으로 입력할것
naverToken = os.environ.get('NAVER_TOKEN')
cur_lng = 37.482968
cur_lat = 127.0634
rgt = 37.482956    # 좌
btm = 127.0634     # 하
width = 0.00118      # 우
height = 0.00118     # 상
lft = rgt + width
top = btm + height
headers = {
    "Accept-Encoding": "gzip",
    "authorization": f"Bearer {naverToken}",
    "Host": "new.land.naver.com",
    "Referer": f"https://new.land.naver.com/complexes/8928?ms={cur_lng},{cur_lng},16&a=APT&b=A1&e=RETAIL",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
}
URLBase = 'https://new.land.naver.com/api/complexes/single-markers/2.0'
data = {
    'cortarNo' : 'cortarNo=4146510100&',
    'zoom' : 'zoom=17&',
    'priceType' : 'priceType=RETAIL&',
    'option0' : 'markerId&markerType&selectedComplexNo&selectedComplexBuildingNo&fakeComplexMarker&',
    'realEstateType'  : 'realEstateType=APT&',
    'tradeType' : 'tradeType=A1&',
    'tag' : '%3ATWOROOM%3A%3A%3A%3A%3A%3A%3A&',
    'rentalPrice' : 'rentPriceMin=0&rentPriceMax=900000000&',
    'price' : 'priceMin=0&priceMax=70000&',
    'area' : 'areaMin=66&areaMax=165&', 
    'buildYear' : 'oldBuildYears&recentlyBuildYears&',
    'houseCount' : 'minHouseHoldCount=300&maxHouseHoldCount&',
    'option1' : 'showArticle=true&sameAddressGroup=false&',
    'option2' : 'minMaintenanceCost&maxMaintenanceCost&',
    'direction' : 'directions=&',
    'location' : f'leftLon={lft}&rightLon={rgt}&topLat={top}&bottomLat={btm}',
    'option3' : 'isPresale=false'
}
res = requests.get(URLBase,
                 data=data,
                 headers=headers
                 )
res.encoding = "utf8-8-sig"
print(res.status_code)
temp = json.loads(res.text)
print(temp)
# temp = json.loads(res.text)
# print(temp)
# values = soup.split("filter: {")[1].split("}")[0].replace(" ","").replace("'","")
# print(json.loads(json.dumps(res.json())))
# json_str = json.loads(json.dumps(res.json()))
# # json_str = json.loads(json.dumps(res.json()))
# values = json_str['data']['ARTICLE']
# for v in values:
#     lgeo = v['lgeo']
#     count = v['count']
#     z2 = v['z']
#     lat2 = v['lat']
#     lon2 = v['lon']
#     len_pages = count / 20 + 1
#     for idx in range(1, math.ceil(len_pages)):
#         remaked_URL2 = "https://m.land.naver.com/cluster/ajax/articleList?""itemId={}&mapKey=&lgeo={}&showR0=&" \
#                        "rletTpCd={}&tradTpCd={}&z={}&lat={}&""lon={}&totCnt={}&cortarNo={}&page={}"\
#                         .format(lgeo, lgeo, z2, lat2, lon2, count, idx)
