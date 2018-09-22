#!/bin/bash 

SCRIPT_DIR=$(cd $(dirname $0);pwd)
FRONT_PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TARGET_FILE_PATH=$(find dist/* -name main*.js)

echo "-- file ---------------------------------------"
echo $TARGET_FILE_PATH
echo "-- replace ------------------------------------"
echo "API_BASE_URL: $API_BASE_URL"
echo "-----------------------------------------------"

cp -f $TARGET_FILE_PATH "$TARGET_FILE_PATH.bk"
sed -e "s@CHANGE_ME.API_BASE_URL@$API_BASE_URL@g" "$TARGET_FILE_PATH.bk" > $TARGET_FILE_PATH

rm "$TARGET_FILE_PATH.bk"

