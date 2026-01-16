#!/usr/bin/env zsh
# test-migration.sh
# Checkout release/2 without .git directory
# Usage: run from a git repo root

set -e

# Variables
RELEASE_BRANCH="release/2"
TEMP_DIR="test-migration"
SOURCE_PATH="packages/samples/react"
STRIP_COMPONENTS=3

# Remove if exists
rm -rf "$TEMP_DIR"

# Create temporary directory for release/2
mkdir -p "$TEMP_DIR"

# Export only samples/react from release/2 without .git
# Strip the packages/samples/react prefix so files are directly in test-migration
git archive "$RELEASE_BRANCH" -- "$SOURCE_PATH" | tar -x -C "$TEMP_DIR" --strip-components="$STRIP_COMPONENTS"

echo "✓ $RELEASE_BRANCH $SOURCE_PATH checked out to $TEMP_DIR/ (without .git)"
ls -la "$TEMP_DIR/"

# Extract version from package.json
VERSION=$(grep '"version"' "$TEMP_DIR/package.json" | head -1 | sed 's/.*"version": "\([^"]*\)".*/\1/')
echo "Extracted version: $VERSION"

# Replace workspace:* with concrete version in package.json
echo ""
echo "Replacing workspace:* with version $VERSION..."
sed -i '' "s/\"workspace:\*\"/\"$VERSION\"/g" "$TEMP_DIR/package.json"

# Install dependencies in test directory
echo ""
echo "Installing dependencies in $TEMP_DIR/..."
(cd "$TEMP_DIR" && npm i)

echo "✓ Dependencies installed successfully in $TEMP_DIR/"

