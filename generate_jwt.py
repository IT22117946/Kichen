from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta

app = Flask(__name__)

# REQUIRED
app.config["JWT_SECRET_KEY"] = "super-secret-key"

# ✅ THIS LINE WAS MISSING
jwt = JWTManager(app)

with app.app_context():
    token = create_access_token(
        identity="test_user",
        expires_delta=timedelta(hours=1)
    )
    print("JWT Token:\n", token)