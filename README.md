# Trulioo-Proxy

To make requests at Trulioo GlobalGateway and get around [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), it is required that an intermediate server (proxy) in-between is used.

You have the option to develop your own, or simply use Trulioo-Proxy, a lightweight server implemented in Node 🚀 which reduces boilerplate code.

## Install 

```
git clone https://github.com/Trulioo/trulioo-proxy.git
node bin/trulioo-proxy
```

## Run
Set credentials through command prompt (in the `.env` file in the project root):

```
TRULIOO_USERNAME=USERNAME #change this with your username
TRULIOO_PASSWORD=PASSWORD #change this with your password

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