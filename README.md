# Container with SmartConsole Extension and API service

- host SmartConsole Extension on HTTPS server in container
- certificate provided or creared with mkcert - expected in /etc/nginx/web.crt and /etc/nginx/web.key
    - env CERTSUBJECT - see docker-compose.yaml
- served from NGINX on Ubuntu LTS
- password protected API reverse proxy (API in other container)
    - env APIUSER/APIPASS - see docker-compose.yaml

Contents:
* /index.html - usage instructions with link to extension
* /hello-world - path with SmartConsole Extension
* /api/ - password protected path of reverse proxy to API server

### Certificate

```shell
# create cert
sudo apt install -y mkcert
mkcert --cert-file web.crt --key-file web.key  helped-buck.mshome.net

# inspect cert
openssl x509 -in web.crt -text -noout | grep -i -A 2 subject

# pass the cert
 export PAT=aaa # RW contents RW pull req. repo scoped
 ENCCRT=$(cat web.crt | base64 -w0) ENCKEY=$(cat web.key | base64 -w0) docker-compose up -d --build

#monitor 
docker-compose logs -ft

```

Check mockup policy at https://helped-buck.mshome.net/cp2gh/#/policy

Extension to install: https://helped-buck.mshome.net/cp2gh/extension.json

(where helped-buck.mshone.net is your host)
