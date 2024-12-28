"""Application Configuration."""

import os
from .utils import generate_secret_key


class Config:
    """Base Configuration."""

    SECRET_KEY = os.environ.get("SECRET_KEY", generate_secret_key())
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))


class DevelopmentConfig(Config):
    """Development Configuration."""

    ENV = "dev"
    DEBUG = True
    STATIC_FOLDER = os.path.join(Config.APP_DIR, "static/")


class ProductionConfig(Config):
    """Production Configuration."""

    ENV = "prod"
    DEBUG = False
    STATIC_FOLDER = None


class TestingConfig(Config):
    """Testing Configuration."""

    TESTING = True
    DEBUG = True


if os.environ.get("FLASK_ENV") == "development":
    config = DevelopmentConfig()
elif os.environ.get("FLASK_ENV") == "testing":
    config = TestingConfig()
else:
    config = ProductionConfig()
