import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, '..', 'model', 'prediAbXGB.pkl')
model_path = os.path.abspath(model_path)

model = joblib.load(model_path)
columnas = [
    "Estado civil",
    "Modo de aplicacion",
    "Orden de aplicacion",
    "Carrera",
    "Jornada",
    "Nivel educativo previo",
    "Nota educacion previa",
    "Nacionalidad",
    "Educacion madre",
    "Educacion padre",
    "Ocupacion madre",
    "Ocupacion padre",
    "Nota de admisión",
    "Desplazado",
    "Necesidades educativas especiales",
    "Deudor",
    "Pago de matricula al dia",
    "Genero",
    "Becado",
    "Edad de ingreso",
    "Internacional",
    "Creditos homologados 1er semestre",
    "Materias inscritas 1er semestre",
    "Evaluaciones 1er semestre",
    "Materias aprobadas 1er semestre",
    "Promedio 1er semestre",
    "Materias sin evaluacion 1er semestre",
    "Creditos homologados 2do semestre",
    "Materias inscritas 2do semestre",
    "Evaluaciones 2do semestre",
    "Materias aprobadas 2do semestre",
    "Promedio 2do semestre",
    "Materias sin evaluación 2do semestre",
    "Tasa de desempleo",
    "Tasa de inflacion",
    "PIB"
]

def predict(data: dict):
    df = pd.DataFrame([data])
    df = df.reindex(columns=columnas, fill_value=0)

    prob = model.predict_proba(df)[0][1]

    if prob > 0.8:
        mensaje = "RIESGO ALTO"
    elif prob > 0.5:
        mensaje = "RIESGO MEDIO"
    else:
        mensaje = "RIESGO BAJO"

    return f"El usuario tiene una probabilidad de abondo del {prob}%, lo que representa un {mensaje}" 

if __name__ == "__main__":
    prueba = {
        "Estado civil": 1,
        "Modo aplicacion": 17,
        "Orden aplicacion": 1,
        "Carrera": 9119,
        "Jornada": 1,
        "Nivel educativo previo": 1,
        "Nota educacion previa": 150,
        "Nacionalidad": 109,
        "Educacion madre": 1,
        "Educacion padre": 1,
        "Ocupacion madre": 5,
        "Ocupacion padre": 5,
        "Nota admision": 140,
        "Desplazado": 0,
        "Necesidades educativas especiales": 0,
        "Deudor": 0,
        "Matricula al dia": 1,
        "Genero": 1,
        "Becado": 0,
        "Edad ingreso": 20,
        "Internacional": 0,
        "Materias convalidadas 1er semestre": 0,
        "Materias inscritas 1er semestre": 6,
        "Evaluaciones 1er semestre": 6,
        "Materias aprobadas 1er semestre": 6,
        "Promedio 1er semestre": 16,
        "Materias sin evaluacion 1er semestre": 0,
        "Materias convalidadas 2do semestre": 0,
        "Materias inscritas 2do semestre": 6,
        "Evaluaciones 2do semestre": 6,
        "Materias aprobadas 2do semestre": 6,
        "Promedio 2do semestre": 16,
        "Materias sin evaluacion 2do semestre": 0,
        "Tasa desempleo": 10.5,
        "Tasa inflacion": 2.1,
        "PIB": 1.5
    }

    resultado = predict(prueba)
    print("Resultado:", resultado)