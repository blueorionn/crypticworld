"""Utility functions"""

import hashlib
from werkzeug.datastructures.file_storage import FileStorage
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
    try:
        data = content.encode(encoding_format)
    except:
        raise TypeError("The code point could not be encoded.")

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
        # Since each hex character represents 4 bits
        nbits = digest_length
        n_hex_chars = nbits // 4
        return h.hexdigest(nbits)[:n_hex_chars]

    return h.hexdigest()


def generate_file_hash_func(
    file: FileStorage, hashing_algorithm: str, encoding_format: str, digest_length=None
):
    """Genrate hash for each line of given file.

    :params content: Text content for hashing
    :params hashing_algorithm: Algorithm that is going to be used
    :params encoding_format: Encoding format for content
    """

    # checking for encoding format validity
    if encoding_format not in encodings.values():
        raise ValueError("Unsupported encoding format")

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

    # getting file content
    file_content = ""
    if file:
        file_content = file.read()

    # encoding content
    try:
        file_content: str = file_content.decode("utf-8")
    except UnicodeDecodeError:
        raise ValueError("Decoding error. Unable to decode given file content.")

    # reading file lines
    file_lines: list[str] = file_content.splitlines()

    # hashing content
    hashed_content = []
    for line in file_lines:
        hashed_content.append(
            generate_hash_func(line, hashing_algorithm, encoding_format, digest_length)
        )

    return "\n".join(hashed_content)
