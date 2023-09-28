import h5py
import json
import numpy as np
from flask import jsonify
from pprint import pprint 
from rembg import remove

def rspns(data, status_code):
    response = jsonify(data)
    response.status_code = status_code
    return response

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

def brand_none_included(data):
    with h5py.File('./data/data.h5', 'r') as db:
        category_data = db[data['category']][data['subcategory']]['category_data'][()]
        category_data = json.loads(category_data)
    return category_data['brands']

def image_processor(img):
    from feature_extractor import FeatureExtractor
    img = remove(img)
    fe = FeatureExtractor()
    feature = fe.extract(img)
    return feature

def filter_items(json_data, filter_query):
    filtered_items = [item for item in json_data 
                      if int(filter_query["lprice"]) <= int(item["lprice"]) <= int(filter_query["hprice"]) 
                      and item["brand"] in filter_query["brand"]]
    return filtered_items

def sim_search(query, data):
    category = data['category']
    subcategory = data['subcategory']
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        feature_data = db[category][subcategory]['npy']
        feature_data = np.array(feature_data)
        filtered_items = filter_items(product_data, filter_query=data)
        filtered_idx = [product_data.index(item) for item in filtered_items]
        dists = np.linalg.norm(feature_data-query, axis=1)
        argsorted_idx = np.argsort(dists[filtered_idx])
        if (len(argsorted_idx) > int(data['count'])):
            argsorted_idx = argsorted_idx[:int(data['count'])]
        sorted_original_idx = [filtered_idx[i] for i in argsorted_idx]
        sorted_original_items = [product_data[i] for i in sorted_original_idx]
        # pprint(sorted_original_items)
        return sorted_original_items
    
def range_filter(data):
    category = data['category']
    subcategory = data['subcategory']
    with h5py.File('./data/data.h5', 'r') as db:
        product_data = db[category][subcategory]['json'][()]
        product_data = json.loads(product_data)
        filtered_items = filter_items(product_data, filter_query=data)
        # if (len(argsorted_idx) > int(data['count'])):
        #     argsorted_idx = argsorted_idx[:int(data['count'])]
        return filtered_items