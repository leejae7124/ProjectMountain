#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/test
#sudo pm2 kill
cd $REPOSITORY

npm install
pm2 kill
pm2 start test.js
#cd ${REPO}

#sudo npm install

#npm run-script dev
