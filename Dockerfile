########################################################

# Author : Henry Le
# Date: Jul, 2020

################# FLASK APP DOCKER #####################
 
# base image - slim version is good enough for this project
FROM python:3.7.2-slim

# install dependencies
RUN apt-get update && apt-get -y dist-upgrade && \
    apt install -y netcat 


# set working directory
WORKDIR /usr/src/app

# add and install requirements
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# add app
COPY . /usr/src/app

# run server
CMD ["/usr/src/app/entrypoint.sh"]