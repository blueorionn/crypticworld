"""Utility functions"""

import hashlib
from .data import encodings, algorithms


def generate_hash_func(content: str, hashing_algorithm: str, encoding_format: str):
    """Genrate hash of given content.

    :params content: Text content for hashing
    :params hashing_algorithm: Algorithm that is going to be used
    :params encoding_format: Encoding format for content
    """

    # checking for encoding format validity
    if encoding_format not in encodings.values():
        raise ValueError("Unsupported encoding format")

    # encoding content
    data = content.encode(encoding_format)

    # checking for hashing algorithm
    if hashing_algorithm not in algorithms:
        raise LookupError(f"Unkown algorithm {hashing_algorithm}")

    # hashlib constructor
    h = hashlib.new(hashing_algorithm)
    h.update(data)

    return h.hexdigest()
