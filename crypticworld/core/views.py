"""Core views."""

from flask import Blueprint, render_template, abort
from flask.views import MethodView
from crypticworld.api.data import encodings
from .data import algorithms
from .utils import available_algorithms, get_algorithm


blueprint = Blueprint("core", __name__)


class IndexView(MethodView):
    def get(self):
        data = {"algorithms": algorithms}
        return render_template("index.html", **data)


class StringHashView(MethodView):
    def get(self, algorithm_name):
        if algorithm_name not in available_algorithms():
            return abort(404)

        data = {
            "head": {"algorithm_name": get_algorithm(algorithm_name)["title"]},
            "algorithms": algorithms,
            "encodings": [[k, v] for k,v in encodings.items()],
            "show_digest_len": algorithm_name in ['shake_128', 'shake_256']
        }
        return render_template("string_hasher.html", **data), 200


index_view = IndexView.as_view("home")
blueprint.add_url_rule("/", view_func=index_view)

string_hash_view = StringHashView.as_view("string_hash")
blueprint.add_url_rule("/hash/<algorithm_name>", view_func=string_hash_view)
