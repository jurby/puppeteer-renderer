FROM zenato/puppeteer
ADD package.json /app
RUN cd /app && npm install
EXPOSE 3000
WORKDIR /app
CMD npm run start
COPY . /app
