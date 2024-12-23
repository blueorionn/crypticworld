import pytest
import os
from flask.testing import FlaskClient
from crypticworld import create_app
from tests.data import hashed_data


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


def test_index(client: FlaskClient):
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json == {"message": "Crypticworld api route"}


def test_generate_hash_missing_parameters(client: FlaskClient):
    # without payload
    response_without_payload = client.post("/api/generate_hash/")

    # missing content parameter
    response_without_content_parameter = client.post(
        "/api/generate_hash/",
        json={"hashing_algorithm": "sha256", "encoding_format": "utf-8"},
    )

    # missing hashing_algorithm parameter
    response_without_hashing_algorithm_parameter = client.post(
        "/api/generate_hash/",
        json={"content": "hello world!", "encoding_format": "utf-8"},
    )

    # missing encoding_format parameter
    response_without_encoding_format_parameter = client.post(
        "/api/generate_hash/",
        json={"content": "hello world!", "hashing_algorithm": "md5"},
    )

    assert response_without_payload.status_code == 415
    assert response_without_payload.json == {"error": "Unsupported Media Type"}

    assert response_without_content_parameter.status_code == 422
    assert response_without_content_parameter.json == {
        "error": "missing field `content`"
    }

    assert response_without_hashing_algorithm_parameter.status_code == 422
    assert response_without_hashing_algorithm_parameter.json == {
        "error": "missing field `hashing_algorithm`"
    }

    assert response_without_encoding_format_parameter.status_code == 422
    assert response_without_encoding_format_parameter.json == {
        "error": "missing field `encoding_format`"
    }


def test_generate_hash_invalid_data(client: FlaskClient):
    # unsupported encoding format
    response_with_unsupported_encoding_format = client.post(
        "/api/generate_hash/",
        json={
            "content": "hello world!",
            "hashing_algorithm": "sha256",
            "encoding_format": "invalid",
        },
    )

    # unkown hashing algorithm
    response_with_unkown_hashing_algorithm = client.post(
        "/api/generate_hash/",
        json={
            "content": "hello world!",
            "hashing_algorithm": "invalid",
            "encoding_format": "utf-8",
        },
    )

    assert response_with_unsupported_encoding_format.status_code == 400
    assert response_with_unsupported_encoding_format.json == {
        "error": "Unsupported encoding format"
    }

    assert response_with_unkown_hashing_algorithm.status_code == 400
    assert response_with_unkown_hashing_algorithm.json == {
        "error": "Unkown algorithm invalid"
    }


@pytest.mark.parametrize("hashing_algorithm, content, expected", hashed_data)
def test_generate_hash(
    client: FlaskClient, hashing_algorithm: str, content: str, expected: str
):
    # response
    response = client.post(
        "/api/generate_hash/",
        json={
            "content": f"{content}",
            "hashing_algorithm": f"{hashing_algorithm}",
            "encoding_format": "utf-8",
        },
    )

    assert response.status_code == 200
    assert response.json == {
        "payload": content,
        "hashing_algorithm": hashing_algorithm,
        "encoding_format": "utf-8",
        "result": expected,
    }


def test_generate_hash_invalid_params_for_shake_hashing_algorithm(client: FlaskClient):
    # without digest length
    response_without_digest_length = client.post(
        "/api/generate_hash/",
        json={
            "content": f"hello world!",
            "hashing_algorithm": f"shake_128",
            "encoding_format": "utf-8",
        },
    )

    # inavalid digest length
    response_with_invalid_digest_length = client.post(
        "/api/generate_hash/",
        json={
            "content": f"hello world!",
            "hashing_algorithm": f"shake_128",
            "encoding_format": "utf-8",
            "digest_length": "abcd",
        },
    )

    assert response_without_digest_length.status_code == 422
    assert response_without_digest_length.json == {
        "error": "hashing algorithm shake_128 and shake_256 requires a variable digest length"
    }

    assert response_with_invalid_digest_length.status_code == 422
    assert response_with_invalid_digest_length.json == {
        "error": "digest length must a valid integer greater than or equal to 8"
    }


@pytest.mark.parametrize(
    "hashing_algorithm, content, expected, digest_length",
    [
        (
            "shake_128",
            "hello world!",
            "15372b0f35229f5fa04f4a262efd609d79f9958d46f9693df968c821f6b2bfda",
            32,
        ),
        (
            "shake_256",
            "hello world!",
            "1237cfe493413ac80f7b6b41369f7afa4a3ada93e7edf8de9f93e476796f9aa1",
            32,
        ),
    ],
)
def test_generate_hash_for_shake_hashing_algorithm(
    client: FlaskClient,
    hashing_algorithm: str,
    content: str,
    expected: str,
    digest_length: int,
):
    # response
    response = client.post(
        "/api/generate_hash/",
        json={
            "content": f"{content}",
            "hashing_algorithm": f"{hashing_algorithm}",
            "encoding_format": "utf-8",
            "digest_length": digest_length,
        },
    )

    assert response.status_code == 200
    assert response.json == {
        "payload": content,
        "hashing_algorithm": hashing_algorithm,
        "encoding_format": "utf-8",
        "result": expected,
    }
