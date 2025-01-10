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

# supported algorithms
algorithms = [
    "blake2b",
    "sha3_384",
    "sha256",
    "sha1",
    "md5",
    "shake_256",
    "sha224",
    "shake_128",
    "blake2s",
    "sha3_224",
    "sha3_256",
    "sha512",
    "sha384",
    "sha3_512",
]

# datasets
simple_texts = [
    "Hello World!",
    "Hello Python",
    "I love Programming",
    "I like Python",
]

long_texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, neque sit amet convallis molestie, enim libero viverra ex, sit amet facilisis ex eros ut nisl.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam condimentum urna eu convallis mattis. Sed a mi sit amet mauris pharetra luctus id at arcu. In venenatis est quis ante fringilla dictum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper maximus dolor, ullamcorper consectetur risus. ",
]

special_texts = [
    "\n\r\t",  # Common control characters
    "\x00\x01",  # Null and start of heading
    "\u200b",  # Zero-width space
    "\ufeff",  # Byte order mark
]

greek_texts = [
    "α",  # alpha
    "β",  # beta
    "γ",  # gamma
    "Ω",  # omega
]

mathematical_texts = [
    "+",  # addition
    "-",  # subtraction
    "×",  # multiplication
    "÷",  # division
]

emoji_texts = ["❤️", "🔥", "😊", "💀"]

non_ascii_texts = [
    "こんにちは世界",  # Japanese
    "你好世界",  # Chinese
    "Olá mundo",  # Portugese
    "Привет, мир",  # Russian
]
