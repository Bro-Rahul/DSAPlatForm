#!/bin/bash

# Save first argument as Java source code
echo "$1" > Main.js

# Save second argument as input (stdin)
echo "$2" > input.txt

# Compile
node Main.js < input.txt