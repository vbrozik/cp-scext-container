#!/bin/bash

if [ -n "$APIUSER" ] && [ -n "$APIPASS" ]; then
    sh -c "echo -n '$APIUSER:' > /etc/nginx/.htpasswd"
    sh -c "echo $APIPASS | openssl passwd -apr1 -stdin >> /etc/nginx/.htpasswd"
fi

if [ -n "$CERTSUBJECT" ]; then

    echo mkcert not implemented yet
#   mkcert --cert-file web.crt --key-file web.key  "$CERTSUBJECT"
fi

nginx -g "daemon off;"