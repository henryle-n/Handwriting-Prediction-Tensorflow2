#!/usr/bin/env python
# coding: utf-8

# # Convolutional Neural Network | TensorFlow

# ### Author :: Henry Le
# #### Date : Jul. 19, 2020

# ### Import Tensor Flow Lib
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model


# ### Import Decoder & Image Processing and OS

import base64
import numpy as np
import io
import PIL
import os
import sys

# validate model on cpu
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


# load the trained model
model = load_model("./Trained_Model/final_model.h5")

# recompile the model
model.compile(optimizer='adam', loss='binary_crossentropy',
              metrics=['accuracy'])


def img_predict(base64string):
    
    ################# SET UP HARDWARE ################
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    print(tf.__version__)

    # Set CPU as available physical device
    my_devices = tf.config.experimental.list_physical_devices(device_type='CPU')
    tf.config.experimental.set_visible_devices(
        devices=my_devices, device_type='CPU')

    #####################################################


    # decode from base64 to ASCII
    base64_decoded = base64.b64decode(base64string)
    RGB_img = PIL.Image.open(io.BytesIO(base64_decoded))
    GC_img = RGB_img.convert(mode="L")
    resize_GC_img = GC_img.resize((28, 28))

    # Invert the pixel values to highlight the features of the hand-written digit
    # as 0 x 0 = 0 => weight is not updated
    # pixel value of black (which is the digit ink pixel value) is 0
    # this would decrease performance (slower eight update) of CNN
    # therefore, inverted the grayscale to change the black pixel value
    # instead of 0 closer to 1 (after scaled by /=255)
    inverted_norm_array = 1 - np.asarray(resize_GC_img, dtype=np.float64)/255

    # con2v takes an array of 4 parameters, need to expand to add
    # additional dimension to the imageb
    new_GC_etx = np.expand_dims(inverted_norm_array, axis=(3, 0))

    prediction = np.argmax(model.predict(new_GC_etx), axis=-1)
    return prediction

# run from main script => exe below
if (__name__) == ("__main__"):
    print("Prediction from predict.py")
    # user input to test
    user_input_base64 = user_input_base64.split(",")[-1]
    img_predict(user_input_base64)
