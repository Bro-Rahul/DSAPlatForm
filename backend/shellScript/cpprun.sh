#!/bin/sh

# Save first argument as C++ source code
echo "$1" > main.cpp

# Save second argument as input (stdin)
echo "$2" > input.txt

# Compile
g++ main.cpp -o main && ./main < input.txt
