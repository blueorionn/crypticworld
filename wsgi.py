# wsgi.py
from crypticworld import create_app

# 'application' is the WSGI callable that Gunicorn looks for.
application = create_app()