from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import firebase_admin
from firebase_admin import firestore
import os
import json

import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics

import datetime
import plotly.express as px
from pycaret.regression import *
import environ
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(env_file=Path().joinpath(BASE_DIR, "KrishiJunctionBackend", ".env"))

cred = firebase_admin.credentials.Certificate(env("FIREBASE_CERTIFICATE"))
app = firebase_admin.initialize_app(cred)
firestore_client = firestore.client()

# Create your views here.
def test(request):
    doc_ref = firestore_client.collection("npkvalue/devices/shivam").document("hello")
    doc_ref.set({
        "Name": "Hello",
        "age": 21
    })
    return HttpResponse("done")

#   String date = dateStr;         // Replace with the current date
#   String Time = timeStr;       // Replace with the current time
#   String nitrogen = "10";      // Replace with the nitrogen value
#   String phosphorus = "5";     // Replace with the phosphorus value
#   String potassium = "7";      // Replace with the potassium value
#   String pH = "6.5";           // Replace with the pH value

def npkvalue(request):
    deviceId = request.GET['id']
    dateunit = request.GET['dateunit']
    timeunit = request.GET['timeunit']
    nitrogen = request.GET['nitrogen']
    potassium = request.GET['potassium']
    phosphorous = request.GET['phos']
    ph = request.GET['ph']
    doc_ref = firestore_client.collection(f"npkvalue/devices/{deviceId}").document(f"{timeunit}")
    doc_ref.set({
        "dateunit": dateunit,
        "timeunit": timeunit,
        "nitrogen": nitrogen,
        "potassium": potassium,
        "phosphorous": phosphorous,
        "pH": ph
    })
    return JsonResponse({
        "status": "success"
    }, safe=False)

def crop_pred(request):
    n = request.GET['nitrogen']
    p = request.GET['phosphorous']
    k = request.GET['potassium']
    temp = request.GET['temperature']
    humid = request.GET['humidity']
    ph = request.GET['ph']
    rainfall = request.GET['rainfall']
    model = pickle.load(open(env("CROP_PREDICTION_MODEL"),'rb'))
    output = model.predict([[n, p, k, temp, humid, ph, rainfall]])[0]
    print(output)
    return JsonResponse({
        "status":"success",
        "data": output
    }, safe=False)

def fert_pred(request):
    model = pickle.load(open(env("FERT_PREDICTION_MODEL"), "rb"))
    output = model.predict([[5,2,4,2,6,4,6,1]])[0]
    mappings= {
        "0": "Urea",
        "1": "Di-Ammonium Phosphate(DAP)",
        "2": "14-35-14",
        "3": "26-28",
        "4": "17-17-17",
        "5": "20-20",
        "6": "10-26-26",
        "7": "Not Required"
    }
    return JsonResponse({
        "status": "success",
        "data": mappings[str(output)]
    }, safe=False)

