import os
import json
import h5py
import urllib.parse
import urllib.request
from math import ceil
from dotenv import load_dotenv

class NaverImageCrawler():
    def __init__(self, id = None, secret = None):
        self.client_id = id
        self.client_secret = secret

    def get_shopping_data(self, query, count, sort = "sim", start = 1, display = 100):
        url = "https://openapi.naver.com/v1/search/shop.json?query={}&display={}&sort={}&start={}".format(query, display, sort, start + count*display)
        request = urllib.request.Request(url)
        request.add_header('X-Naver-Client-Id', self.client_id)
        request.add_header('X-Naver-Client-Secret', self.client_secret)
        response = urllib.request.urlopen(request)
        dic = response.read().decode('utf-8')
        return eval(dic)['items']

    def shopping_list(self, query, count = 10):        
        result = list()
        for cnt in range(count):
            result += self.get_shopping_data(query, cnt)
        return result

    def data_extract(self, query):
        query = urllib.parse.quote(query)
        result = self.shopping_list(query)
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

    def category_data(self, ref):
        tmp = {"max_page" : ceil(len(ref)/9 - 1)}
        brand_set = set()
        max_price = ref[0]["lprice"]
        for item in ref:
            brand_set.add(item.get("brand"))
            max_price = max(max_price, item.get("lprice"))
        tmp["brands"] = list(brand_set)
        tmp["max_price"] = max_price
        return tmp

if __name__ == '__main__':
    load_dotenv()
    CLIENT_ID     = os.environ.get('NAVER_ID')
    CLIENT_SECRET = os.environ.get('NAVER_PW')
    query_file    = os.environ.get('query_file')
    target_file   = os.environ.get('target_file')

    with open(query_file, 'r', encoding='utf-8') as file:
        queries = json.load(file)

    with h5py.File(target_file, 'w') as hdf5_file:
        for category, subcategories in queries.items():
            category_group = hdf5_file.create_group(category)
            for subcategory, query in subcategories.items():
                subcategory_group = category_group.create_group(subcategory)
                crawler = NaverImageCrawler(id = CLIENT_ID, secret = CLIENT_SECRET)
                json_data = crawler.data_extract(query)
                cat_data = crawler.category_data(json_data)
                subcategory_group.create_dataset('category_data', data=json.dumps(cat_data))
                subcategory_group.create_dataset('json', data=json.dumps(json_data))
