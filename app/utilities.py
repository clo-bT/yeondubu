import h5py
import json
import numpy as np

def get_params(request):
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    hprice = request.args.get('hprice')
    lprice = request.args.get('lprice')
    brand = None if request.args.get('brand') == '' else request.args.get('brand')
    page = request.args.get('page')
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
    if brand:
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
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        if hprice and lprice and brand:
            filtered_items = filter_items(product_data, hprice, lprice, brand)
        else:
            filtered_items = product_data
        mx_cnt = int(len(filtered_items) / 9)
        page_btm = (page-2) if (page-2) > 0 else 0
        page_top = (page+3) if (page+3) < mx_cnt else mx_cnt

        lst = []
        for idx in range(page_btm, page_top):
            dct = {'page' : idx}
            dct = {'products' : filtered_items[idx * 9 : (idx + 1) * 9]}
            lst.append(dct)
        
        return filtered_items
