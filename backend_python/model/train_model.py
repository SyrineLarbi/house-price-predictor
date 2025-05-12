import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib
from clean_data import clean_data

def train():
    df = clean_data("../data/train.csv")
    features = ['OverallQual', 'GrLivArea', 'GarageCars', 'TotalBsmtSF', 'YearBuilt', 'FullBath']
    X = df[features]
    y =df["SalePrice"]
    X=pd.get_dummies(X)
    X, y = X.align(y, join = 'inner' , axis = 0)
    X_train, X_test,y_train, y_test = train_test_split(X, y, test_size=0.2 , random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    print("✅ Model trained! RMSE on test set:", rmse)
    joblib.dump(model, "house_price_model.pkl")
    print("📦 Model saved to model/house_price_model.pkl")

if __name__ == "__main__":
    train()