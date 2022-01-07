#!/bin/bash

source "./assets.sh"

message info "Application install starting..."

if ! command -v docker &> /dev/null
    then
    message error "Docker application not found"
    exit 1
fi

if ! command -v docker-compose &> /dev/null
    then
    message error "Docker-compose application not found"
    exit 1
fi

cd "$APP_DIR/docker" || exit
command bash -c "docker-compose build"
command bash -c "docker-compose up -d"

cd "$APP_DIR/ui" || exit
message info "Start frontend application..."

if ! command -v npm &> /dev/null
    then
    message error "Not found npm"
    exit 1
fi

command bash -c "npm run start"