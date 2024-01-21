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

