#!/bin/bash

command docker stop $(docker ps -a -q)
command docker rmi -f $(docker images -a -q)
command docker rm -vf $(docker ps -a -q)