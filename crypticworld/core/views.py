"""Core views."""

from flask import Blueprint, render_template
from flask.views import MethodView
from .data import supported_algorithms


blueprint = Blueprint("core", __name__)


class IndexView(MethodView):
    def get(self):
        data = {"algorithms": supported_algorithms}
        return render_template("index.html", **data)


index_view = IndexView.as_view("home")
blueprint.add_url_rule("/", view_func=index_view)
