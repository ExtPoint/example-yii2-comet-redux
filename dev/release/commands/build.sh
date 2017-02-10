#!/bin/bash
#

RUNTIME_DIR="$(dirname $(readlink -f $0))"
SOURCE_DIR="$(dirname $(readlink -f $RUNTIME_DIR/../..))"

cd $SOURCE_DIR
composer install
npm install

node $SOURCE_DIR/webpack.js production

exit 0