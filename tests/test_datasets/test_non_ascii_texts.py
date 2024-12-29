import os
import pytest
from itertools import product
from flask.testing import FlaskClient
from crypticworld import create_app
from tests.data import non_ascii_texts, algorithms


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


@pytest.mark.parametrize("text, algorithm", list(product(non_ascii_texts, algorithms)))
def test_non_ascii_texts(client: FlaskClient, text: str, algorithm: str):
    # digest length for shake algorithms
    digest_len = 20

    # response
    response = client.post(
        "/api/generate_hash/",
        json={
            "content": text,
            "hashing_algorithm": algorithm,
            "encoding_format": "utf-8",
            "digest_length": digest_len,
        },
    )

    if response.status_code == 200:
        assert type(response.json) == dict

    assert response.status_code == 200
