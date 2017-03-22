#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example_tmp
    set -o pipefail && npm run build:ios | xcpretty -c -f `xcpretty-travis-formatter`
  ;;
  linux)
    cd example_tmp
    npm run android:build
  ;;
esac
