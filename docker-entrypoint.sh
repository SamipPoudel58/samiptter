#!/bin/sh

# echo "Waiting for MongoDB to start..."
# ./wait-for db:27017 

echo "Migrating the databse..."
npm run data:import 

echo "Starting the server..."
npm run server 