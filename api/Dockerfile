FROM denoland/deno:1.39.4
EXPOSE 3003
WORKDIR /app

COPY . .
RUN rm deno.lock

USER deno

RUN deno cache  --lock-write server.ts
RUN mkdir -p /var/tmp/log

CMD ["run", "--allow-all", "server.ts"]