#!/bin/bash

while true
do
  sleep $1
  ps -ef | grep mytestscript.php | grep -v grep | awk '{print $2}' | xargs kill -9  
done
