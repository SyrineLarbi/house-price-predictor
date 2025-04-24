from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

#Create FastAPI instance
app = FastAPI(title="🏡 House Price Predictor")

#Load the trained model
model = joblib.load("model/house_price_model.pkl")

#Define the structure of the input 
class HouseData(BaseModel):
    OverallQual:int
    GrLivArea:int
    GarageCars:int
    TotalBsmtSF:int
    YearBuilt:int
    FullBath:int

@app.get("/")
def read_root():
    return {"message" : "Welcome to House Price Prediction API!"}

@app.post("/predict")
def predict(data : HouseData):
    input_data = np.array([[
        data.OverallQual,
        data.GrLivArea,
        data.GarageCars,
        data.TotalBsmtSF,
        data.YearBuilt,
        data.FullBath
    ]])

    prediction = model.predict(input_data)[0]
    return {"predicted_price" : round(prediction,2)}













