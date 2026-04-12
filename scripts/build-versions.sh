#!/usr/bin/env bash
# Build each version of the prototype as a static site under dist/versions/
# Usage: npm run build:versions
# Each version is served from /versions/<version>/ in the main dist

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Version → commit mapping (must match changelog.js)
declare -A COMMITS=(
  ["v0.0"]="0bf0653"
  ["v0.1"]="4e02271"
  ["v0.2"]="84b9b58"
  ["v0.3"]="180a244"
  ["v0.4"]="de72b2c"
  ["v0.5"]="8fccddd"
  ["v0.6"]="19310e4"
)
# v0.7 is current HEAD — built by normal `npm run build`

CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD)

echo "📦 Building past versions..."

for VERSION in "${!COMMITS[@]}"; do
  COMMIT="${COMMITS[$VERSION]}"
  OUT_DIR="$REPO_ROOT/dist/versions/$VERSION"

  echo ""
  echo "→ Building $VERSION ($COMMIT)..."

  # Stash any uncommitted changes
  git stash --quiet 2>/dev/null || true

  # Checkout the commit
  git checkout --quiet "$COMMIT"

  # Install deps silently (in case lockfile differs)
  npm install --silent 2>/dev/null || true

  # Build with correct base path
  npx vite build \
    --outDir "$OUT_DIR" \
    --base "/versions/$VERSION/" \
    --emptyOutDir \
    --logLevel warn

  echo "   ✓ Built to dist/versions/$VERSION"
done

# Return to original branch
echo ""
echo "→ Restoring branch: $CURRENT_BRANCH"
git checkout --quiet "$CURRENT_BRANCH"
git stash pop --quiet 2>/dev/null || true

# Restore deps for current version
npm install --silent 2>/dev/null || true

echo ""
echo "✅ All past versions built. Now run:"
echo "   npm run build"
echo "   to rebuild the current version (v0.7) in dist/"
