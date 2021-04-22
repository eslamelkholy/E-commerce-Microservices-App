sleep 30s
echo "Starting Product Service"
pm2 start ./config/pm2.products.config.js --name ProductService --log /var/log/pm2/pm2.log --watch --no-daemon