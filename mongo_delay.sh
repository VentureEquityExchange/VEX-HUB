#!/bin/sh
 
polling_interval=3
 
# optional, view db_1 container-related env vars
env | grep DB_1 | sort
 
echo "wait for mongo to start first..."
 
# wait until mongo is running in db_1 container
until nc -z $DB_1_PORT_27017_TCP_ADDR $DB_1_PORT_27017_TCP_PORT
do
 echo "waiting for $polling_interval seconds..."
 sleep $polling_interval
done
 
# start node app
node app.js