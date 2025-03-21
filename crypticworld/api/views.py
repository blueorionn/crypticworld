"""API views."""

import re
import io
from flask import Blueprint, request, Response, jsonify
from .utils import generate_hash_func, generate_file_hash_func
from .validators import is_validate_filetype


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
        digest_length = (
            data["digest_length"] if "digest_length" in dict(data).keys() else None
        )

        # The shake_128 and shake_256 algorithms
        # provide variable length digests with length_in_bits
        if hashing_algorithm in ["shake_128", "shake_256"]:
            if digest_length is None:
                return (
                    jsonify(
                        {
                            "error": "hashing algorithm shake_128 and shake_256 requires a variable digest length"
                        }
                    ),
                    422,
                )

            try:
                digest_length = int(digest_length)
            except:
                return (
                    jsonify(
                        {
                            "error": "digest length must a valid integer greater than or equal to 8"
                        }
                    ),
                    422,
                )

        try:
            result = generate_hash_func(
                content, hashing_algorithm, encoding_format, digest_length
            )
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
                "encoding_error": "The code point could not be encoded.",
                "unkown_encoding": "Unsupported encoding format",
                "hashing_error": f"Unkown algorithm {hashing_algorithm}",
            }

            if re.search(str(e), errors["unkown_encoding"]):
                return jsonify({"error": errors["unkown_encoding"]}), 400
            elif re.search(str(e), errors["hashing_error"]):
                return jsonify({"error": errors["hashing_error"]}), 400
            elif re.search(str(e), errors["encoding_error"]):
                return jsonify({"error": errors["encoding_error"]}), 400
            else:
                return jsonify({"error": "Internal server error"}), 500


@blueprint.route("/file/generate_hash/", methods=("POST",))
def generate_file_hash():
    if request.method == "POST":
        # validating content type
        if not "Content-Type" in request.headers:
            return jsonify({"error": "Invalid content type"}), 400

        # checking for missing parameters
        if request.form.get("hashing_algorithm") is None:
            return jsonify({"error": "missing field `hashing_algorithm`"}), 422

        if request.form.get("encoding_format") is None:
            return jsonify({"error": "missing field `encoding_format`"}), 422

        if request.files.get("file") is None:
            return jsonify({"error": "missing file"}), 400

        # checking file name validity
        if not is_validate_filetype(request.files["file"]):
            return jsonify({"error": "Content type mismatch"}), 400

        # requesting data
        file = request.files.get("file")
        hashing_algorithm = request.form.get("hashing_algorithm")
        encoding_format = request.form.get("encoding_format")
        digest_length = request.form.get("digest_length")

        # hashing content
        try:
            hashed_content = generate_file_hash_func(
                file, hashing_algorithm, encoding_format, digest_length
            )

            # Create a new file in memory with the computed content
            output_file = io.StringIO()
            output_file.write(hashed_content)
            output_file.seek(0)  # Move to the start of the file for reading

            # Send the file back to the user
            return Response(
                output_file.getvalue(),
                mimetype="text/plain",
                headers={
                    "Content-Disposition": f"attachment; filename={file.filename}_hashed.txt"
                },
            )
        except Exception as e:
            errors = {
                "unkown_encoding": "Unsupported encoding format",
                "hashing_error": f"Unkown algorithm {hashing_algorithm}",
                "decoding_error": "Decoding error. Unable to decode given file content.",
            }

            if re.search(str(e), errors["unkown_encoding"]):
                return jsonify({"error": errors["unkown_encoding"]}), 400
            elif re.search(str(e), errors["hashing_error"]):
                return jsonify({"error": errors["hashing_error"]}), 400
            elif re.search(str(e), errors["decoding_error"]):
                return jsonify({"error": errors["decoding_error"]}), 500
            else:
                return jsonify({"error": "Internal server error"}), 500
