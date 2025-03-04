FROM node:22.2.0-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json /opt/app
COPY package-lock.json /opt/app

RUN npm install --production
COPY . /opt/app

EXPOSE 3000

CMD ["npm", "start"]
