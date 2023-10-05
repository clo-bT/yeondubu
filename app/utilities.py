import h5py
import json
import numpy as np

def get_params(request):
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    lprice = int(request.args.get('lprice')) if request.args.get('lprice') else None
    hprice = int(request.args.get('hprice')) if request.args.get('lprice') else None
    brand_data = request.args.get('brand')
    brand_data = brand_data.split(',')
    brand = brand_data if brand_data != [] else None
    page = int(request.args.get('page'))
    return category, subcategory, hprice, lprice, brand, page


def product_category(category, subcategory):
    with h5py.File('./data/data.h5', 'r') as db:
        category_data = db[category][subcategory]['category_data'][()]
        category_data = json.loads(category_data)
    return category_data
    

def liked_products(liked_idxs, category, subcategory):
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        filtered_items = [product_data[idx] for idx in liked_idxs]
    return filtered_items


def check_keys(data, check_list):
    if not set(check_list) == set(data.keys()):
        return False
    if not len(check_list) == len(data.keys()):
        return False
    return True


def filter_items(json_data, hprice, lprice, brand):
    if brand and brand != ['']:
        filtered_items = [item for item in json_data 
                        if lprice <= int(item["lprice"]) <= hprice 
                        and item["brand"] in brand]
    else:
        filtered_items = [item for item in json_data 
                        if lprice <= int(item["lprice"]) <= hprice]
    return filtered_items


def image_processor(img):
    from rembg import remove
    from feature_extractor import FeatureExtractor
    img = remove(img)
    fe = FeatureExtractor()
    feature = fe.extract(img)
    return feature


def sim_search(query, category, subcategory, hprice, lprice, brand):
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        feature_data = db[category][subcategory]['npy']
        feature_data = np.array(feature_data)
        filtered_items = filter_items(product_data, hprice, lprice, brand)
        filtered_idx = [product_data.index(item) for item in filtered_items]
        dists = np.linalg.norm(feature_data-query, axis=1)
        argsorted_idx = np.argsort(dists[filtered_idx])
        if (len(argsorted_idx) > 9):
            argsorted_idx = argsorted_idx[:9]
        sorted_original_idx = [filtered_idx[i] for i in argsorted_idx]
        sorted_original_items = [product_data[i] for i in sorted_original_idx]
        return sorted_original_items

    
def range_filter(category, subcategory, hprice, lprice, brand, page):
    cnt = 30
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        if hprice and lprice and brand:
            filtered_items = filter_items(product_data, hprice, lprice, brand)
        else:
            filtered_items = product_data
        mx_cnt = int(len(filtered_items))
        lst = []
        if (page+1)*cnt > mx_cnt:
            return lst
        dct = {'products' : filtered_items[page * cnt : (page + 1) * cnt]}
        return dct
