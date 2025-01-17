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


def test_file_hash_api(client: FlaskClient):
    # file name
    file_name = "en_sample_one.txt"
    file_path = os.path.join(os.getcwd(), f"tests/test_file_hash_api/data/{file_name}")

    if not (os.path.exists(file_path)):
        raise ImportError("File Doesn't exist.")

    with open(file_path, "rb") as f:
        response = client.post(
            "/api/file/generate_hash/",
            headers={"Content-Type": "multipart/form-data"},
            data={"file": f, "hashing_algorithm": "md5", "encoding_format": "utf-8"},
        )

    assert response.status_code == 200
