import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
import joblib

from preprocess import load_data, preprocess_data

# Cargar datos
df = load_data('data/FuelConsumption.csv')

# Preprocesar
df = preprocess_data(df)

# Separar variables
X = df.drop('CO2EMISSIONS', axis=1)
y = df['CO2EMISSIONS']

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LinearRegression())
])

# Entrenar
pipeline.fit(X_train, y_train)

# Evaluación
print("Train R2:", pipeline.score(X_train, y_train))
print("Test R2:", pipeline.score(X_test, y_test))

# Guardar modelo
joblib.dump(pipeline, '../model/co2_model.pkl')

print("Modelo entrenado y guardado")