#!/bin/bash

# Save first argument as Java source code
echo "$1" > Main.cpp

# Save second argument as input (stdin)
echo "$2" > input.txt

# Compile
g++ -o Main Main.cpp && ./Main < input.txt