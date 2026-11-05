#!/usr/bin/env bash
# Encodes the silent looping clips from assets-source/video/clips/*.mp4 into apps/web/public/video:
# <name>.mp4 (H.264) + <name>.webm (VP9) + <name>-poster.jpg (first frame). Clips are capped at 12 s.
# Requires ffmpeg. Run: npm run video
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=assets-source/video/clips
OUT=apps/web/public/video
rm -rf "$OUT"; mkdir -p "$OUT"
for f in "$SRC"/*.mp4; do
  n=$(basename "$f" .mp4)
  # Clips are rotated portrait files (ffmpeg auto-rotates): never upscale, cap at 720 px wide.
  # hqdn3d removes sensor noise / compression blocks, unsharp restores a little edge detail.
  vf="hqdn3d=3:2:6:4,scale='min(iw,720)':-2:flags=lanczos,unsharp=5:5:0.5:5:5:0.0"
  ffmpeg -v error -y -t 12 -i "$f" -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -vf "$vf" "$OUT/$n.mp4"
  ffmpeg -v error -y -t 12 -i "$f" -an -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -vf "$vf" "$OUT/$n.webm"
  ffmpeg -v error -y -i "$f" -frames:v 1 -vf "scale='min(iw,720)':-2:flags=lanczos" -q:v 4 "$OUT/$n-poster.jpg"
done
ls -la "$OUT"
