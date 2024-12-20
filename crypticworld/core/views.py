"""Core views."""

from flask import Blueprint, jsonify


blueprint = Blueprint("core", __name__)


@blueprint.route("/", methods=("GET",))
def index():
    return jsonify({"message": "Welcome to crypticworld!"})
