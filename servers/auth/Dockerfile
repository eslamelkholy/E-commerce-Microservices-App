FROM node:alpine

LABEL author="Eslam Elkholy"

WORKDIR /var/www/boilerplate

COPY servers/auth/package.json .

RUN npm install --only=prod

RUN npm install -g pm2 ts-node

# COPY . .

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "../../docker/scripts/auth.sh"]
