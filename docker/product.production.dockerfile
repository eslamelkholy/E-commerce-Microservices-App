FROM node:latest

LABEL author="Eslam Elkholy"

WORKDIR /var/www/boilerplate

RUN npm install -g pm2@latest
RUN pm2 install typescript
RUN yarn install

RUN mkdir -p /var/log/pm2

EXPOSE 8000

ENTRYPOINT ["/bin/bash", "./docker/scripts/product.sh"]


# To build:
# docker build -f node.development.dockerfile --tag boilerplatetest ../

# To run:
# docker run -p 4000:4000 boilerplatetest