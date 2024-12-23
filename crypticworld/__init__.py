"""Main application package."""

from flask import Flask, render_template

from crypticworld.settings import config
from crypticworld.extensions import init_cors
from crypticworld import core, api


def create_app(config_object=config):
    """Create an application factory

    :param config_object: The configuration object to use
    """
    app = Flask(__name__)
    app.config.from_object(config_object)

    # log config_object type
    app.logger.info(f"Using {config_object.__class__.__name__}")
    app.logger.info(f"Debug mode is {config_object.DEBUG}")

    register_extension(app)
    register_blueprints(app)
    register_error_handlers(app)

    return app


def register_extension(app: Flask):
    """Registering extensions."""

    init_cors(app)


def register_blueprints(app: Flask):
    """Registering blueprints."""

    app.register_blueprint(core.views.blueprint)
    app.register_blueprint(api.views.blueprint)


def register_error_handlers(app: Flask):
    """Registering error handlers."""

    @app.errorhandler(404)
    def not_found(e):
        return render_template('handlers/404.html'), 404
    
    @app.errorhandler(405)
    def method_not_allowed(e):
        return render_template('handlers/405.html'), 500
    
    @app.errorhandler(500)
    def internal_server_error(e):
        return render_template('handlers/500.html'), 500