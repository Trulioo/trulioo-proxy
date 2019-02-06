# Trulioo-Proxy

To make requests at Trulioo GlobalGateway and get around [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), it is required that an intermediate server (proxy) in-between is used.

You have the option to develop your own, or simply use ⚡ **Trulioo-Proxy** ⚡, a lightweight server implemented in Node which aims to reduce required boilerplate code for integrating with the Trulioo API.

## Install 

```
git clone https://github.com/Trulioo/trulioo-proxy.git
node bin/trulioo-proxy
```
## Generate Public & Private key
To avoid man-in-the-middle attacks, trulioo-proxy adds a unique _signature_ to every payload sent; this payload can be verified on a different machine by using the public key to _verify_ its signature.

There are many ways to generate a RSA key, including [this online tool](http://travistidwell.com/jsencrypt/demo/). As for encryption algorithms, there's  a plethora of options:

```
['DSA', 'DSA-SHA', 'DSA-SHA1', 'DSA-SHA1-old', 'RSA-MD4', 'RSA-MD5', 'RSA-MDC2', 'RSA-RIPEMD160', 'RSA-SHA', 'RSA-SHA1', 'RSA-SHA1-2', 'RSA-SHA224', 'RSA-SHA256', 'RSA-SHA384', 'RSA-SHA512', 'dsaEncryption', 'dsaWithSHA', 'dsaWithSHA1', 'dss1', 'ecdsa-with-SHA1', 'md4', 'md4WithRSAEncryption', 'md5', 'md5WithRSAEncryption', 'mdc2', 'mdc2WithRSA', 'ripemd', 'ripemd160', 'ripemd160WithRSA', 'rmd160', 'sha', 'sha1', 'sha1WithRSAEncryption', 'sha224', 'sha224WithRSAEncryption', 'sha256', 'sha256WithRSAEncryption', 'sha384', 'sha384WithRSAEncryption', 'sha512', 'sha512WithRSAEncryption', 'shaWithRSAEncryption', 'ssl2-md5', 'ssl3-md5', 'ssl3-sha1', 'whirlpool']
  ```

## Setup & Run
Set credentials through command prompt (in the `.env` file in the project root):

```
TRULIOO_BASE_URL=
TRULIOO_USERNAME=
TRULIOO_PASSWORD=
TRULIOO_PORT=
SIGNATURE_ALGORITHM=
PRIVATE_KEY_FILE_PATH=

# then run the server
node bin/trulioo-proxy
```

## Run with Docker 🐳

```
docker build . 
docker build -t IMAGE_NUMBER  # (retrieve the image number via "docker images" command)
docker run -d --name DOCKER_NAME DOCKER_IMAGE
```

That's it.

## Learn More

Learn more about  [Trulioo](https://www.trulioo.com/).

## License

Apache 2