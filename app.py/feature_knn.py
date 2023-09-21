import numpy as np
from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path

# image를 input.png, 비교할 DB||hdf5, 최대 출력 입력 구간
INPUT_IMAGE = './input.png'
COMPARE_DB = 'desk'
MX = 30

features = []

# 현재 L2 dist 기반으로 검색을 하고 있음.
# 확장성을 위해서 faiss indexing으로 전환할 예정임.
features_path = Path("./static/feature") / (COMPARE_DB + ".npy")
features = np.load(features_path)
features = np.array(features)

fe = FeatureExtractor()
img = Image.open(INPUT_IMAGE)
query = fe.extract(img)
dists = np.linalg.norm(features-query, axis=1)

ids = np.argsort(dists)[:]
scores = [(id, dists[id]) for id in ids]

print(scores)