import struct
import glob
import numpy as np
import os
import tensorflow as tf
import tensorflow.keras.layers as layers
from tensorflow.keras.models import Model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

def preprocess(img_path, input_shape):
    img = tf.io.read_file(img_path)
    img = tf.image.decode_jpeg(img, channels=input_shape[2])
    img = tf.image.resize(img, input_shape[:2])
    img = preprocess_input(img)
    return img

def main():
    batch_size = 100
    input_shape = (224, 224, 3)
    base = tf.keras.applications.MobileNetV2(input_shape=input_shape,
                                             include_top=False,
                                             weights='imagenet')
    base.trainable = False
    model = Model(inputs=base.input, outputs=layers.GlobalAveragePooling2D()(base.output))
    root_dir = "./test_imgs"
    images = []
    for(dirpath, dirnames, filenames) in os.walk(root_dir):
        for filename in filenames:
            if ".png" in filename or ".jpg" in filename or ".jpeg" in filename:
                images.append(dirpath + "/" + filename)
    fnames = images
    list_ds = tf.data.Dataset.from_tensor_slices(fnames)
    ds = list_ds.map(lambda x: preprocess(x, input_shape), num_parallel_calls=-1)
    dataset = ds.batch(batch_size).prefetch(-1)

    with open('fvecs.bin', 'wb') as f:
        for batch in dataset:
            fvecs = model.predict(batch)

            fmt = f'{np.prod(fvecs.shape)}f'
            f.write(struct.pack(fmt, *(fvecs.flatten())))

    with open('fnames.txt', 'w') as f:
        f.write('\n'.join(fnames))

if __name__ == '__main__':
    main()