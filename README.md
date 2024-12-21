# Crypticworld

Crypticworld is a lightweight web application built using Flask that allows users to hash any given text using a wide variety of hashing algorithms. This app is designed to support multiple encoding formats.


## Features

- **Hashing Algorithms**: Supports a wide range of hashing algorithms.

- **Encoding Methods**: Allows users to input text in different encodings.

- **User-Friendly Interface**: Clean and simple UI for inputting text, selecting algorithms, and encoding methods.

- **Instant Results**: Generates hashed output instantly upon user input.


## Supported Hashing Algorithms

- blake2b
- sha3_256
- sha256
- sha224
- sha3_224
- sha384
- sha512
- sha3_512
- blake2s
- shake_128
- shake_256
- sha3_384
- sha1
- md5

## Supported Encoding Formats

- UTF-8
- Ascii
- UTF-16LE
- UTF-16BE
- ISO-8859-1
- Big5
- GBK
- Shift_JIS
- Windows-1251 
- Windows-1252


## Installation

### Prerequisites

- Python 3.11+
- pip (Python package installer)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/blueorionn/crypticworld.git
   cd crypticworld
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:

   ```bash
   flask --app crypticworld run
   ```

5. Open the app in your browser at `http://127.0.0.1:5000/`.


## Acknowledgements

Flask documentation: https://flask.palletsprojects.com

Python hashlib module: https://docs.python.org/3/library/hashlib.html

Encoding references: https://docs.python.org/3/library/codecs.html


## License

[MIT](https://github.com/blueorionn/crypticworld/LICENSE)