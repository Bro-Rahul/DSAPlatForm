# Use OpenJDK image
FROM openjdk:17

# Create a working directory
WORKDIR /app

# Copy your run script
COPY ../shellScript/javarun.sh .

# Make script executable
RUN chmod +x javarun.sh

# Set the entrypoint to the script
ENTRYPOINT ["./javarun.sh"]
