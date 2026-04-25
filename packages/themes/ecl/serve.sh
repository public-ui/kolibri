#! /usr/bin/env bash

export THEME_MODULE="`pwd`/dist"
export THEME_EXPORT=$1
export THEME_CSS="`pwd`/inject-assets.css"
cd ../../../node_modules/@public-ui/sample-react/
echo "`pwd`"
npm start