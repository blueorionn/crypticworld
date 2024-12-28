# wsgi.py
from crypticworld import create_app

# 'app' is the WSGI callable that Gunicorn looks for.
app = create_app()


if __name__ == "__main__":
    if app.config["ENV"] == "dev":
        app.run(host="0.0.0.0", port=8000)
