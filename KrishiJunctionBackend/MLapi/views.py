from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import datetime
import locale
import torch
from segment_anything import SamPredictor, build_sam
import cv2

import requests
from PIL import Image, ImageEnhance
from io import BytesIO
import os

import environ
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(env_file=Path().joinpath(BASE_DIR, "KrishiJunctionBackend", ".env"))


# Create your views here.
def yeild_prediction(request):
    # TODO: crop month se kharif ya rabi ya whole year aur state aur distric ka dekhna hai from crop_production csv
    Crop = request.GET['crop']
    area = request.GET['area']
    state = [request.GET['state']]
    district = [request.GET['district']]
    season = ["Kharif"]
    print(Crop, area, state, district)
    year = datetime.datetime.today().year

    data = pd.read_csv(env("YEILD_PREDICTION"))
    data.dropna(axis=0, inplace=True)
    data = data[data['Production'] !=0]
    features =  ['state','district','Crop_Year','season','Area']
    predict = 'Production'
    df = data[data['Crop']==Crop]
    df.head()
    les = LabelEncoder()
    df['season'] = les.fit_transform(df["Season"].str.strip())
    led = LabelEncoder()
    df["district"] = led.fit_transform(df["District_Name"])
    lest = LabelEncoder()
    df["state"] = lest.fit_transform(df["State_Name"])
    X = df[features]
    y = df[predict]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15)
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    State = lest.transform(state)[0]
    District = led.transform(district)[0]
    Season = les.transform(season)[0]
    test = [[State,District,2023,Season,float(area)]]
    result_prediction = model.predict(test)[0]

    return JsonResponse({
        "score": score,
        "result_prediction": result_prediction
    },safe=False)


def estimate_income(request):
    State = "Tamil Nadu"
    District = "Ariyalur"
    
    price = prices.loc[(prices['state']==State) &
                    (prices['district']==District)]
    price = np.array(price["modal_price"])
    return JsonResponse({
        ""
    })

def ndvi(request):
    import groundingdino.datasets.transforms as T
    from groundingdino.models import build_model
    from groundingdino.util import box_ops
    from groundingdino.util.slconfig import SLConfig
    from groundingdino.util.utils import clean_state_dict, get_phrases_from_posmap
    from groundingdino.util.inference import annotate, predict
    from huggingface_hub import hf_hub_download
    from typing import Tuple
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    def load_dataset(path):
        images = []
        names = []
        for file_name in os.listdir(path):
            if file_name.endswith("_rgb.png"):
                image_path = os.path.join(path, file_name)
                image = Image.open(image_path).convert("RGB")
                images.append(image)
                names.append(file_name.replace("_rgb.png", ""))
        return images, names
    canon_img_path = "/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/Plant_Phenotyping_Datasets/Plant/Ara2013-Canon"
    rpi_img_path = "/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/Plant_Phenotyping_Datasets/Plant/Ara2013-RPi"
    canon_imgs, canon_names = load_dataset(canon_img_path)
    print("Cannon: ",len(canon_imgs))
    rpi_imgs, rpi_names = load_dataset(rpi_img_path)
    print("RPi: ",len(rpi_imgs))
    return HttpResponse("Done")

    