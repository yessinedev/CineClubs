#!/bin/bash

# Show help if no arguments provided
if [ -z "$1" ]; then
    echo "Available commands:"
    echo "  seed         Seed the database"
    echo "  seed:force   Force reseed the database"
    echo "  help         Show this help message"
    exit 1
fi

# Set default command
COMMAND="--help"

# Parse command argument
case "$1" in
    "seed") COMMAND="--seed" ;;
    "seed:force") COMMAND="--seed --force" ;;
    "help") COMMAND="--help" ;;
esac

# Execute maven command
./mvnw compile exec:java \
    -Dexec.mainClass="com.tuniclubs.app.cli.DatabaseSeederMain" \
    -Dexec.args="$COMMAND" \
    -Dspring.profiles.active=seed