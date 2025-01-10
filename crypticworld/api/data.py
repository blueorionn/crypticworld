"""Api required data"""

import hashlib

# supported encoding formats
encodings = {
    "UTF-8": "utf-8",
    "Ascii": "ascii",
    "UTF-16LE": "utf_16_le",
    "UTF-16BE": "utf_16_be",
    "ISO-8859-1": "latin_1",
    "Big5": "big5",
    "GBK": "gbk",
    "Shift_JIS": "shift_jis",
    "Windows-1251": "cp1251",
    "Windows-1252": "cp1252",
}

# all available algorithms
algorithms = hashlib.algorithms_guaranteed

# valid file mimetypes
valid_mimetypes = [
    "text/plain",
    "text/xml",
    "text/html",
    "text/css",
    "text/csv",
    "text/calendar",
    "text/javascript",
]
