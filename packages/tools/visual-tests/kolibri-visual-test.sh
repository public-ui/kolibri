# Wrapper script necessary to avoid issues in the monorepos' initial `pnpm i`, when the binary already needs to exist.
# The actual script is built in the `prepare` hook and available after the `pnpm i` finished.
node "$(dirname "$0")/dist/index.js"
