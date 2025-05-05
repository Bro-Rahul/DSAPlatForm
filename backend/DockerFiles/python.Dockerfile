FROM python:3.10-slim

WORKDIR /app

COPY ../shellScript/pyrun.sh .

RUN chmod +x pyrun.sh

ENTRYPOINT [ "./pyrun.sh" ]