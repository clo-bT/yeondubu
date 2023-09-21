def veiry(data):
    pass

def image_processor(img):
    import sys
    sys.path.append("../img_utils")
    from feature_extractor import FeatureExtractor
    from bgrem import background_remove

    fe = FeatureExtractor()
    img = background_remove(img)
    feature = fe.extract(img)
    return feature

def sim_search(query, data):
    import h5py
    import json
    import numpy as np
    category = data['category']
    subcategory = data['subcategory']
    with h5py.File('../static/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        feature_data = db[category][subcategory]['npy']
        feature_data = np.array(feature_data)
        
        dists = np.linalg.norm(feature_data-query, axis=1)
        ids = np.argsort(dists)[:10]
        sorted_products = [product_data[id] for id in ids]
        # filtered_products = [(product_data.index(product), product) for product in product_data
        #                      if int(filter['lprice']) <= product['lprice'] <= int(filter['hprice'])
        #                      and product['brand'] in filter['brands']]

        # dists = np.linalg.norm(np.array([feature_data[idx] for idx, product in filtered_products]) - query, axis=1)
        # sorted_indices = np.argsort(dists)
        # sorted_products = [filtered_products[i] for i in sorted_indices]
        # if (len(sorted_products) > filter['item_cnt']):
        #     sorted_products = sorted_products[:filter['item_cnt']]
        return sorted_products
    
