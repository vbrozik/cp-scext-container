FROM denoland/deno:1.39.4
EXPOSE 3003
WORKDIR /app

COPY . .
#RUN rm deno.lock



RUN deno cache server.ts

USER deno
RUN mkdir -p /var/tmp/log

CMD ["run", "--allow-all", "server.ts"]