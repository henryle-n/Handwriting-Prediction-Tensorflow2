# Convolutional Neural Network | Hand Written Digit Prediction</div>

Team Member - Henry Le, Ekin Kaplan, Gini Arimbi, Panarat Duke.


<a href="http://3.20.237.129/">**Click here**</a> for our website hosted on AWS EC2 for demo.

## 1. Background 

**Project Background:** Machine Learning Technologies have been rapidly developed in the last decade. This advancement allows model predictions to be exponentially more accurate.

In this project, we took Machine Learning out of its traditional way into more sophisticated level which employs advanced Deep Learning model known as Convolutional Neural Network (CNN), in conjunction with effective Dense Network. The beauty of this project is not only allowing machine to learn human hand writting but also allowing human to understand how the machine learned and thus can make the prediction thanks to the real-time interaction developed.


<img src="./static/assets/img/readme/demo.gif" alt="please go to image folder for this pic">


## 2. The Question Why

* **Why image prediction?** Facial Recognition and Object Detection have always been a tremendous inspiration for the team. The curiosity of how these are even possible brought the team together for making great things happened in this project.


* **Why CNN?** CNN was chosen for its proven accurate predictions up to 98% with just a few layers of Conv2D and Dense Networks, within 5 training epochs. The power of CNN lies within its capability to "scan" the image in 2D instead of 1D space (comparing to Dense Network). Together with Dense Network, CNN creates the unmatchable model for any image prediction/ classification.


## 3. Model Architecture and Training Process
* Dataset chosen for training: MNIST dataset, thanks to Prof. Yann LeCun. Dataset was loaded from Keras database.
* The input consists of 60,000 28x28 pixel images of handwritten digits. Each of the image features will be learned by the deep learning model that is built based on convolutional block concepts. The output consists of 10 digit classifications, which are from 0 to 9. 

<img src="./static/assets/img/readme/model_architecture.png" alt="please go to image folder for this pic">

* A closer look at the model:
    * 4 blocks of Conv2D
        * 2 layers per block: 8 layers total.
        * Batch Normalization and Max Pooling per block to prevent overfitting and accelerate training speed.
    * 2 Dense layers with Drop-out features to again prevent overfitting and speed up model training.

### 3. File Directory

* Main webpage written in HTML: inside **templates** folder, named **index.html**.

* Javascript (driving Canvas and AJAX): in **static/js** folder

* CSS and style-related: in  **static/css**

* Flask App and Prediction: named **application.py**,  **predict.py**

* Jupyter Notebooks used during training/ developement in the same name folder.

* During training, CNN parameters were logged and saved **Convolutional-NN/logs/deepCNN/20200718_HL/**

* Images and thumbnail: in **static/img**

* Docker Folder: consists **Dockerfiles** and **Docker Compose** to be used for Docker Image and Container Creation and hosting on AWS EC2. 


**Tools and Technologies**  

* **Languages:**
    *  Python | Javascript | HTML5 |  CSS3 | Markdown
* **Modules/ Libraries:**
    * Flask | TensorFlow 2 (GPU version) | Pillow | Numpy | JSON | base64 | jQuery | NGINX (engine-X)
* **Operating System:**
    * Windows 10 Pro v.2004 with WSL2 | Ubuntu 20.04 | MacOS Mojave
* **DevOps:**
    * Docker Containers | AWS EC2
* **Applications/ Software**
    * Visual Studio Code | Windows Terminal | AWS CLI | Notepad++ | Excel (image illustration) | Google Chrome | Google Drive


### 4. Results 

-The model can predict the number real time. As we add more strokes in the canvas, the machine will update the prediction better.  

-The model is able to predict the number with several background and stroke colors. 

-The model can predict group of dots and doesn't have to be a continuous line. 



### 5. Observation and Project Challenges


**Model Observation** 

There are several observation points we can obtain from the model. Some limitation of the models are the following: 

<p align="center">
    <img src="./static/assets/img/readme/model_observation.PNG" width="400px"/>
</p>

a. Width of stroke: Thinner stroke line tends to make the prediction wrong. Increase in the stroke line would help the model predict more accurately. The possible reason is that the thicker the stroke, the features of the image is highlighted better. During the resize to small pixel (28 px X 28 px), the stroke is still thick enough to be recognized by the model.

b. Color contrast: CNN distinguish the difference based on saturation difference between background and stroke color. Stroke color doesn't have much effect on the prediction as much as the background does. Background color have significant effect on the prediction. As the background gets closer to the black, the model failed to predict accurately. In contrast, shallow neural network has limitation in recognizing stroke color and background.

c. Shape of number and image:
Number 9 is challenging to recognize in with this particular train model, which predicts more 4 and 7 more often than the correct number 9. It might be related on the pattern of diagonal and horizontal line in that number.
The original snipped file would be predicted more accurately if the image has width == height. This is due to the fact that the MNIST dataset has width == height, thus the trained model weight matrices retain the same shape.

d. Model-related observation: Re-training model has potential of changing the prediction, i.e. first model predicted right, then next rerun predict number wrong.

e. Ratio between image size and canvas size: The smaller the image, the more difficult it is to predict the number. 



**Project Challenges** 

a. Building CNN Model:
Selecting optimal parameters for kernels, strides, pooling layers, batch normalization and drop-outs to mitigate over fitting, and accelerate model coverging.
Add padding to help retain the input and output dimensions for ability to build a deeper network.
Due to the sizes of the CNN (multiple layers with 20 millions parameters), we had to utilize the Graphics Processing Unit (2560 CUDA Cores) to be able to handle the training.

b. HTTP Request | AJAX: finding solutions on how to pack the image package from client browser in a base64 encoded string, jsonify it and send to server. Then jasonify the response from server and send it back to client computer.

c. Building the Drawing Canvas: to allow for user drawing input or uploadind a pre-made digit picture. Utilizing JS with Event Listening to capture user mouse position, draw on the canvas and export in a base64 format.


**Future Recommendations** 
* Training the model. 
1. We can train more several model with different parameter and compare prediction accuracy and evaluation accuracy. Hence, we can observe in detail what are the significant parameter that contribute to the accuracy of the model. 

2. For the front end side, we can build an rgb slide bar so that user can adjust the background color and see how background color would effect the prediction. 
