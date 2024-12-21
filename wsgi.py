# wsgi.py
from crypticworld import create_app

# 'app' is the WSGI callable that Gunicorn looks for.
app = create_app()