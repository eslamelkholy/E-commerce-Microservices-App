FROM node:alpine

LABEL author="Eslam Elkholy"

WORKDIR /var/www/boilerplate

COPY ./package.json .
COPY ./package-lock.json .

ENV NODE_ENV production
ENV PORT=8000

RUN npm install -g pm2@latest
RUN yarn install

COPY    . .

RUN mkdir -p /var/log/pm2

EXPOSE 		$PORT

ENTRYPOINT ["/bin/bash", "./docker/scripts/node.sh"]
