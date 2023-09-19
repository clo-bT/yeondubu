import os
# import sys
import cv2
# import pandas as pd
import numpy as np
import logging
import heapq
import faiss

class FaissIndex():
    def __init__(self):
        pass
      
    def __search__(self, ids, vectors, topN):
        def neighbor_dict_with_path(id_, file_path, score):
            return {'id': float(id_), 'file_path': file_path, 'score': score}
        def neighbor_dict(id_, score):
            return {'id': float(id_), 'score': score}
        def result_dict_str(id_, neighbors):
            return {'id': id_, 'neighbors': neighbors}
        
        results = []
        need_hit = SIMILARITY
        for id_, siftfeature in zip(ids, vectors):
            scores, neighbors = self.index.search(siftfeature, k=topN) if siftfeature.size > 0 else ([], [])
            print(neighbors)
            n, d = neighbors.shape
            result_dict = {}
            for i in range(n):
                l = np.unique(neighbors[i]).tolist()
                for r_id in l:
                    if r_id != -1:
                      score = result_dict.get(r_id, 0)
                      score += 1
                      result_dict[r_id] = score
            h = []
            
            for k in result_dict:
                v = result_dict[k]
                if v >= need_hit:
                    if len(h) < topN:
                        heapq.heappush(h, (v, k))
                    else:
                        heapq.heappushpop(h, (v, k))

            result_list = heapq.nlargest(topN, h, key=lambda x: x[0])
            neighbors_scores = []
            for e in result_list:
                confidence = e[0] * 100 / n
                if self.id_to_vector:
                    file_path = self.id_to_vector(e[1])[0]
                    neighbors_scores.append(neighbor_dict_with_path(e[1], file_path, str(confidence)))
                else:
                    neighbors_scores.append(neighbor_dict(e[1], str(confidence)))
            results.append(result_dict_str(id_, neighbors_scores))
        return results

    def search_by_image(self, image, k):
        ids = [None]
        ret, vectors = get_vectors(self.sift, image)
        print(ret)
        results = self.__search__(ids, [vectors], k)
        return results

def calc_sift(sift, image_file):
    if not os.path.isfile(image_file):
      logging.error('Image:{} does not exist'.format(image_file))
      return -1, None
    try:
      image_o = cv2.imread(image_file)
    except:
      logging.error('Open Image:{} failed'.format(image_file))
      return -1, None
    if image_o is None:
      logging.error('Open Image:{} failed'.format(image_file))
      return -1, None
    image = cv2.resize(image_o, (NOR_X, NOR_Y))
    if image.ndim == 2:
      gray_image = image
    else:
      gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    kp, des = sift.detectAndCompute(gray_image, None)
    sift_feature = np.matrix(des)
    return 0, sift_feature

def get_sift():
    return cv2.xfeatures2d.SIFT_create(nfeatures=NUM_FEATURES, nOctaveLayers=3, contrastThreshold=0.04, edgeThreshold=10, sigma=1.6)

def get_vectors(sift, image):
    return calc_sift(sift, image)

def iterate_files(_dir):
  result = []
  for root, dirs, files in os.walk(_dir, topdown=True):
    for fl in files:
      if fl.endswith("jpg") or fl.endswith("JPG"):
        result.append(os.path.join(root, fl))
  '''for files in os.walk(_dir, topdown=True):
    (x, y, z) = files
  for fl in z:
    if fl.endswith("jpg") or fl.endswith("JPG"):
      result.append(os.path.join(x, fl))'''
  return result

# --------------------- Feature Detect
# resize size
NOR_X = 512
NOR_Y = 384
#Dimension of SIFT feature vectors
SIFT_DIMENSIONS = 128
# Number of features extracted from each image
NUM_FEATURES = 100
dictionary_path = '/faiss-web-service/resources/dictionary'
# --------------------- Variables used for training
#INDEX_KEY = "IDMap,Flat"
#INDEX_KEY = "IDMap,OPQ16_64,IMI2x8,PQ8+16"
#IDMap,OPQ16_64,IMI2x8,PQ8+16"
INDEX_KEY = "IDMap,PCA128,IVF2048,PQ16"
USE_GPU = False

train_image_dir = "/content/train_sep_2"
index_path = "/faiss-web-service/resources/index"
ids_vectors_path = '/faiss-web-service/resources/ids_paths_vectors'

# --------------------- Variables used for searching
TOP_N = 5
SIMILARITY = 5

dimensions = SIFT_DIMENSIONS
index = faiss.index_factory(dimensions, INDEX_KEY)

if USE_GPU:
    print("Use GPU...")
    res = faiss.StandardGpuResources()
    index = faiss.index_cpu_to_gpu(res, 0, index)

images_list = iterate_files('/test_imgs/')
ids_count = 0
index_dict = {}
ids = None
features = np.matrix([])
sift = get_sift()

for file_name in images_list:
    ret, sift_feature = calc_sift(sift, file_name)
    if ret == 0 and sift_feature.any():
        image_dict = {ids_count: (file_name, sift_feature)}
        index_dict.update(image_dict)
        #print(sift_feature.shape[0])
        ids_list = np.linspace(ids_count, ids_count, num=sift_feature.shape[0], dtype="int64")
        ids_count += 1
        if features.any():
            features = np.vstack((features, sift_feature))
            ids = np.hstack((ids, ids_list))
        else:
            features = sift_feature
            ids = ids_list
        if ids_count % 9000000 == 8999999:
            if not index.is_trained and INDEX_KEY != "IDMap,Flat":
                index.train(features)
                index.add_with_ids(features, ids)
                ids = None
                features = np.matrix([])

if features.any():
    if not index.is_trained and INDEX_KEY != "IDMap,Flat":
        index.train(features)
        print('done training')
        index.add_with_ids(features, ids)
        print('done adding')