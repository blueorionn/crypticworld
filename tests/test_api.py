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


def test_api(client: FlaskClient):
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json == {"message": "Crypticworld api route"}
