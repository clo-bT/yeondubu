def check_keys(data, check_list):
    if set(check_list) != set(data.keys()):
        return False
    if len(check_list) != len(data.keys()):
        return False
    return True

def none_brand_included(data):
    import h5py
    import json
    with h5py.File('./data/data.h5', 'r') as db:
        category_data = db[data['category']][data['subcategory']]['category_data'][()]
        category_data = json.loads(category_data)
    return category_data['brands']

def image_processor(img):
    import sys
    from rembg import remove
    from feature_extractor import FeatureExtractor

    fe = FeatureExtractor()

    img = remove(img)
    feature = fe.extract(img)
    return feature

def filter_items(json_data, filter_query):
    filtered_items = [item for item in json_data 
                      if filter_query["lprice"] <= int(item["lprice"]) <= filter_query["hprice"] 
                      and item["brand"] in filter_query["brand"]]
    return filtered_items

def sim_search(query, data):
    import h5py
    import json
    import numpy as np
    category = data['category']
    subcategory = data['subcategory']
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        feature_data = db[category][subcategory]['npy']
        feature_data = np.array(feature_data)
        
        # dists = np.linalg.norm(feature_data-query, axis=1)
        # ids = np.argsort(dists)[:10]

        filtered_items = filter_items(product_data, filter_query=data)
        filtered_idx = [product_data.index(item) for item in filtered_items]
        dists = np.linalg.norm(feature_data-query, axis=1)
        argsorted_idx = np.argsort(dists[filtered_idx])
        if (len(argsorted_idx) > 9):
            argsorted_idx = argsorted_idx[:9]
        sorted_original_idx = [filtered_idx[i] for i in argsorted_idx]
        sorted_original_items = [product_data[i] for i in sorted_original_idx]

        for item in sorted_original_items:
            print(item)
