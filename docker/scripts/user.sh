sleep 30s
echo "Starting User Service"
pm2 start ./config/pm2.user.config.js --name UserService --log /var/log/pm2/pm2.log --watch --no-daemon