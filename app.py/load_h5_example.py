import h5py
import json
import numpy as np
from pprint import pprint

# Open the HDF5 file for reading
with h5py.File('data.h5', 'r') as hdf5_file:
    categories = hdf5_file.keys()
    for category in categories:
        print(f'Category: {category}')
        category_group = hdf5_file[category]
        subcategories = category_group.keys()
        for subcategory in subcategories:
            print(f'Subcategory: {subcategory}')
            subcategory_group = category_group[subcategory]
            json_data = json.loads(subcategory_group['json'][()])
            npy_data = np.array(subcategory_group['npy'])
            print("JSON Data:")
            pprint(json_data)
            print("NumPy Data:")
            print(npy_data)
