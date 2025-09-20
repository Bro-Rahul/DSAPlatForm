# Use a lightweight C++ build image
FROM frolvlad/alpine-gxx

# Create a working directory
WORKDIR /app

# Copy your run script
COPY ../shellScript/cpprun.sh .

# Make script executable
RUN chmod +x cpprun.sh

# Set entrypoint to the script
ENTRYPOINT ["./cpprun.sh"]
