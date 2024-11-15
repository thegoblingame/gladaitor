#!/bin/bash

for file in *.wav; do
    base_name=$(basename "$file" .wav)
    ffmpeg -i "$file" -b:a 32k -ac 1 "../sounds/${base_name}.mp3"
done
