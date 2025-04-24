import pandas as pd
def load_data(filepath : str) -> pd.DataFrame : 
    return pd.read_csv(filepath)

    # Drop columns with too many missing values

def handle_missing_values(df:pd.DataFrame):
    threshold = 0.4
    missing_percent = df.isnull().mean()
    columns_to_drop = missing_percent[missing_percent > threshold].index
    df.drop(columns=columns_to_drop, axis=1 ,inplace=True)

    # Fill numerical columns with median
    num_cols=df.select_dtypes(include=['int64' , 'float64']).columns
    for col in num_cols:
        if df[col].isnull().sum()>0:
            df[col]=df[col].fillna(df[col].median())

        # Fill categorical columns with mode or "None"
    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        if df[col].isnull().sum() > 0:
            if df[col].isnull().mean() < 0.1:
                df[col] = df[col].fillna(df[col].mode()[0])
            else:
                df[col] = df[col].fillna('None')

    return df

def clean_data(filepath: str) ->pd.DataFrame:
    df = load_data(filepath)
    df_cleaned = handle_missing_values(df)
    return df_cleaned