import os
import pytest
from itertools import product
from flask.testing import FlaskClient
from crypticworld import create_app
from tests.test_string_hash_api.data import simple_texts, algorithms, encodings


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


@pytest.mark.parametrize(
    "text, algorithm, encoding",
    list(product(simple_texts, algorithms, encodings.values())),
)
def test_simple_texts(client: FlaskClient, text: str, algorithm: str, encoding: str):
    # digest length for shake algorithms
    digest_len = 20

    # response
    response = client.post(
        "/api/generate_hash/",
        json={
            "content": text,
            "hashing_algorithm": algorithm,
            "encoding_format": encoding,
            "digest_length": digest_len,
        },
    )

    if response.status_code == 200:
        assert type(response.json) == dict

    assert response.status_code == 200
