sleep 30s
echo "Starting Payment Service"
pm2 start ./config/pm2.payment.config.js --name PaymentService --log /var/log/pm2/pm2.log --watch --no-daemon