def oneyearpredictionold(request):
    i = request.GET['nutrient']
    start_date = pd.to_datetime('2015-01-01')
    end_date = pd.to_datetime('2022-12-01')

    date_range = pd.date_range(start=start_date, end=end_date, freq='MS')

    num_steps = len(date_range)

    np.random.seed(42)  # Set a seed for reproducibility
    nitrogen = np.random.uniform(0, 255, num_steps)
    phosphorus = np.random.uniform(0, 255, num_steps)
    potassium = np.random.uniform(0, 255, num_steps)
    pH = np.random.uniform(0,14, num_steps)
    dates = date_range
    data = pd.DataFrame({
        'Date': dates,
        'Nitrogen': nitrogen,
        'Phosphorus': phosphorus,
        'Potassium': potassium,
        'pH': pH
    })

    seasons = []
    for date in dates:
        month = date.month
        if month >= 4 and month <= 7:
            seasons.append('Kharif')
        elif month >= 10 or month <= 1:
            seasons.append('Rabi')
        else:
            seasons.append('Zaid')

    data['CropSeason'] = seasons
    df = data
    data['Month'] = [i.month for i in data['Date']]
    data['Year'] = [i.year for i in data['Date']]
    data['Series'] = np.arange(1, len(data) + 1)
    data = data[['Series', 'Year', 'Month', i]]
    print(data.head())

    train = data[data['Year'] < 2022]  
    test = data[data['Year'] >= 2022]
    print(train.shape, test.shape)

    # initialize setup
    s = setup(
        data=train,
        test_data=test, 
        target=i,
        fold_strategy='timeseries',
        numeric_features=['Year', 'Series'],
        fold=3,
        transform_target=True,
        session_id=123
    )

    model = create_model('xgboost')
    trained_model = tune_model(model, optimize='MAE')
    predictions = predict_model(trained_model, data=data)
    predictions['Date'] = pd.date_range(start='2015-01-01', end='2022-12-01', freq='MS')
    final_best = finalize_model(trained_model)
    future_dates = pd.date_range(start='2023-01-01', end='2023-12-01', freq='MS')
    future_df = pd.DataFrame()
    future_df['Month'] = [i.month for i in future_dates]
    future_df['Year'] = [i.year for i in future_dates]
    future_df['Series'] = np.arange(97, (97 + len(future_dates)))
    predictions_future = predict_model(final_best, data=future_df)
    concat_df = pd.concat([data, predictions_future], axis=0)
    concat_df_i = pd.date_range(start='2015-01-01', end='2023-12-01', freq='MS')
    concat_df.set_index(concat_df_i, inplace=True)
    print(concat_df)
    result = concat_df.to_json(orient='records')
    return JsonResponse({"data": json.loads(result)}, safe = False)

def oneyearprediction(request):
    i = request.GET['nutrient']
    data = pd.read_csv(env("ONE_YEAR_PREDICTION"))
    data['Date'] = pd.to_datetime(data['Date'])
    data['Month'] = data['Date'].dt.month
    data['Year'] = data['Date'].dt.year
    data['Series'] = np.arange(1, len(data) + 1)
    data = data[['Series', 'Year', 'Month', i]]
    print(data.head())
    train = data[(data['Year'] >= 2020) & (data['Year'] <= 2021)]
    test = data[(data['Year'] > 2021) & (data['Year'] <= 2022)]
    print(train.shape, test.shape)
    # initialize setup
    s = setup(
        data=train,
        test_data=test,
        target=i,
        fold_strategy='timeseries',
        numeric_features=['Year', 'Series'],
        fold=3,
        transform_target=True,
        session_id=123
    )
    model = create_model('xgboost')
    trained_model = tune_model(model, optimize='MAE')
    predictions = predict_model(trained_model, data=data)
    predictions['Date'] = pd.date_range(start='2015-01-01', end='2022-12-01', freq='MS')
    final_best = finalize_model(trained_model)
    future_dates = pd.date_range(start='2023-01-01', end='2023-12-01', freq='MS')
    future_df = pd.DataFrame()
    future_df['Month'] = [i.month for i in future_dates]
    future_df['Year'] = [i.year for i in future_dates]
    future_df['Series'] = np.arange(97, (97 + len(future_dates)))
    predictions_future = predict_model(final_best, data=future_df)
    concat_df = pd.concat([data, predictions_future], axis=0)
    concat_df_i = pd.date_range(start='2015-01-01', end='2023-12-01', freq='MS')
    concat_df.set_index(concat_df_i, inplace=True)
    result = concat_df.to_json(orient='records')
    return JsonResponse({"data": json.loads(result)}, safe = False)

def get_mqtt(request):
    try:
        docs = firestore_client.collection(f'npkvalue/values/values').stream()
        result = []
        for doc in docs:
            result.append({"id": doc.id, "data": doc.to_dict()})
            return JsonResponse({
                    "status": "success",
                    "data": result
                }, safe=False)
    except:
        return JsonResponse({
                "Status":"error",
                "message": "Something went wrong! Please try after sometime."
            }, safe=False, status=500)