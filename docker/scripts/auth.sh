sleep 30s
echo "Starting Auth Service"
pm2 start ./config/pm2.auth.config.js --name AuthService --log /var/log/pm2/pm2.log --watch --no-daemon