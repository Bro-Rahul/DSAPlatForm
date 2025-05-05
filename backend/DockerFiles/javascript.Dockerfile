FROM node:20-slim

WORKDIR /app

COPY ../shellScript/javascriptrun.sh .

RUN chmod +x javascriptrun.sh

ENTRYPOINT [ "./javascriptrun.sh" ]