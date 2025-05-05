#!/bin/bash

# Save first argument as Java source code
echo "$1" > Main.py

# Save second argument as input (stdin)
echo "$2" > input.txt

# Compile
python3 Main.py < input.txt