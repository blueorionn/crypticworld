"""API views."""

import re
from flask import Blueprint, request, jsonify
from .utils import generate_hash_func


blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/", methods=("GET",))
def index():
    return jsonify({"message": "Crypticworld api route"}), 200


@blueprint.route("/generate_hash/", methods=("POST",))
def generate_hash():
    if request.method == "POST":
        # If posted data is not json serializable
        if not request.is_json:
            return jsonify({"error": "Unsupported Media Type"}), 415

        # posted data
        data = request.json

        # checking for missing parameters
        if "content" not in dict(data).keys():
            return jsonify({"error": "missing field `content`"}), 422

        if "hashing_algorithm" not in dict(data).keys():
            return jsonify({"error": "missing field `hashing_algorithm`"}), 422

        if "encoding_format" not in dict(data).keys():
            return jsonify({"error": "missing field `encoding_format`"}), 422

        # extracting data and hashing content
        content = data["content"]
        hashing_algorithm = data["hashing_algorithm"]
        encoding_format = data["encoding_format"]

        try:
            result = generate_hash_func(content, hashing_algorithm, encoding_format)
            return (
                jsonify(
                    {
                        "payload": content,
                        "hashing_algorithm": hashing_algorithm,
                        "encoding_format": encoding_format,
                        "result": result,
                    }
                ),
                200,
            )
        except Exception as e:
            errors = {
                "encoding_error": "Unsupported encoding format",
                "hashing_error": f"Unkown algorithm {hashing_algorithm}",
            }

            if re.search(str(e), errors["encoding_error"]):
                return jsonify({"error": errors["encoding_error"]}), 400
            elif re.search(str(e), errors["hashing_error"]):
                return jsonify({"error": errors["hashing_error"]}), 400
            else:
                return jsonify({"error": "Internal server error"}), 500
