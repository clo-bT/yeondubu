import os
import json
import urllib.parse
import urllib.request
from dotenv import load_dotenv

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

def data_parser(query):
    query = urllib.parse.quote(query)
    result = []
    for cnt in range(COUNT):
        result += get_shopping_data(CLIENT_ID, CLIENT_SECRET, query, DISPLAY, 'sim', START, cnt)

    for idx, product in enumerate(result):
        result[idx]['image']       = ''.join(product['image'].split('\\'))
        result[idx]['link']        = ''.join(product['link'].split('\\'))
        result[idx]['category1']   = ''.join(product['category1'].split('\\'))
        result[idx]['category2']   = ''.join(product['category2'].split('\\'))
        result[idx]['category3']   = ''.join(product['category3'].split('\\'))
        result[idx]['category4']   = ''.join(product['category4'].split('\\'))
        result[idx]['title'] = product['title'].split("<b>")[0]
        result[idx].pop('hprice')
        result[idx].pop('productId')
        result[idx].pop('mallName')
        result[idx].pop('productType')
        result[idx].pop('maker')
    return result

if __name__ == '__main__':
    with open('./query.json', 'r', encoding='utf-8') as file:
        queries = json.load(file)
        
    for category, subcategories in queries.items():
        for subcategory, query in subcategories.items():
            json_data = data_parser(query)
            with open('./tmp/'+category+subcategory+'.json', 'w', encoding='utf-8') as json_file:
                json.dump(json_data, json_file, ensure_ascii=False, indent=4)
