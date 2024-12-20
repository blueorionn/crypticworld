"""Main application package."""

from flask import Flask

from crypticworld.settings import config
from crypticworld.extensions import init_cors
from crypticworld import core, api


def create_app(config_object=config):
    """Create an application factory

    :param config_object: The configuration object to use
    """
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extension(app)
    register_blueprints(app)

    return app


def register_extension(app: Flask):
    """Registering extensions."""

    init_cors(app)


def register_blueprints(app: Flask):
    """Registering blueprints."""

    app.register_blueprint(core.views.blueprint)
    app.register_blueprint(api.views.blueprint)
