def image_processor(img):
    sys.path.append("../img_utils")
    from feature_extractor import FeatureExtractor
    from bgrem import background_remove

    fe = FeatureExtractor()
    img = background_remove(img)
    feature = fe.extract(img)
    return feature
'''
filter = {
    'brand'   : 'LG퓨리케어,삼성,...,다이슨'
    'lprice'  : 5000000,
    'hprice'  : 500000000,
    'item_cnt': 20,
}
'''

def sim_search(query, category, subcategory, filter):
    import h5py
    import json
    import numpy as np

    with h5py.File('../static/data.h5', 'r') as db:
        product_data = json.load(db[category][subcategory]['json'], ascii=False)
        feature_data = np.load(db[category][subcategory]['npy'])
        feature_data = np.array(feature_data)

        filtered_products = [(product_data.index(product), product) for product in product_data
                             if int(filter['lprice']) <= product['lprice'] <= int(filter['hprice'])
                             and product['brand'] in filter['brands']]

        dists = np.linalg.norm(np.array([feature_data[idx] for idx, product in filtered_products]) - query, axis=1)
        sorted_indices = np.argsort(dists)
        sorted_products = [filtered_products[i] for i in sorted_indices]
        if (len(sorted_products) > filter['item_cnt']):
            sorted_products = sorted_products[:filter['item_cnt']]
        return sorted_products