from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load('../model/co2_model.pkl')

@app.get("/")
def home():
    return {"message": "CO2 Prediction API"}

@app.post("/predict")
def predict(engine_size: float, cylinders: int, fuel_consumption: float):
    
    data = [[engine_size, cylinders, fuel_consumption]]
    prediction = model.predict(data)
    
    return {
        "prediction_CO2": float(prediction[0])
    }