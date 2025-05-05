#!/bin/bash

# Save first argument as Java source code
echo "$1" > Main.java

# Save second argument as input (stdin)
echo "$2" > input.txt

# Compile
javac Main.java && java Main < input.txt
