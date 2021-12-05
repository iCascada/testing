#!/bin/bash

source "./assets.sh"

cd "$APP_DIR/ui" || exit
message info "Start application..."

if ! command -v npm &> /dev/null
    then
    message error "Not found npm"
    exit 1
fi

command bash -c "npm run wstart"