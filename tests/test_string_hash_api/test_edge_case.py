import pytest
import os
from flask.testing import FlaskClient
from crypticworld import create_app


@pytest.fixture
def client():
    # setting test environment
    os.environ.setdefault("FLASK_ENV", "testing")

    app = create_app()
    app.config.update(
        {
            "TESTING": True,
        }
    )
    with app.test_client() as client:
        yield client


def test_missing_payload(client: FlaskClient):
    # without payload
    response_without_payload = client.post("/api/generate_hash/")

    assert response_without_payload.status_code == 415
    assert response_without_payload.json == {"error": "Unsupported Media Type"}


def test_missing_text_content(client: FlaskClient):
    # missing content parameter
    response_without_content_parameter = client.post(
        "/api/generate_hash/",
        json={"hashing_algorithm": "sha256", "encoding_format": "utf-8"},
    )

    assert response_without_content_parameter.status_code == 422
    assert response_without_content_parameter.json == {
        "error": "missing field `content`"
    }


def test_missing_algorithm(client: FlaskClient):
    # missing hashing_algorithm parameter
    response_without_hashing_algorithm_parameter = client.post(
        "/api/generate_hash/",
        json={"content": "hello world!", "encoding_format": "utf-8"},
    )

    assert response_without_hashing_algorithm_parameter.status_code == 422
    assert response_without_hashing_algorithm_parameter.json == {
        "error": "missing field `hashing_algorithm`"
    }


def test_missing_encoding(client: FlaskClient):
    # missing encoding_format parameter
    response_without_encoding_format_parameter = client.post(
        "/api/generate_hash/",
        json={"content": "hello world!", "hashing_algorithm": "md5"},
    )

    assert response_without_encoding_format_parameter.status_code == 422
    assert response_without_encoding_format_parameter.json == {
        "error": "missing field `encoding_format`"
    }


def test_unsupported_encoding(client: FlaskClient):
    # unsupported encoding format
    response_with_unsupported_encoding_format = client.post(
        "/api/generate_hash/",
        json={
            "content": "hello world!",
            "hashing_algorithm": "sha256",
            "encoding_format": "invalid",
        },
    )

    assert response_with_unsupported_encoding_format.status_code == 400
    assert response_with_unsupported_encoding_format.json == {
        "error": "Unsupported encoding format"
    }


def test_unkown_algorithm(client: FlaskClient):
    # unkown hashing algorithm
    response_with_unkown_hashing_algorithm = client.post(
        "/api/generate_hash/",
        json={
            "content": "hello world!",
            "hashing_algorithm": "invalid",
            "encoding_format": "utf-8",
        },
    )

    assert response_with_unkown_hashing_algorithm.status_code == 400
    assert response_with_unkown_hashing_algorithm.json == {
        "error": "Unkown algorithm invalid"
    }
