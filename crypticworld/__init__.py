"""Main application package."""

from flask import Flask, render_template, send_from_directory

from crypticworld.settings import config
from crypticworld.extensions import init_cors
from crypticworld import core, api
from crypticworld.ctx import static_context_processors


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
    register_context_processors(app)
    register_blueprints(app)
    register_public_request_handler(app)
    register_error_handlers(app)

    return app


def register_extension(app: Flask):
    """Registering extensions."""

    init_cors(app)


def register_context_processors(app: Flask):
    """Registering context processors."""

    static_context_processors(app)


def register_blueprints(app: Flask):
    """Registering blueprints."""

    app.register_blueprint(core.views.blueprint)
    app.register_blueprint(api.views.blueprint)


def register_public_request_handler(app: Flask):
    """Handle public request."""

    @app.route("/robots.txt")
    def robots():
        return send_from_directory(app.static_folder, "public/robots.txt")

    @app.route("/favicon.ico")
    def favicon():
        return send_from_directory(app.static_folder, "public/favicon.ico")


def register_error_handlers(app: Flask):
    """Registering error handlers."""

    @app.errorhandler(404)
    def not_found(e):
        data = {"error_code": "404", "error_message": "Page Not Found"}
        return render_template("handlers/handler.html", **data), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        data = {"error_code": "405", "error_message": "Method Not Allowed"}
        return render_template("handlers/handler.html", **data), 405

    @app.errorhandler(500)
    def internal_server_error(e):
        data = {"error_code": "500", "error_message": "Internal Server Error"}
        return render_template("handlers/handler.html", **data), 500
