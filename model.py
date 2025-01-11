import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import numpy as np

class LearningPathModel:
    def __init__(self, filepath=None, model_path='learning_path_model.pkl', encoder_path='label_encoders.pkl'):
        self.filepath = filepath
        self.model_path = model_path
        self.encoder_path = encoder_path
        self.model = None
        self.label_encoders = {}
        self.df = None

    def load_data(self):
        if not self.filepath:
            raise ValueError("Filepath is not provided.")
        self.df = pd.read_csv(self.filepath)
        print("Data loaded successfully.")

    def preprocess_data(self):
        if self.df is None:
            raise ValueError("Dataframe is not loaded.")
        for col in ['Mục tiêu chính khi học lập trình', 'Dự định làm dự án cá nhân',
                    'Kinh nghiệm lập trình', 'Ngôn ngữ lập trình đã học',
                    'Thời gian muốn hoàn thành lộ trình']:
            le = LabelEncoder()
            self.df[col] = le.fit_transform(self.df[col])
            self.label_encoders[col] = le
        print("Data preprocessed successfully.")

    def split_data(self):
        if self.df is None:
            raise ValueError("Dataframe is not loaded.")
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.df.drop('Lộ trình', axis=1),  # Features
            self.df['Lộ trình'],  # Target
            test_size=0.2, 
            random_state=42
        )
        print("Data split into train and test sets.")

    def train_model(self):
        if self.X_train is None or self.y_train is None:
            raise ValueError("Data is not split for training.")
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(self.X_train, self.y_train)
        print("Model trained successfully.")

    def evaluate_model(self):
        if self.X_test is None or self.y_test is None:
            raise ValueError("Data is not split for evaluation.")
        y_pred = self.model.predict(self.X_test)
        accuracy = accuracy_score(self.y_test, y_pred)
        print(f'Accuracy: {accuracy:.2f}')

    def predict_with_feature(self, feature_value1, feature_value2, feature_value3, feature_value4, feature_value5):
        if not self.model or not self.label_encoders:
            raise ValueError("Model or encoders are not loaded.")

        new_data = pd.DataFrame({
            'Mục tiêu chính khi học lập trình': [feature_value1],
            'Dự định làm dự án cá nhân': [feature_value2],
            'Kinh nghiệm lập trình': [feature_value3],
            'Ngôn ngữ lập trình đã học': [feature_value4],
            'Thời gian muốn hoàn thành lộ trình': [feature_value5]
        })

        for col, le in self.label_encoders.items():
            new_data[col] = new_data[col].apply(lambda x: x if x in le.classes_ else 'unknown')
            if 'unknown' not in le.classes_:
                le.classes_ = np.append(le.classes_, 'unknown')
            new_data[col] = le.transform(new_data[col])

        predicted_path = self.model.predict(new_data)
        return predicted_path

    def save_model_and_encoders(self):
        if not self.model:
            raise ValueError("Model is not trained.")
        joblib.dump(self.model, self.model_path)
        print(f"Model saved to {self.model_path}")

        joblib.dump(self.label_encoders, self.encoder_path)
        print(f"Label encoders saved to {self.encoder_path}")

    def load_model_and_encoders(self):
        self.model = joblib.load(self.model_path)
        print(f"Model loaded from {self.model_path}")

        self.label_encoders = joblib.load(self.encoder_path)
        print(f"Label encoders loaded from {self.encoder_path}")

if __name__ == "__main__":
    model = LearningPathModel(filepath='data.csv')

    model.load_data()
    model.preprocess_data()
    model.split_data()
    model.train_model()
    model.evaluate_model()

    model.save_model_and_encoders()

    model.load_model_and_encoders()

    feature_value1 = 'Xây dựng website'
    feature_value2 = 'Có'
    feature_value3 = 'Hoàn toàn mới'
    feature_value4 = 'Python'
    feature_value5 = 'Dưới 1 tháng'

    predicted_path = model.predict_with_feature(feature_value1, feature_value2, feature_value3, feature_value4, feature_value5)
    print("Predicted Learning Path:", predicted_path)
