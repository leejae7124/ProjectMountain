REPOSITORY=/home/ec2-user/test
sudo pm2 kill
cd $REPOSITORY

sudo npm install
sudo pm2 kill
sudo pm2 start test.js
