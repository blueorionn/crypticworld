"""Validator functions"""

import os
from werkzeug.datastructures.file_storage import FileStorage
from .data import valid_mimetypes


def is_validate_filename(filename: str) -> bool:
    """Validate filename has a valid txt extension.

    :params filename: Name of file
    :return boolean
    """
    if filename == "":
        return False

    if os.path.splitext(filename)[-1] == ".txt":
        return True
    return False


def is_validate_filetype(file: FileStorage):
    """Validate correct mime type and file content.

    :params file: FileStorage
    :return boolean
    """

    if not is_validate_filename(file.filename):
        return False

    if not (file.mimetype in valid_mimetypes):
        return False

    return True
