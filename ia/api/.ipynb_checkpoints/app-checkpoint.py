import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from fastapi import FastAPI
from pydantic import BaseModel
from src.predict import predict

app = FastAPI()

class InputData(BaseModel):
    engine_size: float
    cylinders: int
    fuel_consumption: float

@app.get("/")
def home():
    return {"message": "API funcionando"}

@app.post("/predict")
def get_prediction(data: InputData):
    
    result = predict(
        data.engine_size,
        data.cylinders,
        data.fuel_consumption
    )
    
    return {"prediction_CO2": float(result)}