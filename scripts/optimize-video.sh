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
  # Width 720 for landscape clips, 480 for portrait ones (they are shown narrow).
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f" | awk -F, '{print ($1<$2)?480:720}')
  ffmpeg -v error -y -t 12 -i "$f" -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart -vf "scale=$w:-2" "$OUT/$n.mp4"
  ffmpeg -v error -y -t 12 -i "$f" -an -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -vf "scale=$w:-2" "$OUT/$n.webm"
  ffmpeg -v error -y -i "$f" -frames:v 1 -vf "scale=$w:-2" -q:v 5 "$OUT/$n-poster.jpg"
done
ls -la "$OUT"
