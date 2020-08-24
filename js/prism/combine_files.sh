#!/bin/bash

cat prism-core.js \
    prism-clike.js \
    prism-c.js \
    prism-cpp.js \
    prism-arduino.js \
    prism-css.js \
    prism-javascript.js \
    prism-markup.js \
    prism-unescaped-markup.js \
    prism-normalize-whitespace.js \
    prism-line-numbers.js \
    prism-line-highlight.js \
    prism-file-highlight.js \
  > custom-prism.js
echo "Created custom-prism.js"

cat prism-theme-okaidia-custom.css \
    prism-line-highlight.css \
    prism-line-numbers.css \
    prism-unescaped-markup.css \
  > custom-prism.css  
echo "Created custom-prism.css"

