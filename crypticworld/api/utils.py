"""Utility functions"""

import hashlib
from .data import encodings, algorithms


def generate_hash_func(
    content: str, hashing_algorithm: str, encoding_format: str, digest_length=None
):
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

    # The shake_128 and shake_256 algorithms
    # provide variable length digests with length_in_bits
    if hashing_algorithm in ["shake_128", "shake_256"]:
        min_digest_len = 8
        if type(digest_length) is not int and digest_length > min_digest_len:
            raise ValueError(
                f"{hashing_algorithm} requires a variable digest length gte 8"
            )

    # hashlib constructor
    h = hashlib.new(hashing_algorithm)
    h.update(data)

    if hashing_algorithm in ["shake_128", "shake_256"]:
        return h.hexdigest(digest_length)

    return h.hexdigest()
