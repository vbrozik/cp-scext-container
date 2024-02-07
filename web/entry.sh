#!/bin/bash

if [ -n "$APIUSER" ] && [ -n "$APIPASS" ]; then
    sh -c "echo -n '$APIUSER:' > /etc/nginx/.htpasswd"
    sh -c "echo $APIPASS | openssl passwd -apr1 -stdin >> /etc/nginx/.htpasswd"
fi

if [ -n "$CERTSUBJECT" ]; then

    echo "mkcert DISABLED. Consider ENCCRT and ENCKEY"
#   mkcert --cert-file web.crt --key-file web.key  "$CERTSUBJECT"
fi

if [ -n "$ENCCRT" ]; then
    echo "$ENCCRT" | base64 -d > web.crt
fi
if [ -n "$ENCKEY" ]; then
    echo "$ENCKEY" | base64 -d > web.key
fi

echo "Certificate:"
openssl x509 -in web.crt -text -noout | grep -i subject
echo

nginx -g "daemon off;"