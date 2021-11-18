FROM node:latest

LABEL author="Eslam Elkholy"

WORKDIR /var/www/boilerplate

COPY servers/auth/package.json .

RUN npm install --only=prod

RUN npm install -g pm2 ts-node

RUN mkdir -p /var/log/pm2

EXPOSE 8000

ENTRYPOINT ["/bin/bash", "./docker/scripts/auth.sh"]


# To build:
# docker build -f node.development.dockerfile --tag boilerplatetest ../

# To run:
# docker run -p 4000:4000 boilerplatetest