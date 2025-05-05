FROM gcc:latest

WORKDIR /app

COPY ../shellScript/cpprun.sh .

RUN chmod +x cpprun.sh

CMD ["./cpprun.sh"]
