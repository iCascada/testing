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