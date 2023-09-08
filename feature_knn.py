import numpy as np
from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path

# Read image features
fe = FeatureExtractor()
features = []
img_paths = []

for feature_path in Path("./static/feature").glob("*.npy"):
    features.append(np.load(feature_path))
    img_paths.append(Path("./static/img") / (feature_path.stem + ".jpg"))
    
features = np.array(features)
print(features)
img = Image.open('./static/img/goguma.jpg') 
# Run search
query = fe.extract(img)
dists = np.linalg.norm(features-query, axis=1)  # L2 distances to features
ids = np.argsort(dists)[:5]  # Top 30 results
scores = [(dists[id], img_paths[id]) for id in ids]
print(scores)