FROM denoland/deno:1.39.4
EXPOSE 3003
WORKDIR /app
USER deno
COPY . .
RUN deno cache  --lock-write server.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "server.ts"]