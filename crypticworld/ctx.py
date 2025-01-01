"""Custom Context Processors."""

import os
from flask import Flask, current_app


def static_context_processors(app: Flask):
    @app.context_processor
    def static_url():
        def process_static_url(filename: str) -> str:

            # If asking for script
            if filename == "script/index.js" and os.path.isfile(
                os.path.join(
                    os.path.join(current_app.config["APP_DIR"], "static"), filename
                )
            ):
                return os.path.join("/static", filename)
            elif filename == "script/index.js" and not os.path.isfile(
                os.path.join(
                    os.path.join(current_app.config["APP_DIR"], "static"), filename
                )
            ):
                current_app.logger.warn(
                    f"{filename} Doesn't exist. Returning fallback.js"
                )
                return os.path.join("/static", "script/fallback.js")

            return os.path.join("/static", filename)

        return {"static_url": process_static_url}
