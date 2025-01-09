import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

class EvaluateMark:
    def __init__(self, data_train):
        self.data_train = data_train
    def decode(self):
        self.label_encoder_language = LabelEncoder()
        self.label_encoder_rank = LabelEncoder()

        self.data_train["target_language"] = self.label_encoder_language.fit_transform(self.data_train["target_language"])
        self.data_train["rank"] = self.label_encoder_rank.fit_transform(self.data_train["rank"])
    def train(self):
        self.decode()

        print(self.data_train.columns)

        X_train = self.data_train[["avg_score", "target_language"]]
        y_train = self.data_train["rank"]

        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

        self.model.fit(X_train, y_train)

    def predict(self, data_test):
        data_test["target_language"] =self. label_encoder_language.transform(data_test["target_language"])

        y_pred = self.model.predict(data_test)

        y_pred = self.label_encoder_rank.inverse_transform(y_pred)

        return y_pred