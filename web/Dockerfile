FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    mkcert \
    wget \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /etc/nginx
RUN mkcert --cert-file web.crt --key-file web.key  localhost 127.0.0.1 "*.nip.io"

COPY ./default.conf /etc/nginx/sites-enabled/default

RUN sh -c "echo -n 'user1:' >> /etc/nginx/.htpasswd"
RUN sh -c "echo vpn123 | openssl passwd -apr1 -stdin >> /etc/nginx/.htpasswd"

COPY ./entry.sh /entry.sh
RUN chmod +x /entry.sh

COPY ./index.html /usr/share/nginx/html/index.html
COPY ./hello-world/ /usr/share/nginx/html/hello-world/

ENTRYPOINT [ "/entry.sh" ]
# CMD ["nginx", "-g", "daemon off;"]
