# Trulioo React Sample App

⚡[Trulioo EmbedID](https://github.com/Trulioo/trulioo-react)⚡ (private BETA) leverages the GlobalGateway RestFul API, this API can not be invoked directly through web browser, therefore an intermediary (proxy) hosted on your web server is required to complete the request. For demonstration purposes Trulioo provides the **trulioo-react-sample-app** (sample code of a lightweight Node.js proxy server). Trulioo recommends developing your own intermediary (proxy) for production purposes.

## Generate Public & Private key
To avoid [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), trulioo-react-sample-app adds a unique _signature_ to every payload sent; this payload can be verified on a different machine by using the public key to _verify_ its signature.

There are many ways to generate a RSA key, including [this online tool](http://travistidwell.com/jsencrypt/demo/). As for encryption algorithms, there's  a plethora of options:

```
['DSA', 'DSA-SHA', 'DSA-SHA1', 'DSA-SHA1-old', 'RSA-MD4', 'RSA-MD5', 'RSA-MDC2', 'RSA-RIPEMD160', 'RSA-SHA', 'RSA-SHA1', 'RSA-SHA1-2', 'RSA-SHA224', 'RSA-SHA256', 'RSA-SHA384', 'RSA-SHA512', 'dsaEncryption', 'dsaWithSHA', 'dsaWithSHA1', 'dss1', 'ecdsa-with-SHA1', 'md4', 'md4WithRSAEncryption', 'md5', 'md5WithRSAEncryption', 'mdc2', 'mdc2WithRSA', 'ripemd', 'ripemd160', 'ripemd160WithRSA', 'rmd160', 'sha', 'sha1', 'sha1WithRSAEncryption', 'sha224', 'sha224WithRSAEncryption', 'sha256', 'sha256WithRSAEncryption', 'sha384', 'sha384WithRSAEncryption', 'sha512', 'sha512WithRSAEncryption', 'shaWithRSAEncryption', 'ssl2-md5', 'ssl3-md5', 'ssl3-sha1', 'whirlpool']
  ```

Save the public and private keys to the filesystems and make sure to update the .env file (see below).

## Setup & Run
Set credentials through command prompt (in the `.env` file in the project root):

```
TRULIOO_BASE_URL=
TRULIOO_USERNAME=
TRULIOO_PASSWORD=
TRULIOO_PORT=
SIGNATURE_ALGORITHM=
PRIVATE_KEY_FILE_PATH=
```

Simply run the following command in your cmd/terminal and enjoy the ride 🎢🚀:

```
# install the libraries needed
npm i
# start the server
npm start
```

## Run with Docker 🐳

```
docker build . 
docker build -t IMAGE_NUMBER  # (retrieve the image number via "docker images" command)
docker run -d --name DOCKER_NAME DOCKER_IMAGE
```

That's it.

# Best Practice

Trulioo EmbedID passes user input data to the "proxy" on your server. When developing systems that consume internet exposed fields for the purpose of data collection, ensure you take all necessary precautions to protect your system from from denial of service attacks, exploits or security vulnerabilities. Please refer to the [Legal disclaimer](https://developer.trulioo.com/docs/legal) on the Trulioo Developer Portal.

## Learn More

Trulioo is a global identity verification company that provides secure access to reliable and independent data sources to instantly verify individuals and business entities online. Hundreds of organizations across the world use GlobalGateway, Trulioo’s RESTful API used to verify five billion people and 250 million businesses across 195 countries. In addition to helping organizations meet compliance requirements, GlobalGateway also streamlines the customer onboarding process, mitigates risk, and performs the first layer of defense against fraud. Learn more about [Trulioo through our website](https://www.trulioo.com/). 

## License

Apache 2