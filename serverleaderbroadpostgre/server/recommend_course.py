import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import Course

class RecommendCourse:
    def __init__(self, user):
        self.user = user
    def read_data_train(self):
        self.courses = Course.objects.values()

        self.courses = pd.DataFrame(list(self.courses))

        return self.courses
    def combine_features(self, row):
        return f"{row['field']} {row['language']} {row['level']}"
    
    def to_lowercase(self, df):
        for column in df.columns:
            if df[column].dtype == 'object':
                df[column] = df[column].str.lower()
        return df
    
    def vecterize(self):
        self.courses = self.read_data_train()

        self.courses = self.to_lowercase(self.courses)
        self.user = {
            "field": [f.lower() for f in self.user ["field"]],
            "language": [lang.lower() for lang in self.user["language"]],
            "level": [lvl.lower() for lvl in self.user["level"]],
            "target": [target.lower() for target in self.user["target"]],
        }

        self.courses["features"] = self.courses.apply(self.combine_features, axis=1)

        self.user["features"] = " ".join(self.user["field"] + self.user["language"] + self.user["target"] + self.user["level"])

        vectorizer = CountVectorizer()
        self.course_vectors = vectorizer.fit_transform(self.courses["features"])
        self.user_vector = vectorizer.transform([self.user["features"]])
    def train(self):
        self.vecterize()

        similarities = cosine_similarity(self.user_vector, self.course_vectors)

        self.courses["similarity"] = similarities[0]
        recommended_courses = self.courses.sort_values(by="similarity", ascending=False)

        return (recommended_courses)
        # print("Recommended Courses:")
        # print(recommended_courses[["name", "similarity"]])