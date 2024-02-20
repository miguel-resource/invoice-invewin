FROM node:21.2.0-alpine3.18
WORKDIR /opt/data/app
COPY . /opt/data/app
RUN yarn
EXPOSE 3230
CMD [ "npm", "start" ]
