#!/bin/bash

# Destroy all Vagrant machines
echo "Destroying all Vagrant machines..."
vagrant destroy -f

# Clean up any remaining Vagrant state
echo "Cleaning up .vagrant folder..."
rm -rf .vagrant

POSTGRESPORT=1234
MONGODBPORT=12345

echo "Checking if port $POSTGRESPORT is still in use..."
if sudo lsof -i :$POSTGRESPORT; then
  PID=$(sudo lsof -t -i :$POSTGRESPORT)
  echo "Killing process using port $POSTGRESPORT (PID: $PID)..."
  sudo kill -9 $PID
else
  echo "Port $POSTGRESPORT is free."
fi

echo "Checking if port $MONGODBPORT is still in use..."
if sudo lsof -i :$MONGODBPORT; then
  PID=$(sudo lsof -t -i :$MONGODBPORT)
  echo "Killing process using port $MONGODBPORT (PID: $PID)..."
  sudo kill -9 $PID
else
  echo "Port $MONGODBPORT is free."
fi

echo "Pruning Vagrant global status..."
vagrant global-status --prune

echo "Cleanup complete. All Vagrant machines are destroyed, and ports $POSTGRESPORT and $MONGODBPORT are freed."
