#!/usr/bin/env bash
# Encodes the hero background video (silent, looping) from assets-source/video/hero-original.mp4
# into apps/web/public/video: hero.mp4 (H.264) + hero.webm (VP9) + hero-poster.jpg (first frame).
# Requires ffmpeg. Run: npm run video
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=assets-source/video/hero-original.mp4
OUT=apps/web/public/video
mkdir -p "$OUT"
ffmpeg -v error -y -i "$SRC" -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -vf "scale=720:-2" "$OUT/hero.mp4"
ffmpeg -v error -y -i "$SRC" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -vf "scale=720:-2" "$OUT/hero.webm"
ffmpeg -v error -y -i "$SRC" -frames:v 1 -vf "scale=720:-2" -q:v 4 "$OUT/hero-poster.jpg"
ls -la "$OUT"
