import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.callbacks import TensorBoard
from tensorflow.keras.datasets import mnist
from tensorflow.keras.layers import BatchNormalization
import numpy as np
from time import time



# import matplotlib.pyplot as plt
import numpy as np
import os 
from os import listdir
from os.path import isfile, join

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing import image as image_processing

print(tf.__version__)

import os
os.environ["CUDA_VISIBLE_DEVICES"]="-1"


# Set CPU as available physical device
my_devices = tf.config.experimental.list_physical_devices(device_type='CPU')
tf.config.experimental.set_visible_devices(devices= my_devices, device_type='CPU')
print(my_devices)

# load the trained model
model = load_model("./Trained_Model/final_model.h5")

# recompile the model
model.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])


def img_predict (img_path):
   
    img_name = img_path.split("/")[-1]
    print(f'Processing Image :: {img_name}')
    
    
    # use keras built in img processing to read input image
    image_size = (28, 28)
    img = image_processing.load_img(img_path,
                                    target_size=image_size,
                                    color_mode="grayscale")
    
    # convert raw img to np arrays
    image = img_to_array(img)
    
    # con2v takes an array of 4 parameters, need to expand to add
    # additional dimension to the image
    image /= 255   
    image = np.expand_dims(image, axis=0)
    
    # Invert the pixel values to match the original data
    # when Keras load the picture, the rgb values were inverted
    image = 1 - image
    
    prediction = np.argmax(model.predict(image), axis=-1)
    return print(f"This is number :: {prediction[0]}\n{('=')*40}")

# create a list of all picture path inside test image folder
base_path = "./images/test-img/"
img_list = [base_path + img for img in listdir(base_path) if isfile(join(base_path, img))]

# looping thru each img and make prediction
st_time = time()
for ea_iter in tf.range(len(img_list)):
    ea_iter = tf.cast(ea_iter, tf.int64)
    img_predict(img_list[ea_iter])
total_time = time() - st_time 
print (f'Total Prediction Run Time :: {round(total_time, 3)} seconds || {len(img_list)} images')

# ### Henry Le, 07/17/2020 :: 
# 
# Upon re-training the model, running the handwritten created by MS OneNote Functions, and screen snipping tool, I observed the following:
# 
# 1. Re-training model has potential of changing the prediction, i.e. first model predicted right, then next rerun predict number wrong.     
# 
# 
# 2. The original snipped file would be predicted more accurately if the image has width == height. This is due to the fact that the MNIST dataset has width == height, thus the trained model weight matrices retain the same shape. When I purposely create a test handwritten with width !== height, although it is the exact same number, it is still make the model predict the number wrong. This I think due to when Keras try to resize the image, the original image was distorted. It is same as trying to resize the image without retaining the aspect ratio, such as if height >> width, the height dimension will be compressed more significant than the width. Thus the image is distorted, and make the prediction wrong.
#     * As in the case showing above of hand8-not-sq.JPG (Keras will resize to width == height) and hand8-distorted.jpg (where I pre-resize before loading into the model) :: model in both cases predict this as number 9 instead of 8.  
# 
# 
# 3. Thinner stroke line tends to make the prediction wrong. Increase the stroke line would help the model predict more accurately. This could be because as thicker stroke, the features of the image is hightlighted better so that during the reshape from large pixel of for instance 100px x 100px down to 28px x 28px, the black stroke is still thick enough for the model to recognize it.  
#     * As in the case showing above of 8.jpg and 8-thicker.jpg. The thinner 8 made the model predict inaccurately. 
#     
# 
# 4. Number 9 is challenging to recognize in with this particular train model, which predicts more 4 and 7 more often than the correct number 9.

if (__name__) == ("__main__"):
    # create a list of all picture path inside test image folder
    base_path = "./images/test-img/num7-variant/"
    img_list = [base_path + img for img in listdir(base_path) if isfile(join(base_path, img))]

    # looping thru each img and make prediction
    for ea_iter in tf.range(len(img_list)):
        ea_iter = tf.cast(ea_iter, tf.int64)
        img_predict(img_list[ea_iter])


