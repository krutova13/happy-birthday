#!/bin/bash

# Script to download horror sound effects
# Run: bash download-sounds.sh

cd "$(dirname "$0")/public"

echo "Downloading door sound..."
# Using a direct link to a door knock sound
curl -L "https://actions.google.com/sounds/v1/household/door_knock.ogg" -o door-sound.mp3 2>/dev/null || \
curl -L "https://www.soundjay.com/misc/sounds/door-knock.mp3" -o door-sound.mp3 2>/dev/null || \
echo "Door sound download failed. Please download manually from:"
echo "  - https://freesound.org/search/?q=door+knock"
echo "  - https://www.zapsplat.com/sound-effect-categories/door-sounds/"

echo ""
echo "Downloading scream sound..."
curl -L "https://actions.google.com/sounds/v1/human/human_scream.ogg" -o scream-sound.mp3 2>/dev/null || \
echo "Scream sound download failed. Please download manually from:"
echo "  - https://freesound.org/search/?q=scream"
echo "  - https://www.zapsplat.com/sound-effect-categories/screams/"

echo ""
echo "Done! Check public/ folder for downloaded files."

