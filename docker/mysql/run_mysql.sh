#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0);pwd)

docker run -v $SCRIPT_DIR/conf.d/:/etc/mysql/conf.d \
  -v $SCRIPT_DIR/ddl:/docker-entrypoint-initdb.d -d \
  -p 3306:3306 \
  --name mysql56 \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  -e MYSQL_DATABASE=test_db \
  mysql:5.6