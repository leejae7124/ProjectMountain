#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/test
#pm2 kill
cd $REPOSITORY

npm install
npm run-script kill
#pm2 start test.js

#sudo npm install

npm run-script dev
