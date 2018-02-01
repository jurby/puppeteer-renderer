FROM zenato/puppeteer
USER root
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/
EXPOSE 80
WORKDIR /app
COPY . /app
CMD npm run start
