import os
import joblib
import pandas as pd

# Ruta correcta del modelo
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'model', 'co2_model.pkl')

model = joblib.load(model_path)

def predict(engine_size: float, cylinders: int, fuel_consumption: float):
    df = pd.DataFrame([{
        "ENGINESIZE": engine_size,
        "CYLINDERS": cylinders,
        "FUELCONSUMPTION_COMB": fuel_consumption,
    }])
    
    prediction = model.predict(df)
    return prediction[0]