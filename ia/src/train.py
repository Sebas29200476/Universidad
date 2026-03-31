import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
import joblib
import os

# Cargar datos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

data_path = os.path.join(BASE_DIR, '..', 'data', 'data.csv')
data_path = os.path.abspath(data_path)

df2 = pd.read_csv(data_path)
df2.columns = df2.columns.str.strip()

df2["Resultado"] = df2["Resultado"].map({
    "Dropout": 1,
    "Enrolled": 0,
    "Graduate": 0
})

df_num = df2.select_dtypes(include=["int64", "float64"])

X = df_num.drop("Resultado", axis=1)
y = df_num["Resultado"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

lr = LogisticRegression(max_iter=1000, class_weight="balanced")
rf = RandomForestClassifier(class_weight="balanced")
xgb = XGBClassifier(scale_pos_weight=2, eval_metric="logloss")

lr.fit(X_train, y_train)
rf.fit(X_train, y_train)
xgb.fit(X_train, y_train)

def evaluar(modelo, nombre):
    pred = modelo.predict(X_test)
    probs = modelo.predict_proba(X_test)[:,1]
    
    print(f"\n🔹 {nombre}")
    print(classification_report(y_test, pred))
    print("ROC-AUC:", roc_auc_score(y_test, probs))

evaluar(lr, "Logistic Regression")
evaluar(rf, "Random Forest")
evaluar(xgb, "XGBoost")

prediAbXGB = os.path.join(BASE_DIR, '..', 'model', 'prediAbXGB.pkl')
prediAbXGB = os.path.abspath(prediAbXGB)
prediAbRF = os.path.join(BASE_DIR, '..', 'model', 'prediAbRF.pkl')
prediAbRF = os.path.abspath(prediAbRF)
prediAbLR = os.path.join(BASE_DIR, '..', 'model', 'prediAbLR.pkl')
prediAbLR = os.path.abspath(prediAbLR)


joblib.dump(xgb, prediAbXGB)
print("Modelo entrenado y guardado")
joblib.dump(lr, prediAbLR)
print("Modelo entrenado y guardado")
joblib.dump(rf, prediAbRF)
print("Modelo entrenado y guardado")