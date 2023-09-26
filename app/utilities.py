def check_keys(data, check_list):
    if set(check_list) != set(data.keys()):
        return False
    if len(check_list) != len(data.keys()):
        return False
    return True

def image_processor(img):
    import sys
    from rembg import remove
    from feature_extractor import FeatureExtractor

    fe = FeatureExtractor()

    img = remove(img)
    feature = fe.extract(img)
    return feature

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
        
        dists = np.linalg.norm(feature_data-query, axis=1)
        ids = np.argsort(dists)[:10]
        sorted_products = [product_data[id] for id in ids]
        return sorted_products
    
