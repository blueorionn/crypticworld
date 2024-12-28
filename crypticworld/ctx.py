"""Custom Context Processors."""

import os
from flask import Flask


def static_context_processors(app: Flask):
    @app.context_processor
    def static_url():
        return {"static_url": lambda filename: os.path.join("/static", filename)}
