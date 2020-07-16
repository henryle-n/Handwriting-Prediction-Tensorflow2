#!/bin/sh

echo Prepare to create environment
echo ==========================
conda create -n cnnenv tensorflow

echo Environment Created
echo ==========================

echo Activate Environment
echo ==========================

echo Prepare to install requirements
echo ==========================
pip install -r requirements.txt
echo Finished installing requirements
echo ==========================
echo Prepare to install Jupyter Notebook Kernel
echo ==========================
python -m ipykernel install --user --name=tensorflow-kn
echo Finished Installing 