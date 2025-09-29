from app.models.hybrid import HybridRecommender
from app.data.fetcher import fetch_data
import joblib
import os

class RecommendationEngine:
    def __init__(self):
        # Create model directory if it doesn't exist
        self.model_dir = "model_data"
        os.makedirs(self.model_dir, exist_ok=True)
        self.model_path = os.path.join(self.model_dir, "model.pkl")
        self.train()

    def train(self, source = "server"):
    
        if source == "retrain" or not os.path.exists(self.model_path):
            feedback, products, views = fetch_data()
            print("Training model from fresh data...")
            self.model = HybridRecommender(feedback, products, views)
            self.model.train()
            joblib.dump(self.model, self.model_path)
            print(f"Model trained and saved to {self.model_path}.")
        
        else:
            print(f"Model already exists. Loading from {self.model_path}.")
            self.model = joblib.load(self.model_path)
            

    def recommend(self, user_id, top_k=5):
        return self.model.recommend(user_id, top_k)