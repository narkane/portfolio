#!/bin/bash
# My first script

sudo pm2 stop node
sudo pm2 stop index
sudo pm2 delete node
sudo pm2 delete index
sudo git pull
sudo npm run build
sudo rm -rf /var/www/html/React/build
sudo cp -rf build /var/www/html/React/build
sudo systemctl restart nginx
sudo pm2 start node server/index.js

sleep 2

netstat -ltnp

sleep 3

sudo pm2 logs
