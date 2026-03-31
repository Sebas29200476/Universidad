import pandas as pd

def load_data(path):
    return pd.read_csv(path)

def preprocess_data(df):
    
    # Selección de variables importantes
    df = df[['ENGINESIZE', 'CYLINDERS', 'FUELCONSUMPTION_COMB', 'CO2EMISSIONS']]
    
    # Feature engineering (nivel pro)
    df['consumption_per_cylinder'] = df['FUELCONSUMPTION_COMB'] / df['CYLINDERS']
    df['engine_per_cylinder'] = df['ENGINESIZE'] / df['CYLINDERS']
    
    return df