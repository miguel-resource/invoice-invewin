from leonlipe/21.2.0-alpine3.18-rsync-aws:1.0.0
WORKDIR /opt/data/app
COPY . /opt/data/app
RUN yarn
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]