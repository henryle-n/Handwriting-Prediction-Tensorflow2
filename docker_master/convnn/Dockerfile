########################################################

# Author : Henry Le
# Date: Jul, 2020

################# FLASK APP DOCKER #####################
 
# base image - slim version is good enough for this project
FROM python:3.7.2-slim

# set working directory - this will then be "HOME"
# of the app inside docker upon spinning up the container
WORKDIR /usr/src/app

# install and add layers on top of base img
# dependencies to update distro and install netcat
# for reading and writing data across connected servers
RUN apt-get update && apt-get -y dist-upgrade && \
    apt install -y netcat 


# add and install requirements for the env
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# add entrypoint.sh for application.py
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# copy all necessary files to docker HOME
# but exclude all dockerignore files
COPY . /usr/src/app

# inside entrypoint is the application.py
# need to run the file by CMD to spin up the server
# in this case, no additional params needed - fairly straight forward
CMD ["/usr/src/app/entrypoint.sh"]