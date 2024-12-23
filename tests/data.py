hashed_data = [
    ("sha1", "hello world!", "430ce34d020724ed75a196dfc2ad67c77772d169"),
    ("sha1", "Numbers0123456789", "74a92cada25e6d5fa18a64b859a6586c71eeb354"),
    ("sha1", "Symbols!@#$%^&*()_", "aacd4397f21dc53f84fe34c6200a7e87b6b97286"),
    ("sha1", "Operators+-*/", "960809d0529c37b46fa05c3c1e0615a0cb2d0c63"),
    (
        "blake2b",
        "hello world!",
        "fa02d55d26bc5cda1e2d67fb7424f6132c58fed81a52816342795de54d3b2d8b91749f267d2491ed05ca0cbbd0e641cc1758b92e99eb1d8771060ebacbc83c25",
    ),
    (
        "blake2b",
        "Numbers0123456789",
        "0ae908e554944bb8bb907349e1ef742e8e7384bb913883e654f2ec9ec927388a04a79cbef2c5e5af411590a8739c6ef9320e3cfda3c9d600c7417c239b2b2627",
    ),
    (
        "blake2b",
        "Symbols!@#$%^&*()_",
        "bebab167091153801698e58eb72f54337f86ae9afe5cb255368997f283bf257e5086e6294eaedfb54dd2e634e39e3fb1f9b1ae1ac6baf943bd6102bc23b54582",
    ),
    (
        "blake2b",
        "Operators+-*/",
        "1b942841613e7d7669bb8b4c36638a02f7bf528e3d608fab9a3b1baca8f5c8cc9f2425742560169aa960d05c08b258543efa5839177a1790050014d5984932c9",
    ),
    (
        "sha3_384",
        "hello world!",
        "64bdfdfda3956f86992c4a0fc9a4f31e9d11c43abb463365a57d360261012e955f078601448a62c38d1528ca068049ff",
    ),
    (
        "sha3_384",
        "Numbers0123456789",
        "810121870fe65b916a19c8b08055c48991fea376d4866d45d3b1e6ea2b287224f94f870ca7236144e9f2b93e897fa5a0",
    ),
    (
        "sha3_384",
        "Symbols!@#$%^&*()_",
        "14782e4e8b24ca45557e343ee02e8bfa0400023de9027b7062d1070ef9e508b27d1f24ebb112b95b3c6ac19b5a16150b",
    ),
    (
        "sha3_384",
        "Operators+-*/",
        "8119d96e68d27b4d4d95e65d0fa86304f244ad3df495817c9d2fe5059691bb71f9e428d8826078ed5b30111d0a3d043d",
    ),
    (
        "sha3_256",
        "hello world!",
        "9c24b06143c07224c897bac972e6e92b46cf18063f1a469ebe2f7a0966306105",
    ),
    (
        "sha3_256",
        "Numbers0123456789",
        "8cf0807efa4f481c3b95e749473802f5f55103be778d113e250e9e7a096a5ec8",
    ),
    (
        "sha3_256",
        "Symbols!@#$%^&*()_",
        "15b9649eebba71da197c16cb43c14f1f42c48c58c73b1ff3fe8b8c8166c2fcab",
    ),
    (
        "sha3_256",
        "Operators+-*/",
        "fdedfb4bf830bcdbb235f1949e7fa6473e14805143dcf28c8798f5da1b35007a",
    ),
    (
        "blake2s",
        "hello world!",
        "6b07ae5278b0eb87df625c2cc592988ecfe4d70fa43867ccf23c0b46bf694479",
    ),
    (
        "blake2s",
        "Numbers0123456789",
        "bd88bf6c22dea318875f63aab4460cc118cff77421e5080c82f9acd796615e79",
    ),
    (
        "blake2s",
        "Symbols!@#$%^&*()_",
        "f37343663208448c1f227e57166b884f36031b7947794c45fa9e52ed306187a0",
    ),
    (
        "blake2s",
        "Operators+-*/",
        "598826f6f639fd752a0b00312d548baa5fb2b594923c7ca0958a9212f2371eb4",
    ),
    ("md5", "hello world!", "fc3ff98e8c6a0d3087d515c0473f8677"),
    ("md5", "Numbers0123456789", "4e61d9ca10bd6494534ab24956318815"),
    ("md5", "Symbols!@#$%^&*()_", "e315d46d039145864ca03978d2bca9e7"),
    ("md5", "Operators+-*/", "eaedff861b6eec21e811401338bfa0ed"),
    (
        "sha384",
        "hello world!",
        "d33d40f7010ce34aa86efd353630309ed5c3d7ffac66d988825cf699f4803ccdf3f033230612f0945332fb580d8af805",
    ),
    (
        "sha384",
        "Numbers0123456789",
        "b0bf3792b87049d4a5cedb5af2e00453798219baa5744530bbd159b2a4df0156749a827c7aac147ef30b3ca15218a436",
    ),
    (
        "sha384",
        "Symbols!@#$%^&*()_",
        "f66f7e3095fbc7394ccc4df7df7e3a29bb3ad8c697e214393f1705c1f1d97fe3b71efbe5b577b37369383420ff46facc",
    ),
    (
        "sha384",
        "Operators+-*/",
        "ff313394af56b8683246be490ed2a3434aaf568bcae72b8432eac7eef6f84c7eb9509eebecfbbf4cedaa0f49761e8873",
    ),
    (
        "sha256",
        "hello world!",
        "7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9",
    ),
    (
        "sha256",
        "Numbers0123456789",
        "070dd849b7a1abcca97774df44e45c866129c4fe88bdbc629144a201c2b25305",
    ),
    (
        "sha256",
        "Symbols!@#$%^&*()_",
        "657de7ce8b070936e805b411e26f09bd32aa910fd2203c1791ee65c333be7ea7",
    ),
    (
        "sha256",
        "Operators+-*/",
        "bb179d722ed813e80a39438e1b06852e8167e6836b549f2d83374d497a8ad534",
    ),
    (
        "sha3_224",
        "hello world!",
        "f8551fe638d604e2cac84f39b5c38f400d161245a16359b59a57286c",
    ),
    (
        "sha3_224",
        "Numbers0123456789",
        "2fef6a5685873fe7ec072f4970e657fe371db98b2a6d80bf37dbb813",
    ),
    (
        "sha3_224",
        "Symbols!@#$%^&*()_",
        "a99d26d982b6add8551cedf95fb9a943096f7ebdbc89234529b15ae1",
    ),
    (
        "sha3_224",
        "Operators+-*/",
        "b80ca4b6ec97e9c9cf0f242469fc87dfb1f0b37e35b23c811fcad550",
    ),
    (
        "sha3_512",
        "hello world!",
        "5aadcaf394961eecc2f4e65c2d82ff7cf0f6fa4574f351d0053574886ac77c961958cef64bc2bb483b4e7430964b55893a7c28a5c6efab7e24e2b7994bba5eb9",
    ),
    (
        "sha3_512",
        "Numbers0123456789",
        "ca16ce99b05a42ec78393063259ce4e4df18cc3d7e44a2a0cf7042d050be292110ec6986a1fffdbe72c3b4f7ea330b65247cbf0fa15dc89aa8a7a8ed10b797f3",
    ),
    (
        "sha3_512",
        "Symbols!@#$%^&*()_",
        "da75eecb18648ab5e7cb294fad86add50057534d8cf170bb0955ecdb1a8f0d2c9ab4e78e34166f3b9c00f9d8a53880645d0d3be2a100a9a3ec1d34803e265f6b",
    ),
    (
        "sha3_512",
        "Operators+-*/",
        "05ebe15f0c0e36874d15f07d7a630e190f75458d1abce0d1507c73642bcc0c14e4a78724034bea10aa82d6bd821d5f6abd8b2b5d96891660ea62d7214736f78a",
    ),
    (
        "sha512",
        "hello world!",
        "db9b1cd3262dee37756a09b9064973589847caa8e53d31a9d142ea2701b1b28abd97838bb9a27068ba305dc8d04a45a1fcf079de54d607666996b3cc54f6b67c",
    ),
    (
        "sha512",
        "Numbers0123456789",
        "bcea2d72e8b66fda761d149dad6391ad5371ef8b253f2adc5c5421469393187fbe4bdc2007be738fab86df32cd7429f1d630601aba80438f1e439d08137719da",
    ),
    (
        "sha512",
        "Symbols!@#$%^&*()_",
        "a859ebc87d2ca8aaf42ec65b07aa64870f6bfa522da58aaa8074854ca9a5050bec5871f31f358643283840b38de14b2b4732c1011123ad72b26408ebed264eec",
    ),
    (
        "sha512",
        "Operators+-*/",
        "891911347df89f246bbe723d0db8ac888d8a4fa38744bf8ccb02198722318079df0fc45a4a9e825e5574f541f3839f6c8bc1ef5731c1306f0c383428d1d9587a",
    ),
    (
        "sha224",
        "hello world!",
        "428c16b4309e824cfa874fe24ce2af2894fcaf8d72af4a368d492e34",
    ),
    (
        "sha224",
        "Numbers0123456789",
        "540c7430ec9e82ae83ae0f48ab78750ef077a8f63a5b56a70c752f28",
    ),
    (
        "sha224",
        "Symbols!@#$%^&*()_",
        "0322bd98bf929d910221ae50985454273f5d8f42fcc12d41ae1eda49",
    ),
    (
        "sha224",
        "Operators+-*/",
        "b8353b42d456dc3d3b174ecaa7f747da58aacf612f381e0738c64ac7",
    ),
]
